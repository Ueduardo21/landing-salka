// ============================================
// INKAS BLOOD - SCRIPT COMPLETO OPTIMIZADO
// ============================================

// ============================================
// HEADER SCROLL EFFECT
// ============================================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add background when scrolled
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Hide/show header on scroll
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add('hide');
    } else {
        header.classList.remove('hide');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// MOBILE MENU
// ============================================
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.querySelector('.nav-menu');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = menuBtn.querySelectorAll('span');
    if (menuBtn.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        navMenu.classList.remove('active');
        const spans = menuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// FUNCIÓN AUXILIAR PARA VERIFICAR VIEWPORT
// ============================================
function isElementInViewport(el, offset = 100) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight - offset) &&
        rect.bottom >= offset
    );
}

// ============================================
// ANIMACIONES POR SECCIÓN (CON FAQ INCLUIDO)
// ============================================

// Configuración de animaciones por sección
const sectionAnimations = [
    {
        section: '#home',
        elements: [
            { selector: '.hero-content', animation: 'fadeInDown' },
            { selector: '.hero-title', animation: 'slideInLeft' },
            { selector: '.hero-subtitle', animation: 'slideInRight', delay: 200 },
            { selector: '.btn-gold', animation: 'pulse', delay: 400 },
            { selector: '.scroll-indicator', animation: 'bounceIn', delay: 600 }
        ]
    },
    {
        section: '#about',
        elements: [
            { selector: '.about-content', animation: 'fadeInLeft' },
            { selector: '.about-image', animation: 'fadeInRight' },
            { selector: '.section-subtitle', animation: 'fadeInUp' },
            { selector: '.section-title', animation: 'fadeInUp', delay: 100 }
        ]
    },
    {
        section: '#tours',
        elements: [
            { selector: '.section-header', animation: 'fadeInDown' },
            { selector: '.tour-card', animation: 'flipInX', stagger: 200 }
        ]
    },
    {
        section: '#faq',
        elements: [
            { selector: '.section-header', animation: 'fadeInDown' },
            { selector: '.faq-item', animation: 'fadeInUp', stagger: 100 },
            { selector: '.faq-cta', animation: 'zoomIn', delay: 900 }
        ]
    },
    {
        section: '#contact',
        elements: [
            { selector: '.section-header', animation: 'fadeInUp' },
            { selector: '.contact-button', animation: 'slideInUp', stagger: 100 },
            { selector: '.contact-cta', animation: 'pulse' }
        ]
    }
];

// Función para reiniciar animación
function resetAnimation(el) {
    el.classList.remove('animated');
    // Forzar reflow para reiniciar la animación
    void el.offsetWidth;
}

// Función para aplicar animación a un elemento
function applyAnimation(el, animation, delay = 0) {
    setTimeout(() => {
        el.classList.add('animated', animation);
    }, delay);
}

// Función principal para manejar animaciones de secciones
function handleSectionAnimations() {
    sectionAnimations.forEach(sectionConfig => {
        const section = document.querySelector(sectionConfig.section);
        if (!section) return;
        
        if (isElementInViewport(section)) {
            // Sección visible - aplicar animaciones
            sectionConfig.elements.forEach(item => {
                const elements = section.querySelectorAll(item.selector);
                
                if (item.stagger) {
                    elements.forEach((el, index) => {
                        resetAnimation(el);
                        applyAnimation(el, item.animation, index * item.stagger);
                    });
                } else {
                    elements.forEach(el => {
                        resetAnimation(el);
                        applyAnimation(el, item.animation, item.delay || 0);
                    });
                }
            });
        } else {
            // Sección NO visible - quitar animaciones
            sectionConfig.elements.forEach(item => {
                const elements = section.querySelectorAll(item.selector);
                elements.forEach(el => {
                    el.classList.remove('animated');
                    // Quitar clases de animación específicas
                    const animationClasses = [
                        'fadeIn', 'fadeInDown', 'fadeInUp', 'fadeInLeft', 'fadeInRight',
                        'slideInLeft', 'slideInRight', 'slideInUp', 'slideInDown',
                        'zoomIn', 'bounceIn', 'flipInX', 'pulse'
                    ];
                    animationClasses.forEach(cls => el.classList.remove(cls));
                });
            });
        }
    });
}

// Ejecutar animaciones al cargar la página
window.addEventListener('load', () => {
    handleSectionAnimations();
});

// Ejecutar animaciones al hacer scroll (con throttle para mejor rendimiento)
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleSectionAnimations();
            ticking = false;
        });
        ticking = true;
    }
});

// ============================================
// ANIMACIÓN DE CONTEO PARA ESTADÍSTICAS
// ============================================

