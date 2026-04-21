<footer class="footer">
    <div class="footer-container">
        <div class="footer-content">
            <!-- Logo y descripción -->
            <div class="footer-brand">
                <div class="footer-logo">
                    <i class="fas fa-mountain"></i>
                    <span><?php echo defined('APP_NAME') ? APP_NAME : 'Aventura Peru'; ?></span>
                </div>
                <p class="footer-description">
                    Descubre las rutas más emblemáticas de Perú con nosotros. 
                    Aventura, naturaleza y cultura en cada paso.
                </p>
                <div class="footer-social">
                    <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                    <a href="#" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
                    <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                </div>
            </div>

            <!-- Enlaces rápidos -->
            <div class="footer-links">
                <h4>Explora</h4>
                <ul>
                    <li><a href="#home">Inicio</a></li>
                    <li><a href="#about">Nosotros</a></li>
                    <li><a href="#tour">Tours</a></li>
                    <li><a href="#faq">FAQ</a></li>
                    <li><a href="#contact">Contacto</a></li>
                </ul>
            </div>

            <!-- Tours populares -->
            <div class="footer-links">
                <h4>Tours</h4>
                <ul>
                    <li><a href="#tour" onclick="selectTour('salkantay')">Salkantay Trekking</a></li>
                    <li><a href="#tour" onclick="selectTour('inca')">Camino Inca</a></li>
                    <li><a href="#">Próximas salidas</a></li>
                    <li><a href="#">Tours privados</a></li>
                </ul>
            </div>

            <!-- Contacto -->
            <div class="footer-contact">
                <h4>Contacto</h4>
                <ul>
                    <li>
                        <i class="fas fa-map-marker-alt"></i>
                        <span>Cusco - Perú</span>
                    </li>
                    <li>
                        <i class="fas fa-phone-alt"></i>
                        <span>+51 984 123 456</span>
                    </li>
                    <li>
                        <i class="fas fa-envelope"></i>
                        <span>info@aventuraperu.com</span>
                    </li>
                    <li>
                        <i class="fas fa-clock"></i>
                        <span>Lun - Dom: 9am - 8pm</span>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Bottom bar -->
        <div class="footer-bottom">
            <p>&copy; <?php echo date('Y'); ?> <?php echo defined('APP_NAME') ? APP_NAME : 'Aventura Peru'; ?>. Todos los derechos reservados.</p>
            <div class="footer-bottom-links">
                <a href="#">Política de Privacidad</a>
                <span>|</span>
                <a href="#">Términos y Condiciones</a>
            </div>
        </div>
    </div>
</footer>