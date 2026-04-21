<?php
// Activar reporte de errores
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Incluir config.php (config.php ya define BASE_PATH y las constantes)
if (file_exists(__DIR__ . '/config.php')) {
    require_once __DIR__ . '/config.php';
} else {
    // Solo definir constantes si no existe config.php
    define('APP_NAME', 'Mi Landing Page');
    if (!defined('BASE_PATH')) {
        define('BASE_PATH', __DIR__);
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
    <meta name="description" content="Landing page profesional con diseño moderno y responsive">
    <meta name="keywords" content="landing page, diseño web, responsive">
    <meta name="author" content="Cusco Tours Barato">
    
    <title><?php echo APP_NAME; ?> - Aventuras en Perú</title>
    
    <!-- CSS - Estilos independientes por sección -->
    <link rel="stylesheet" href="assets/css/header.css">
    <link rel="stylesheet" href="assets/css/hero.css">
    <link rel="stylesheet" href="assets/css/about.css">
    <link rel="stylesheet" href="assets/css/tour.css">
    <link rel="stylesheet" href="assets/css/faq.css">
    <link rel="stylesheet" href="assets/css/footer.css">
    <link rel="stylesheet" href="assets/css/modal.css">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    
    <style>
        /* Reset básico para evitar conflictos entre secciones */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Poppins', sans-serif;
            overflow-x: hidden;
            background: #ffffff;
        }
        
        /* Variables globales para consistencia */
        :root {
            --primary-color: #00e5b5;
            --primary-dark: #00c4a0;
            --primary-light: #4db8ff;
            --secondary-color: #00b4d8;
            --white: #ffffff;
            --dark-color: #1a1a1a;
            --text-color: #2c3e50;
            --text-light: #6c757d;
            --gray-bg: #f8f9fa;
        }
        
        /* Smooth scroll */
        html {
            scroll-behavior: smooth;
        }
        
        /* Estilos para botones globales (por si acaso) */
        .btn-green {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.8rem 1.8rem;
            background: linear-gradient(135deg, #00e5b5, #00c4a0);
            border: none;
            border-radius: 50px;
            color: #1a1a1a;
            font-weight: 600;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
        }
        
        .btn-green:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 229, 181, 0.3);
        }
        
        .btn-outline-green {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1.7rem;
            background: transparent;
            border: 2px solid #00e5b5;
            border-radius: 50px;
            color: #00e5b5;
            font-weight: 600;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
        }
        
        .btn-outline-green:hover {
            background: #00e5b5;
            color: #1a1a1a;
            transform: translateY(-2px);
        }
        
        /* Utilidades */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        .text-center {
            text-align: center;
        }
        
        .mt-2 {
            margin-top: 0.5rem;
        }
        
        .mt-3 {
            margin-top: 1rem;
        }
        
        .mb-2 {
            margin-bottom: 0.5rem;
        }
        
        .mb-3 {
            margin-bottom: 1rem;
        }
    </style>
</head>
<body>
    <?php
    // Incluir componentes
    $components = [
        'components/header.php',
        'components/sections/hero.php',
        'components/sections/about.php',
        'components/sections/tour.php',
        'components/sections/faq.php',
        'components/footer.php',
        'components/sections/modal.php'
    ];
    
    foreach ($components as $component) {
        $file_path = BASE_PATH . '/' . $component;
        if (file_exists($file_path)) {
            include $file_path;
        } else {
            // Solo mostrar error en modo depuración
            if (defined('DEBUG') && DEBUG) {
                echo "<!-- ERROR: No se encontró: $file_path -->\n";
            }
        }
    }
    ?>
    
    <!-- JavaScript -->
    <script src="assets/js/main.js"></script>
    <script src="assets/js/header.js"></script>
    <script src="assets/js/hero.js"></script>
    <script src="assets/js/about.js"></script>
    <script src="assets/js/faq.js"></script>
    <script src="assets/js/footer.js"></script>
    <script src="assets/js/modal.js"></script>
    <script src="assets/js/tour.js"></script>
</body>
</html>