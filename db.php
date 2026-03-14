<?php
/**
 * Database Connection File
 * Secure MySQL connection using PDO
 */

define('DB_HOST', 'localhost');
define('DB_NAME', 'nagam999');
define('DB_USER', 'root'); // Change this to your MySQL username
define('DB_PASS', '');      // Change this to your MySQL password

class Database {
    private $pdo;
    
    public function __construct() {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];
        
        try {
            $this->pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Database connection failed']);
            exit;
        }
    }
    
    public function getConnection() {
        return $this->pdo;
    }
}

// Helper function to get database connection
function getDB() {
    $db = new Database();
    return $db->getConnection();
}

