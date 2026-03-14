<?php
/**
 * Google OAuth Login API
 * Handles Google authentication and user registration/login
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once 'db.php';

// Google OAuth configuration
// Replace these with your actual Google OAuth credentials from Google Cloud Console
define('GOOGLE_CLIENT_ID', 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com');
define('GOOGLE_CLIENT_SECRET', 'YOUR_GOOGLE_CLIENT_SECRET');
define('GOOGLE_REDIRECT_URI', 'http://localhost/nagham-art-hub-main/backend/google-login.php');

// Function to create/update users table for Google auth
function initUsersTable($pdo) {
    $sql = "CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(50),
        password VARCHAR(255),
        google_id VARCHAR(255) UNIQUE,
        google_avatar VARCHAR(500),
        role ENUM('customer', 'admin') DEFAULT 'customer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_google_id (google_id),
        INDEX idx_email (email)
    )";
    $pdo->exec($sql);
}

// Verify Google token
function verifyGoogleToken($idToken) {
    $clientId = GOOGLE_CLIENT_ID;
    
    // Get Google public keys
    $googleCertUrl = 'https://www.googleapis.com/oauth2/v3/certs';
    $certJson = @file_get_contents($googleCertUrl);
    
    if (!$certJson) {
        return null;
    }
    
    $certs = json_decode($certJson, true);
    
    // Decode the JWT
    $parts = explode('.', $idToken);
    if (count($parts) !== 3) {
        return null;
    }
    
    $payload = json_decode(base64UrlDecode($parts[1]), true);
    
    if (!$payload) {
        return null;
    }
    
    // Verify issuer
    if (!isset($payload['iss']) || ($payload['iss'] !== 'https://accounts.google.com' && $payload['iss'] !== 'accounts.google.com')) {
        return null;
    }
    
    // Verify audience
    if (!isset($payload['aud']) || $payload['aud'] !== $clientId) {
        return null;
    }
    
    // Verify expiration
    if (!isset($payload['exp']) || $payload['exp'] < time()) {
        return null;
    }
    
    return $payload;
}

// Base64 URL decode
function base64UrlDecode($data) {
    $remainder = strlen($data) % 4;
    if ($remainder) {
        $data .= str_repeat('=', 4 - $remainder);
    }
    return base64_decode(strtr($data, '-_', '+/'));
}

// Handle different request methods
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Check if this is a token verification (for frontend)
    if (isset($data['action']) && $data['action'] === 'verify') {
        $idToken = $data['id_token'] ?? '';
        
        if (empty($idToken)) {
            echo json_encode(['success' => false, 'message' => 'ID token required']);
            exit;
        }
        
        try {
            $pdo = getDB();
            initUsersTable($pdo);
            
            $payload = verifyGoogleToken($idToken);
            
            if (!$payload) {
                echo json_encode(['success' => false, 'message' => 'Invalid Google token']);
                exit;
            }
            
            $googleId = $payload['sub'];
            $email = $payload['email'];
            $name = $payload['name'] ?? $email;
            $avatar = $payload['picture'] ?? '';
            
            // Check if user exists
            $stmt = $pdo->prepare("SELECT * FROM users WHERE google_id = ? OR email = ?");
            $stmt->execute([$googleId, $email]);
            $user = $stmt->fetch();
            
            if ($user) {
                // Update Google ID if not set
                if (empty($user['google_id'])) {
                    $stmt = $pdo->prepare("UPDATE users SET google_id = ?, google_avatar = ? WHERE id = ?");
                    $stmt->execute([$googleId, $avatar, $user['id']]);
                }
                
                // Start session
                session_start();
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['user_name'] = $user['name'];
                $_SESSION['user_email'] = $user['email'];
                $_SESSION['user_role'] = $user['role'];
                
                // Generate token
                $token = bin2hex(random_bytes(32));
                $_SESSION['token'] = $token;
                
                echo json_encode([
                    'success' => true,
                    'message' => 'Login successful',
                    'token' => $token,
                    'user' => [
                        'id' => $user['id'],
                        'name' => $user['name'],
                        'email' => $user['email'],
                        'role' => $user['role'],
                        'google_avatar' => $user['google_avatar'] ?: $avatar
                    ]
                ]);
            } else {
                // Create new user
                $stmt = $pdo->prepare("INSERT INTO users (name, email, google_id, google_avatar, role) VALUES (?, ?, ?, ?, 'customer')");
                $stmt->execute([$name, $email, $googleId, $avatar]);
                
                $userId = $pdo->lastInsertId();
                
                // Start session
                session_start();
                $_SESSION['user_id'] = $userId;
                $_SESSION['user_name'] = $name;
                $_SESSION['user_email'] = $email;
                $_SESSION['user_role'] = 'customer';
                
                // Generate token
                $token = bin2hex(random_bytes(32));
                $_SESSION['token'] = $token;
                
                echo json_encode([
                    'success' => true,
                    'message' => 'Registration successful',
                    'token' => $token,
                    'user' => [
                        'id' => $userId,
                        'name' => $name,
                        'email' => $email,
                        'role' => 'customer',
                        'google_avatar' => $avatar
                    ]
                ]);
            }
            
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => 'Authentication failed: ' . $e->getMessage()]);
        }
        exit;
    }
    
    // OAuth flow - handle callback from Google
    if (isset($_GET['code'])) {
        $code = $_GET['code'];
        
        // Exchange code for tokens
        $tokenUrl = 'https://oauth2.googleapis.com/token';
        $postData = [
            'code' => $code,
            'client_id' => GOOGLE_CLIENT_ID,
            'client_secret' => GOOGLE_CLIENT_SECRET,
            'redirect_uri' => GOOGLE_REDIRECT_URI,
            'grant_type' => 'authorization_code'
        ];
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $tokenUrl);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        
        $response = curl_exec($ch);
        curl_close($ch);
        
        $tokenData = json_decode($response, true);
        
        if (!isset($tokenData['id_token'])) {
            echo json_encode(['success' => false, 'message' => 'Failed to get ID token']);
            exit;
        }
        
        // Verify and decode the ID token
        $payload = verifyGoogleToken($tokenData['id_token']);
        
        if (!$payload) {
            echo json_encode(['success' => false, 'message' => 'Invalid ID token']);
            exit;
        }
        
        try {
            $pdo = getDB();
            initUsersTable($pdo);
            
            $googleId = $payload['sub'];
            $email = $payload['email'];
            $name = $payload['name'] ?? $email;
            $avatar = $payload['picture'] ?? '';
            
            // Check if user exists
            $stmt = $pdo->prepare("SELECT * FROM users WHERE google_id = ? OR email = ?");
            $stmt->execute([$googleId, $email]);
            $user = $stmt->fetch();
            
            if ($user) {
                // Update Google info
                $stmt = $pdo->prepare("UPDATE users SET google_id = ?, google_avatar = ? WHERE id = ?");
                $stmt->execute([$googleId, $avatar, $user['id']]);
                
                session_start();
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['user_name'] = $user['name'];
                $_SESSION['user_email'] = $user['email'];
                $_SESSION['user_role'] = $user['role'];
                
                // Redirect to frontend
                header('Location: http://localhost:5173?google_login=success');
                exit;
            } else {
                // Create new user
                $stmt = $pdo->prepare("INSERT INTO users (name, email, google_id, google_avatar, role) VALUES (?, ?, ?, ?, 'customer')");
                $stmt->execute([$name, $email, $googleId, $avatar]);
                
                $userId = $pdo->lastInsertId();
                
                session_start();
                $_SESSION['user_id'] = $userId;
                $_SESSION['user_name'] = $name;
                $_SESSION['user_email'] = $email;
                $_SESSION['user_role'] = 'customer';
                
                header('Location: http://localhost:5173?google_login=success');
                exit;
            }
            
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => 'Authentication failed: ' . $e->getMessage()]);
        }
        exit;
    }
    
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Generate OAuth URL for frontend
    $authUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    $params = [
        'client_id' => GOOGLE_CLIENT_ID,
        'redirect_uri' => GOOGLE_REDIRECT_URI,
        'response_type' => 'code',
        'scope' => 'email profile',
        'access_type' => 'offline',
        'prompt' => 'consent'
    ];
    
    $url = $authUrl . '?' . http_build_query($params);
    
    echo json_encode([
        'success' => true,
        'auth_url' => $url
    ]);
}