// Función para animar el conteo
function animateCounter(element, start, end, duration, suffix = '') {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        element.innerText = currentValue + suffix;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            // Efecto de brillo al terminar
            element.classList.add('counter-animating');
            setTimeout(() => {
                element.classList.remove('counter-animating');
            }, 500);
        }
    };
    window.requestAnimationFrame(step);
}

// Función para iniciar los contadores
function initCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const aboutSection = document.getElementById('about');
    
    if (!aboutSection || statNumbers.length === 0) return;
    
    // Valores objetivo desde los atributos data
    const targets = [
        parseInt(statNumbers[0]?.getAttribute('data-target') || '15'),
        parseInt(statNumbers[1]?.getAttribute('data-target') || '10000'),
        parseInt(statNumbers[2]?.getAttribute('data-target') || '50'),
        parseInt(statNumbers[3]?.getAttribute('data-target') || '100')
    ];
    const suffixes = ['+', '+', '+', '%'];
    let animated = false;
    
    // Guardar los valores originales para mantener el ancho
    statNumbers.forEach((stat, index) => {
        const targetLength = targets[index].toString().length;
        stat.style.minWidth = (targetLength + 1) + 'ch';
    });
    
    // Observer para estadísticas
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.target.id === 'about' && entry.isIntersecting && !animated) {
                animated = true;
                
                setTimeout(() => {
                    statNumbers.forEach((stat, index) => {
                        const target = targets[index];
                        const suffix = suffixes[index];
                        
                        stat.innerText = '0' + suffix;
                        animateCounter(stat, 0, target, 2000, suffix);
                    });
                    
                    const statsContainer = document.querySelector('.stats-container');
                    if (statsContainer) {
                        statsContainer.classList.add('visible');
                    }
                }, 300);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(aboutSection);
}

// Iniciar contadores
document.addEventListener('DOMContentLoaded', () => {
    initCounters();
});

// Reiniciar al hacer clic en "Sobre Nosotros"
document.querySelectorAll('a[href="#about"]').forEach(link => {
    link.addEventListener('click', () => {
        setTimeout(() => {
            const statNumbers = document.querySelectorAll('.stat-number');
            const aboutSection = document.getElementById('about');
            
            if (aboutSection && isElementInViewport(aboutSection, 50)) {
                const targets = [15, 10000, 50, 100];
                const suffixes = ['+', '+', '+', '%'];
                
                statNumbers.forEach((stat, index) => {
                    stat.innerText = '0' + suffixes[index];
                    animateCounter(stat, 0, targets[index], 2000, suffixes[index]);
                });
            }
        }, 600);
    });
});

// ============================================
// FAQ ACCORDION
// ============================================
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const toggle = item.querySelector('.faq-toggle');
        const icon = toggle?.querySelector('i');
        
        if (icon) {
            icon.style.transition = 'transform 0.3s ease';
        }
        
        question.addEventListener('click', () => {
            // Opción 1: Cerrar otros items (descomenta si lo prefieres)
            // faqItems.forEach(otherItem => {
            //     if (otherItem !== item && otherItem.classList.contains('active')) {
            //         otherItem.classList.remove('active');
            //         const otherIcon = otherItem.querySelector('.faq-toggle i');
            //         if (otherIcon) otherIcon.style.transform = 'rotate(0)';
            //     }
            // });
            
            // Toggle current item
            item.classList.toggle('active');
            
            // Rotar icono
            if (icon) {
                if (item.classList.contains('active')) {
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    icon.style.transform = 'rotate(0)';
                }
            }
        });
    });
}

// ============================================
// MODAL FUNCTIONALITY
// ============================================
const tourModal = document.getElementById('tourModal');
const contactModal = document.getElementById('contactModal');
const mapModal = document.getElementById('mapModal');
const modalContent = document.getElementById('modalContent');
const openContactBtn = document.getElementById('openContactModal');
const openMapBtn = document.getElementById('openMapModal');
const getDirectionsBtn = document.getElementById('getDirections');

