<?php
// Configuración de correo con PHPMailer usando Composer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class MailConfig {
    private static $instance = null;
    private $mail;
    private $isLocalhost;
    
    private function __construct() {
        $this->isLocalhost = defined('IS_LOCALHOST') ? IS_LOCALHOST : true;
        
        $this->mail = new PHPMailer(true);
        
        // Configuración del servidor
        $this->mail->isSMTP();
        $this->mail->Host = SMTP_HOST;
        $this->mail->SMTPAuth = true;
        $this->mail->Username = SMTP_USERNAME;
        $this->mail->Password = SMTP_PASSWORD;
        $this->mail->SMTPSecure = SMTP_SECURE;
        $this->mail->Port = SMTP_PORT;
        
        // Configuración adicional para cPanel (evita problemas SSL)
        if (!$this->isLocalhost) {
            $this->mail->SMTPOptions = array(
                'ssl' => array(
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                    'allow_self_signed' => true
                )
            );
        }
        
        // Configuración del remitente
        $this->mail->setFrom(SMTP_FROM, SMTP_FROM_NAME);
        $this->mail->addReplyTo(SMTP_FROM, SMTP_FROM_NAME);
        
        // Configuración de codificación
        $this->mail->CharSet = 'UTF-8';
        $this->mail->Encoding = 'base64';
        
        // Deshabilitar verificación SMTP en desarrollo
        $this->mail->SMTPDebug = 0; // Cambiar a 2 para depuración
        $this->mail->Debugoutput = 'html';
    }
    
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    // ============================================
    // ENVÍO DE CONSULTA
    // ============================================
    public function sendConsulta($data) {
        try {
            $this->mail->clearAddresses();
            $to_email = defined('EMAIL_TO') ? EMAIL_TO : SMTP_USERNAME;
            $this->mail->addAddress($to_email, 'Administrador');
            
            $this->mail->isHTML(true);
            $this->mail->Subject = '📩 Nueva Consulta - ' . $data['tour'];
            $this->mail->Body = $this->getConsultaTemplate($data);
            $this->mail->AltBody = strip_tags($this->getConsultaTemplate($data));
            
            return $this->mail->send();
        } catch (Exception $e) {
            error_log("Error al enviar correo de consulta: " . $this->mail->ErrorInfo);
            return false;
        }
    }
    
    // ============================================
    // ENVÍO DE RESERVA (3 PASOS)
    // ============================================
    public function sendReserva($data) {
        try {
            $this->mail->clearAddresses();
            $to_email = defined('EMAIL_TO') ? EMAIL_TO : SMTP_USERNAME;
            $this->mail->addAddress($to_email, 'Administrador');
            
            // También enviar una copia al cliente
            if (!empty($data['email'])) {
                $this->mail->addBCC($data['email'], $data['nombre']);
            }
            
            $this->mail->isHTML(true);
            $this->mail->Subject = '📅 NUEVA RESERVA - ' . $data['tour'];
            $this->mail->Body = $this->getReservaTemplate($data);
            $this->mail->AltBody = strip_tags($this->getReservaTemplate($data));
            
            return $this->mail->send();
        } catch (Exception $e) {
            error_log("Error al enviar correo de reserva: " . $this->mail->ErrorInfo);
            return false;
        }
    }
    
    // ============================================
    // PLANTILLA PARA CONSULTA
    // ============================================
    private function getConsultaTemplate($data) {
        return "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #00e5b5, #00c4a0); padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
                .header h2 { margin: 0; color: #1a1a1a; }
                .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 10px 10px; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #00e5b5; margin-bottom: 5px; }
                .value { color: #333; padding: 8px; background: white; border-radius: 5px; }
                .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
                .highlight { color: #00e5b5; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h2>📩 Nueva Consulta</h2>
                    <p>Tour: <strong>" . htmlspecialchars($data['tour']) . "</strong></p>
                </div>
                <div class='content'>
                    <div class='field'>
                        <div class='label'>👤 Nombre completo:</div>
                        <div class='value'>" . htmlspecialchars($data['nombre']) . "</div>
                    </div>
                    <div class='field'>
                        <div class='label'>📧 Email:</div>
                        <div class='value'>" . htmlspecialchars($data['email']) . "</div>
                    </div>
                    <div class='field'>
                        <div class='label'>📱 Teléfono:</div>
                        <div class='value'>" . htmlspecialchars($data['telefono']) . "</div>
                    </div>
                    <div class='field'>
                        <div class='label'>❓ Consulta:</div>
                        <div class='value'>" . nl2br(htmlspecialchars($data['consulta'])) . "</div>
                    </div>
                    <div class='field'>
                        <div class='label'>📅 Fecha de consulta:</div>
                        <div class='value'>" . date('d/m/Y H:i:s') . "</div>
                    </div>
                </div>
                <div class='footer'>
                    <p>Este mensaje fue enviado desde el formulario de consulta de <span class='highlight'>" . APP_NAME . "</span></p>
                </div>
            </div>
        </body>
        </html>
        ";
    }
    
    // ============================================
    // PLANTILLA PARA RESERVA (3 PASOS)
    // ============================================
    private function getReservaTemplate($data) {
        // Formatear el método de pago con ícono
        $metodoPagoIcono = '';
        switch($data['metodoPago']) {
            case 'tarjeta':
                $metodoPagoIcono = '💳 Tarjeta de crédito/débito';
                break;
            case 'paypal':
                $metodoPagoIcono = '💰 PayPal';
                break;
            case 'transferencia':
                $metodoPagoIcono = '🏦 Transferencia bancaria';
                break;
            case 'efectivo':
                $metodoPagoIcono = '💵 Efectivo (oficina Cusco)';
                break;
            default:
                $metodoPagoIcono = htmlspecialchars($data['metodoPago']);
        }
        
        return "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'>
            <title>Nueva Reserva - " . htmlspecialchars($data['tour']) . "</title>
            <style>
                body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #00e5b5, #00c4a0); padding: 25px; text-align: center; border-radius: 15px 15px 0 0; }
                .header h2 { margin: 0; color: #1a1a1a; font-size: 24px; }
                .header p { margin: 10px 0 0; color: #1a1a1a; opacity: 0.9; }
                .content { background: #ffffff; padding: 25px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 15px 15px; }
                .section-title { font-size: 16px; font-weight: bold; color: #00e5b5; margin: 20px 0 10px; padding-bottom: 5px; border-bottom: 2px solid #00e5b5; }
                .section-title:first-of-type { margin-top: 0; }
                .field { margin-bottom: 12px; display: flex; flex-wrap: wrap; }
                .label { font-weight: bold; color: #4a5568; width: 140px; }
                .value { color: #1a202c; flex: 1; }
                .resume-card { background: #f8f9fa; border-radius: 12px; padding: 15px; margin: 15px 0; border: 1px solid #e5e7eb; }
                .resume-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
                .resume-item:last-child { border-bottom: none; }
                .resume-total { font-size: 18px; font-weight: bold; color: #00e5b5; margin-top: 10px; padding-top: 10px; border-top: 2px solid #e5e7eb; text-align: right; }
                .badge { display: inline-block; background: #00e5b5; color: #1a1a1a; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
                .footer { text-align: center; padding: 20px; font-size: 12px; color: #a0aec0; border-top: 1px solid #e5e7eb; margin-top: 20px; }
                .highlight { color: #00e5b5; font-weight: bold; }
                @media (max-width: 480px) {
                    .field { flex-direction: column; }
                    .label { width: 100%; margin-bottom: 5px; }
                }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h2>📅 NUEVA RESERVA</h2>
                    <p><span class='badge'>" . htmlspecialchars($data['tour']) . "</span></p>
                </div>
                <div class='content'>
                    <!-- Datos del Cliente -->
                    <div class='section-title'>👤 DATOS DEL CLIENTE</div>
                    <div class='field'>
                        <div class='label'>Nombre completo:</div>
                        <div class='value'>" . htmlspecialchars($data['nombre']) . "</div>
                    </div>
                    <div class='field'>
                        <div class='label'>Correo electrónico:</div>
                        <div class='value'>" . htmlspecialchars($data['email']) . "</div>
                    </div>
                    <div class='field'>
                        <div class='label'>Teléfono / WhatsApp:</div>
                        <div class='value'>" . htmlspecialchars($data['telefono']) . "</div>
                    </div>
                    
                    <!-- Detalles del Tour -->
                    <div class='section-title'>📋 DETALLES DEL TOUR</div>
                    <div class='field'>
                        <div class='label'>Fecha deseada:</div>
                        <div class='value'>" . htmlspecialchars($data['fecha']) . "</div>
                    </div>
                    <div class='field'>
                        <div class='label'>Número de personas:</div>
                        <div class='value'>" . htmlspecialchars($data['personas']) . "</div>
                    </div>
                    
                    <!-- Extras Seleccionados -->
                    <div class='section-title'>🎒 EXTRAS SELECCIONADOS</div>
                    <div class='field'>
                        <div class='label'>Extras:</div>
                        <div class='value'>" . (!empty($data['extras']) ? htmlspecialchars($data['extras']) : 'Ninguno') . "</div>
                    </div>
                    
                    <!-- Resumen de Pago -->
                    <div class='section-title'>💰 RESUMEN DE PAGO</div>
                    <div class='resume-card'>
                        <div class='resume-item'>
                            <span>Precio base (" . htmlspecialchars($data['tour']) . ")</span>
                            <span>$" . number_format((intval($data['precioTotal']) - $this->calcularExtrasTotal($data)), 0) . "</span>
                        </div>
                        <div class='resume-item'>
                            <span>Extras seleccionados</span>
                            <span>$" . number_format($this->calcularExtrasTotal($data), 0) . "</span>
                        </div>
                        <div class='resume-total'>
                            <strong>TOTAL A PAGAR</strong>
                            <strong>$" . number_format(intval($data['precioTotal']), 0) . "</strong>
                        </div>
                    </div>
                    
                    <!-- Método de Pago -->
                    <div class='section-title'>💳 MÉTODO DE PAGO</div>
                    <div class='field'>
                        <div class='label'>Método seleccionado:</div>
                        <div class='value'>" . $metodoPagoIcono . "</div>
                    </div>
                    
                    <!-- Notas Adicionales -->
                    " . (!empty($data['notas']) ? "
                    <div class='section-title'>📝 NOTAS ADICIONALES</div>
                    <div class='field'>
                        <div class='value'>" . nl2br(htmlspecialchars($data['notas'])) . "</div>
                    </div>
                    " : "") . "
                    
                    <!-- Fecha de Solicitud -->
                    <div class='field' style='margin-top: 20px;'>
                        <div class='label'>Fecha de solicitud:</div>
                        <div class='value'>" . date('d/m/Y H:i:s') . "</div>
                    </div>
                </div>
                <div class='footer'>
                    <p>Este mensaje fue enviado desde el formulario de reserva de <span class='highlight'>" . APP_NAME . "</span></p>
                    <p style='font-size: 11px;'>Por favor, contacta al cliente dentro de las próximas 24 horas.</p>
                </div>
            </div>
        </body>
        </html>
        ";
    }
    
    // ============================================
    // FUNCIÓN AUXILIAR PARA CALCULAR EXTRAS
    // ============================================
    private function calcularExtrasTotal($data) {
        $extrasTotal = 0;
        $extras = $data['extras'] ?? '';
        $personas = intval($data['personas']) ?? 1;
        
        $extraPrices = [
            'Bastones' => 15,
            'Seguro' => 25,
            'Traslado' => 10,
            'Cena' => 20,
            'Fotos' => 30
        ];
        
        foreach ($extraPrices as $extra => $price) {
            if (strpos($extras, $extra) !== false) {
                $extrasTotal += $price * $personas;
            }
        }
        
        return $extrasTotal;
    }
}
?>