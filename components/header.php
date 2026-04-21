<header class="header" id="header">
    <div class="header-container">
        <div class="header-content">
            <!-- Logo -->
            <a href="/" class="logo">
                <i class="fas fa-mountain"></i>
                <span><?php echo defined('APP_NAME') ? APP_NAME : 'Aventura Peru'; ?></span>
            </a>

            <!-- Menú de navegación -->
            <nav class="nav-menu">
                <ul class="nav-list">
                    <li><a href="#home" class="nav-link">Inicio</a></li>
                    <li><a href="#about" class="nav-link">Nosotros</a></li>
                    <li><a href="#tour" class="nav-link">Tours</a></li>
                    <li><a href="#faq" class="nav-link">FAQ</a></li>
                    <li><a href="#contact" class="nav-link">Contacto</a></li>
                </ul>
            </nav>

            <!-- Botón de reserva rápida -->
            <div class="header-actions">
                <button class="btn-reserva" onclick="openReservaRapida()">
                    <i class="fas fa-calendar-check"></i> Reservar
                </button>
            </div>

            <!-- Menú hamburguesa (móvil) -->
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
</header>