// Tour data
const toursData = {
    1: {
        title: 'Machu Picchu',
        location: 'Cusco, Perú',
        duration: '5 días / 4 noches',
        group: 'Máximo 12 personas',
        price: '$1,299',
        image: 'https://images.alphacoders.com/131/1311351.jpeg',
        description: 'Explora la ciudadela inca más famosa del mundo, una de las Siete Maravillas del Mundo Moderno. Disfruta de atardeceres inolvidables y conecta con la energía de este lugar mágico.',
        includes: [
            'Transporte turístico',
            'Guía profesional bilingüe',
            'Entradas a Machu Picchu',
            'Hotel 3 estrellas',
            'Alimentación (desayunos)',
            'Seguro de viaje'
        ]
    },
    2: {
        title: 'Amazonía Peruana',
        location: 'Puerto Maldonado, Perú',
        duration: '4 días / 3 noches',
        group: 'Máximo 8 personas',
        price: '$899',
        image: 'https://media.istockphoto.com/id/1454581656/es/foto/vista-a%C3%A9rea-de-la-selva-amaz%C3%B3nica-en-per%C3%BA.jpg?s=612x612&w=0&k=20&c=g7cMB0eCcO9wLd4sFHEWJaGC9N_DtLlCwI0XKGEinZs=',
        description: 'Sumérgete en la selva más biodiversa del planeta. Observa monos, perezosos, caimanes y una increíble variedad de aves en su hábitat natural.',
        includes: [
            'Transporte fluvial',
            'Guía especializado',
            'Lodge en la selva',
            'Tours de exploración',
            'Alimentación completa',
            'Equipo de observación'
        ]
    },
    3: {
        title: 'Valle Sagrado',
        location: 'Cusco, Perú',
        duration: '3 días / 2 noches',
        group: 'Máximo 15 personas',
        price: '$699',
        image: 'https://peru.info/archivos/publicacion/56-imagen-1531121372018.jpg',
        description: 'Descubre mercados tradicionales, sitios arqueológicos impresionantes y la cultura viva de los Andes peruanos.',
        includes: [
            'Transporte turístico',
            'Guía profesional',
            'Entradas a sitios arqueológicos',
            'Hotel 3 estrellas',
            'Desayunos incluidos',
            'Seguro de viaje'
        ]
    },
    4: {
        title: 'Lago Titicaca',
        location: 'Puno, Perú',
        duration: '3 días / 2 noches',
        group: 'Máximo 10 personas',
        price: '$599',
        image: 'https://img.freepik.com/fotos-premium/lago-titicaca-cerca-puno-peru_87394-2352.jpg',
        description: 'El lago navegable más alto del mundo te espera. Visita las islas flotantes de los Uros y la isla Taquile.',
        includes: [
            'Transporte turístico',
            'Guía local',
            'Alojamiento en islas',
            'Tours en bote',
            'Alimentación',
            'Seguro de viaje'
        ]
    },
    5: {
        title: 'Montaña de Colores',
        location: 'Cusco, Perú',
        duration: '1 día',
        group: 'Máximo 12 personas',
        price: '$199',
        image: 'https://www.peru.travel/Contenido/General/Imagen/es/302/1.1/Vinicunca.jpg',
        description: 'Camina hasta la impresionante montaña arcoíris Vinicunca. Disfruta de paisajes únicos y la energía de los Andes.',
        includes: [
            'Transporte ida y vuelta',
            'Guía profesional',
            'Desayuno y almuerzo',
            'Bastones de trekking',
            'Botiquín de primeros auxilios',
            'Seguro de viaje'
        ]
    },
    6: {
        title: 'Líneas de Nazca',
        location: 'Ica, Perú',
        duration: '2 días / 1 noche',
        group: 'Máximo 10 personas',
        price: '$449',
        image: 'https://travelbuddiesperu.com/wp-content/uploads/2023/03/Lineas-de-Nazca.jpg',
        description: 'Sobrevuela los misteriosos geoglifos precolombinos y descubre los acueductos de Cantalloc.',
        includes: [
            'Transporte turístico',
            'Sobre vuelo de las líneas',
            'Guía local',
            'Hotel 3 estrellas',
            'Desayuno incluido',
            'Seguro de viaje'
        ]
    }
};

// ============================================
// FUNCIÓN PARA ACTUALIZAR LINK DE WHATSAPP
// ============================================
function updateWhatsAppLink(tour = null) {
    const whatsappLink = document.getElementById('whatsappLink');
    if (!whatsappLink) return;
    
    let mensaje = '';
    
    if (tour) {
        mensaje = `Hola, estoy interesado en el tour "${tour.title}" (${tour.duration}). ¿Podrían enviarme información sobre disponibilidad y precios?`;
    } else {
        mensaje = 'Hola, estoy interesado en los tours de Inkas Blood. ¿Podrían darme más información?';
    }
    
    whatsappLink.href = `https://wa.me/51984123456?text=${encodeURIComponent(mensaje)}`;
}

