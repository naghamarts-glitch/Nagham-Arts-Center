<?php
/**
 * Check Authentication Status API
 * Returns current user session if authenticated
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Not authenticated',
        'user' => null
    ]);
    exit;
}

try {
    require_once 'db.php';
    $pdo = getDB();
    
    $stmt = $pdo->prepare("SELECT id, name, email, phone, role FROM login WHERE id = ?");
    $stmt->execute([$_SESSION['user_id']]);
    $user = $stmt->fetch();
    
    if (!$user) {
        session_destroy();
        echo json_encode([
            'success' => false,
            'message' => 'Invalid session',
            'user' => null
        ]);
        exit;
    }
    
    echo json_encode([
        'success' => true,
        'user' => [
            'id' => $user['id'],
            'name' => $user['name'],
            'email' => $user['email'],
            'phone' => $user['phone'] ?? '',
            'role' => $user['role'] ?? 'user'
        ]
    ]);
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Auth check failed',
        'user' => null
    ]);
}
?>

