// ============================================
// HEADER - JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Header scroll effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // 2. Menú hamburguesa (móvil)
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Cerrar menú al hacer click en un enlace
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // 3. Marcar enlace activo según scroll
    const sections = document.querySelectorAll('section, #home');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // 4. Reserva rápida
    window.openReservaRapida = function() {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        
        if (modalTitle) {
            modalTitle.textContent = 'Reserva Rápida';
        }
        
        if (modalDescription) {
            modalDescription.innerHTML = `
                <form id="reservaRapidaForm" class="modal-form">
                    <div class="form-group">
                        <label>Nombre completo</label>
                        <input type="text" placeholder="Tu nombre" required>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="tu@email.com" required>
                    </div>
                    <div class="form-group">
                        <label>Teléfono</label>
                        <input type="tel" placeholder="+51 987 654 321" required>
                    </div>
                    <div class="form-group">
                        <label>Tour de interés</label>
                        <select required>
                            <option value="">Selecciona un tour</option>
                            <option>Salkantay Trekking</option>
                            <option>Camino Inca</option>
                            <option>Consultar ambos</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Fecha deseada</label>
                        <input type="date" required>
                    </div>
                    <div class="form-group">
                        <label>Número de personas</label>
                        <input type="number" min="1" max="20" value="1" required>
                    </div>
                    <button type="submit" class="btn-green" style="width: 100%;">
                        <i class="fas fa-calendar-check"></i> Solicitar Reserva
                    </button>
                </form>
            `;
            
            const form = document.getElementById('reservaRapidaForm');
            if (form) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    alert('¡Solicitud enviada! Te contactaremos en las próximas 24 horas.');
                    const modal = document.getElementById('modal');
                    if (modal) modal.classList.remove('active');
                });
            }
        }
        
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };
});