// ============================================
// OPEN TOUR MODAL - VERSIÓN HÍBRIDA
// ============================================
document.querySelectorAll('.view-tour').forEach(button => {
    button.addEventListener('click', () => {
        const tourId = button.getAttribute('data-tour');
        const tour = toursData[tourId];
        
        if (tour) {
            modalContent.innerHTML = `
                <img src="${tour.image}" alt="${tour.title}" class="tour-detail-image">
                <h2 class="tour-detail-title">${tour.title}</h2>
                <p class="tour-detail-location"><i class="fas fa-map-marker-alt gold-text"></i> ${tour.location}</p>
                
                <div class="tour-detail-meta">
                    <span><i class="fas fa-clock gold-text"></i> ${tour.duration}</span>
                    <span><i class="fas fa-users gold-text"></i> ${tour.group}</span>
                </div>
                
                <p class="tour-detail-description">${tour.description}</p>
                
                <div class="tour-detail-includes">
                    <h4>Incluye:</h4>
                    <ul>
                        ${tour.includes.map(item => `
                            <li><i class="fas fa-check-circle"></i> ${item}</li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="tour-detail-price">
                    Desde ${tour.price} <small>por persona</small>
                </div>
                
                <div class="tour-actions">
                    <button class="btn-gold buy-now" data-tour-id="${tourId}">
                        <i class="fas fa-credit-card"></i> Comprar ahora
                    </button>
                    <button class="btn-outline ask-question" data-tour-id="${tourId}">
                        <i class="fas fa-question-circle"></i> Consultar disponibilidad
                    </button>
                </div>
            `;
            
            tourModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Botón COMPRAR AHORA
            const buyBtn = modalContent.querySelector('.buy-now');
            if (buyBtn) {
                buyBtn.addEventListener('click', () => {
                    const tourId = buyBtn.getAttribute('data-tour-id');
                    
                    // ⚠️ Reemplaza estos URLs con los de tu tienda Shopify
                    const shopifyLinks = {
                        '1': 'https://tutienda.myshopify.com/cart/123456789:1',
                        '2': 'https://tutienda.myshopify.com/cart/123456790:1',
                        '3': 'https://tutienda.myshopify.com/cart/123456791:1',
                        '4': 'https://tutienda.myshopify.com/cart/123456792:1',
                        '5': 'https://tutienda.myshopify.com/cart/123456793:1',
                        '6': 'https://tutienda.myshopify.com/cart/123456794:1'
                    };
                    
                    if (shopifyLinks[tourId]) {
                        window.location.href = shopifyLinks[tourId];
                    }
                });
            }
            
            // Botón CONSULTAR
            const askBtn = modalContent.querySelector('.ask-question');
            if (askBtn) {
                askBtn.addEventListener('click', () => {
                    const tourId = askBtn.getAttribute('data-tour-id');
                    const tour = toursData[tourId];
                    
                    updateWhatsAppLink(tour);
                    
                    tourModal.classList.remove('active');
                    document.body.style.overflow = '';
                    
                    setTimeout(() => {
                        contactModal.classList.add('active');
                        document.body.style.overflow = 'hidden';
                        
                        const select = document.getElementById('tourInteres');
                        const hiddenInput = document.getElementById('tourSeleccionado');
                        
                        if (select && tour) {
                            for (let i = 0; i < select.options.length; i++) {
                                const option = select.options[i];
                                if (option.text.includes(tour.title) || option.value.includes(tour.title)) {
                                    option.selected = true;
                                    break;
                                }
                            }
                            
                            if (select.value === "" || select.selectedIndex === 0) {
                                for (let i = 0; i < select.options.length; i++) {
                                    if (select.options[i].value === "Personalizado") {
                                        select.options[i].selected = true;
                                        break;
                                    }
                                }
                            }
                        }
                        
                        if (hiddenInput && tour) {
                            hiddenInput.value = tour.title;
                        }
                        
                        const fechaViajeInput = document.getElementById('fechaViaje');
                        if (fechaViajeInput && !fechaViajeInput.value) {
                            const nextMonth = new Date();
                            nextMonth.setMonth(nextMonth.getMonth() + 1);
                            const year = nextMonth.getFullYear();
                            const month = String(nextMonth.getMonth() + 1).padStart(2, '0');
                            fechaViajeInput.value = `${year}-${month}`;
                        }
                        
                        setTimeout(() => {
                            const nombreInput = document.getElementById('nombre');
                            if (nombreInput) {
                                nombreInput.focus();
                            }
                        }, 300);
                        
                    }, 300);
                });
            }
        }
    });
});

// Open contact modal
if (openContactBtn) {
    openContactBtn.addEventListener('click', () => {
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        updateWhatsAppLink();
        
        const form = document.getElementById('contactForm');
        if (form) {
            form.reset();
        }
        
        const hiddenInput = document.getElementById('tourSeleccionado');
        if (hiddenInput) {
            hiddenInput.value = '';
        }
        
        const fechaInput = document.getElementById('fechaEnvio');
        if (fechaInput) {
            const now = new Date();
            fechaInput.value = now.toISOString();
        }
        
        setTimeout(() => {
            const nombreInput = document.getElementById('nombre');
            if (nombreInput) {
                nombreInput.focus();
            }
        }, 300);
    });
}

// Close modals
document.querySelectorAll('.modal-close, .modal-overlay').forEach(element => {
    element.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay') || e.target.classList.contains('modal-close') || e.target.closest('.modal-close')) {
            tourModal.classList.remove('active');
            contactModal.classList.remove('active');
            mapModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        tourModal.classList.remove('active');
        contactModal.classList.remove('active');
        mapModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            nombre: document.getElementById('nombre')?.value,
            email: document.getElementById('email')?.value,
            telefono: document.getElementById('telefono')?.value,
            pais: document.getElementById('pais')?.value,
            tourInteres: document.getElementById('tourInteres')?.value,
            fechaViaje: document.getElementById('fechaViaje')?.value,
            viajeros: document.getElementById('viajeros')?.value,
            presupuesto: document.getElementById('presupuesto')?.value,
            preferencias: document.getElementById('preferencias')?.value,
            tourSeleccionado: document.getElementById('tourSeleccionado')?.value,
            fechaEnvio: document.getElementById('fechaEnvio')?.value || new Date().toISOString()
        };
        
        console.log('Datos del formulario:', formData);
        
        let mensaje = '¡Gracias por contactarnos! Te responderemos a la brevedad.';
        if (formData.tourSeleccionado) {
            mensaje = `¡Gracias por tu interés en ${formData.tourSeleccionado}! Te contactaremos pronto con información personalizada.`;
        }
        
        alert(mensaje);
        
        contactForm.reset();
        contactModal.classList.remove('active');
        document.body.style.overflow = '';
        
        const hiddenInput = document.getElementById('tourSeleccionado');
        if (hiddenInput) {
            hiddenInput.value = '';
        }
    });
}

// ============================================
// ACTIVE MENU ON SCROLL
// ============================================
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// SCROLL INDICATOR CLICK
// ============================================
document.querySelector('.scroll-indicator')?.addEventListener('click', () => {
    window.scrollTo({
        top: document.getElementById('about').offsetTop - 80,
        behavior: 'smooth'
    });
});

// ============================================
// MAP MODAL FUNCTIONALITY
// ============================================
if (openMapBtn) {
    openMapBtn.addEventListener('click', () => {
        mapModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// Cerrar modal de mapa
document.querySelectorAll('#mapModal .modal-close, #mapModal .modal-overlay').forEach(element => {
    element.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay') || e.target.classList.contains('modal-close') || e.target.closest('.modal-close')) {
            mapModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Botón "Cómo llegar"
if (getDirectionsBtn) {
    getDirectionsBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
            const originalText = getDirectionsBtn.innerHTML;
            getDirectionsBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Obteniendo ubicación...';
            getDirectionsBtn.disabled = true;
            
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    
                    window.open(
                        `https://www.google.com/maps/dir/${lat},${lng}/Plaza+de+Armas+Cusco+Peru`,
                        '_blank',
                        'noopener,noreferrer'
                    );
                    
                    getDirectionsBtn.innerHTML = originalText;
                    getDirectionsBtn.disabled = false;
                },
                (error) => {
                    alert('No se pudo obtener tu ubicación. Abriendo mapa del destino.');
                    window.open(
                        'https://www.google.com/maps/dir//Plaza+de+Armas+Cusco+Peru',
                        '_blank',
                        'noopener,noreferrer'
                    );
                    
                    getDirectionsBtn.innerHTML = originalText;
                    getDirectionsBtn.disabled = false;
                }
            );
        } else {
            window.open(
                'https://www.google.com/maps/dir//Plaza+de+Armas+Cusco+Peru',
                '_blank',
                'noopener,noreferrer'
            );
        }
    });
}

// ============================================
// MANEJO DE ERROR DE IMÁGENES DE LOGO
// ============================================
document.querySelectorAll('.logo-img, .footer-logo-img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        const parent = this.parentElement;
        const textLogo = parent.querySelector('.logo-text, .footer-logo-text');
        if (textLogo) {
            textLogo.style.display = 'block';
        }
    });
});

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar WhatsApp
    updateWhatsAppLink();
    
    // Inicializar FAQ accordion
    initFaqAccordion();
});