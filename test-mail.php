<?php
require_once 'config.php';
require_once 'config/mail.php';

$mail = MailConfig::getInstance();

$testData = [
    'tour' => 'Test Tour',
    'nombre' => 'Usuario Test',
    'email' => 'test@example.com',
    'telefono' => '999999999',
    'consulta' => 'Este es un mensaje de prueba'
];

if ($mail->sendConsulta($testData)) {
    echo "✅ Correo enviado correctamente";
} else {
    echo "❌ Error al enviar correo";
}
?>