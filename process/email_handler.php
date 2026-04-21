<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../config/mail.php';

// Configurar CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Solo aceptar peticiones POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// Obtener datos del POST
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    echo json_encode(['success' => false, 'message' => 'Datos inválidos']);
    exit;
}

$type = $input['type'] ?? '';
$mail = MailConfig::getInstance();
$success = false;

if ($type === 'consulta') {
    $data = [
        'tour' => $input['tour'] ?? '',
        'nombre' => $input['nombre'] ?? '',
        'email' => $input['email'] ?? '',
        'telefono' => $input['telefono'] ?? '',
        'consulta' => $input['consulta'] ?? ''
    ];
    $success = $mail->sendConsulta($data);
    
} elseif ($type === 'reserva') {
    $data = [
        'tour' => $input['tour'] ?? '',
        'nombre' => $input['nombre'] ?? '',
        'email' => $input['email'] ?? '',
        'telefono' => $input['telefono'] ?? '',
        'fecha' => $input['fecha'] ?? '',
        'personas' => $input['personas'] ?? '',
        'extras' => $input['extras'] ?? 'Ninguno',
        'metodoPago' => $input['metodoPago'] ?? '',
        'notas' => $input['notas'] ?? '',
        'precioTotal' => $input['precioTotal'] ?? ''
    ];
    $success = $mail->sendReserva($data);
}

if ($success) {
    echo json_encode(['success' => true, 'message' => '✅ Mensaje enviado correctamente. Te contactaremos pronto.']);
} else {
    echo json_encode(['success' => false, 'message' => '❌ Error al enviar el mensaje. Por favor intenta de nuevo.']);
}
?>