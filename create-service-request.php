<?php
/**
 * Handle service requests from landing page form
 * POST: {name, phone, service_type, details}
 * Response: JSON success/error
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Max-Age: 86400');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

require_once 'db.php';  // Use getDB()
$pdo = getDB();

$input = json_decode(file_get_contents('php://input'), true) ?: [];

$name = trim($input['name'] ?? '');
$phone = trim($input['phone'] ?? '');
$service_type = trim($input['service_type'] ?? '');
$details = trim($input['details'] ?? '');

// Validation
if (strlen($name) < 2 || strlen($phone) < 10 || !preg_match('/^01[0-9]{9}$/', $phone) || strlen($service_type) < 2) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid or missing required fields (name, phone, service_type)']);
    exit;
}

try {
    $stmt = $pdo->prepare('INSERT INTO service_requests (name, phone, service_type, details) VALUES (?, ?, ?, ?)');
    $result = $stmt->execute([$name, $phone, $service_type, $details]);
    
    if ($result) {
        echo json_encode([
            'success' => true,
            'message' => 'تم إرسال طلبك بنجاح! سيتم التواصل معك قريباً.',
            'id' => $pdo->lastInsertId()
        ]);
    } else {
        throw new Exception('Insert failed');
    }
} catch (PDOException $e) {
    error_log('Service request error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'خطأ في الحفظ، حاول مرة أخرى']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'حدث خطأ غير متوقع']);
}
?>
