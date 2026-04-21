// ============================================
// ABOUT SECTION - ANIMACIONES Y FUNCIONALIDAD
// ============================================

// ============================================
// 1. CONTADORES DE ESTADÍSTICAS
// ============================================
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
            element.classList.add('counter-animating');
            setTimeout(() => {
                element.classList.remove('counter-animating');
            }, 500);
        }
    };
    window.requestAnimationFrame(step);
}

// Inicializar contadores cuando la sección sea visible
function initAboutCounters() {
    const aboutSection = document.getElementById('about');
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (!aboutSection || statNumbers.length === 0) return;
    
    // Obtener valores de data-target o usar valores por defecto
    const targets = [];
    const suffixes = ['+', '+', '+', '%'];
    
    statNumbers.forEach(stat => {
        const target = stat.getAttribute('data-target');
        targets.push(target ? parseInt(target) : 0);
    });
    
    let animated = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.target.id === 'about' && entry.isIntersecting && !animated) {
                animated = true;
                setTimeout(() => {
                    statNumbers.forEach((stat, index) => {
                        const target = targets[index] || 100;
                        const suffix = suffixes[index] || '';
                        const originalText = stat.innerText;
                        stat.innerText = '0' + suffix;
                        animateCounter(stat, 0, target, 2000, suffix);
                    });
                }, 300);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(aboutSection);
}

// ============================================
// 2. MODAL DE VIDEO (opcional)
// ============================================
function initVideoModal() {
    const playBtn = document.getElementById('playVideoBtn');
    const videoModal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    const closeBtn = document.querySelector('.video-modal-close');
    const overlay = document.querySelector('.video-modal-overlay');
    
    if (!videoModal) return;
    
    if (!playBtn) {
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                videoModal.classList.remove('active');
                document.body.style.overflow = '';
                if (videoFrame) videoFrame.src = '';
            });
        }
        if (overlay) {
            overlay.addEventListener('click', () => {
                videoModal.classList.remove('active');
                document.body.style.overflow = '';
                if (videoFrame) videoFrame.src = '';
            });
        }
        return;
    }
    
    const videoUrl = 'https://www.youtube.com/embed/8y1Tb5kFJcU?autoplay=1';
    
    function openModal() {
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (videoFrame) {
            videoFrame.src = videoUrl;
        }
    }
    
    function closeModal() {
        videoModal.classList.remove('active');
        document.body.style.overflow = '';
        if (videoFrame) {
            videoFrame.src = '';
        }
    }
    
    playBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ============================================
// 3. ANIMACIÓN DE TARJETAS AL HACER SCROLL
// ============================================
function initCardsAnimation() {
    const cards = document.querySelectorAll('.testimonial-card, .partner-item, .cert-item, .stat-item, .feature');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    cards.forEach(card => {
        if (!card.style.opacity) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
        }
        observer.observe(card);
    });
}

// ============================================
// 4. BOTÓN "VER TODAS LAS RESEÑAS"
// ============================================
function initReviewsButton() {
    const reviewsBtn = document.getElementById('viewAllReviews');
    
    if (reviewsBtn) {
        reviewsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.open('https://www.tripadvisor.com/UserReview', '_blank');
        });
    }
}

// ============================================
// 5. ANIMACIÓN DE BARRAS DE PROGRESO (opcional)
// ============================================
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    if (progressBars.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                if (width) {
                    bar.style.width = width;
                }
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        bar.style.width = '0%';
        bar.style.transition = 'width 1.5s ease';
        observer.observe(bar);
    });
}

// ============================================
// 6. INICIALIZACIÓN PRINCIPAL
// ============================================
function initAbout() {
    initAboutCounters();
    initVideoModal();
    initCardsAnimation();
    initReviewsButton();
    initProgressBars();
}

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAbout);
} else {
    initAbout();
}