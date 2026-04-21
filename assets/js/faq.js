// ============================================
// FAQ SECTION - JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Sistema de categorías
    const categoryBtns = document.querySelectorAll('.category-btn');
    const faqContents = document.querySelectorAll('.faq-content');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remover active de todos los botones
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Ocultar todos los contenidos
            faqContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Mostrar el contenido de la categoría seleccionada
            const activeContent = document.querySelector(`.faq-content[data-category="${category}"]`);
            if (activeContent) {
                activeContent.classList.add('active');
            }
        });
    });
    
    // 2. Acordeón para preguntas
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Cerrar otros items (opcional - descomentar para solo uno abierto)
            // faqItems.forEach(otherItem => {
            //     if (otherItem !== item && otherItem.classList.contains('active')) {
            //         otherItem.classList.remove('active');
            //     }
            // });
            
            item.classList.toggle('active');
        });
    });
    
    // 3. Función para abrir modal de contacto
    window.openContactModal = function() {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        
        if (modalTitle) {
            modalTitle.textContent = 'Contactar Soporte';
        }
        
        if (modalDescription) {
            modalDescription.innerHTML = `
                <form id="soporteForm" class="modal-form">
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
                        <textarea rows="4" placeholder="¿En qué podemos ayudarte?" required></textarea>
                    </div>
                    <button type="submit" class="btn-green" style="width: 100%;">
                        <i class="fas fa-paper-plane"></i> Enviar Mensaje
                    </button>
                </form>
            `;
            
            const form = document.getElementById('soporteForm');
            if (form) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    alert('¡Mensaje enviado! Te contactaremos en menos de 24 horas.');
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
    
    // 4. Scroll suave a FAQ si se llega desde otro enlace
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('show') === 'faq') {
        const faqSection = document.getElementById('faq');
        if (faqSection) {
            setTimeout(() => {
                faqSection.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
    }
});