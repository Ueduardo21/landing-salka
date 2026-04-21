// ============================================
// TOUR SECTION - JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Selector de Tours
    const tourBtns = document.querySelectorAll('.tour-btn');
    const tourContents = document.querySelectorAll('.tour-content');
    
    tourBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tourId = this.getAttribute('data-tour');
            
            // Remover active de todos los botones
            tourBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Ocultar todos los contenidos
            tourContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Mostrar el contenido seleccionado
            const activeContent = document.getElementById(`tour-${tourId}`);
            if (activeContent) {
                activeContent.classList.add('active');
            }
        });
    });
    
    // 2. Acordeón
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            // Cerrar otros items (opcional - descomentar si quieres solo uno abierto)
            // accordionItems.forEach(otherItem => {
            //     if (otherItem !== item && otherItem.classList.contains('active')) {
            //         otherItem.classList.remove('active');
            //     }
            // });
            
            item.classList.toggle('active');
        });
    });
    
    // 3. Funciones para cambiar imágenes
    window.changeImage = function(src) {
        const mainImage = document.getElementById('mainImage');
        if (mainImage) {
            mainImage.src = src;
        }
    };
    
    window.changeImageInca = function(src) {
        const mainImageInca = document.getElementById('mainImageInca');
        if (mainImageInca) {
            mainImageInca.src = src;
        }
    };
    
    // 4. Funciones para modales (conectar con modal.php)
    window.openReservaModal = function(tourName) {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        
        if (modalTitle) {
            modalTitle.textContent = `Reservar: ${tourName}`;
        }
        
        if (modalDescription) {
            modalDescription.innerHTML = `
                <form id="reservaForm" class="modal-form">
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
                        <label>Fecha deseada</label>
                        <input type="date" required>
                    </div>
                    <div class="form-group">
                        <label>Número de personas</label>
                        <input type="number" min="1" max="20" value="1" required>
                    </div>
                    <div class="form-group">
                        <label>Mensaje adicional</label>
                        <textarea rows="3" placeholder="Alguna pregunta especial..."></textarea>
                    </div>
                    <button type="submit" class="btn-green" style="width: 100%;">
                        Enviar Solicitud
                    </button>
                </form>
            `;
            
            // Agregar evento al formulario
            const form = document.getElementById('reservaForm');
            if (form) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    alert(`¡Solicitud de reserva para ${tourName} enviada! Te contactaremos pronto.`);
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
    
    window.openConsultaModal = function(tourName) {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        
        if (modalTitle) {
            modalTitle.textContent = `Consultar: ${tourName}`;
        }
        
        if (modalDescription) {
            modalDescription.innerHTML = `
                <form id="consultaForm" class="modal-form">
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
                        <input type="tel" placeholder="+51 987 654 321">
                    </div>
                    <div class="form-group">
                        <label>Tu consulta</label>
                        <textarea rows="4" placeholder="¿Qué te gustaría saber sobre este tour?" required></textarea>
                    </div>
                    <button type="submit" class="btn-green" style="width: 100%;">
                        Enviar Consulta
                    </button>
                </form>
            `;
            
            const form = document.getElementById('consultaForm');
            if (form) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    alert(`¡Consulta sobre ${tourName} enviada! Te responderemos pronto.`);
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