// ============================================
// MODAL JS - CONSULTA y RESERVA (3 pasos)
// ============================================

console.log('Modal.js cargado');

let currentStep = 1;
let currentTour = '';
let selectedExtras = {
    bastones: false,
    seguro: false,
    traslado: false,
    cena: false,
    fotos: false
};

let extraPrices = {
    bastones: 15,
    seguro: 25,
    traslado: 10,
    cena: 20,
    fotos: 30
};

const tourPrices = {
    'Salkantay Trekking': 520,
    'Camino Inca': 590
};

// ============================================
// MODAL DE CONSULTA (1 paso)
// ============================================
window.openConsultaModal = function(tourName) {
    console.log('Abriendo consulta para:', tourName);
    
    currentTour = tourName;
    
    const modal = document.getElementById('modalConsulta');
    const modalTitle = document.getElementById('modalConsultaTitle');
    const modalDescription = document.getElementById('modalConsultaDescription');
    const modalMessage = document.getElementById('modalConsultaMessage');
    
    if (!modal) {
        console.error('No se encontró modalConsulta');
        return;
    }
    
    if (modalMessage) modalMessage.style.display = 'none';
    
    modalTitle.innerHTML = '<i class="fas fa-question-circle"></i> Consultar: ' + tourName;
    
    modalDescription.innerHTML = `
        <div class="modal-form">
            <div class="form-group">
                <label>Nombre completo <span class="required">*</span></label>
                <input type="text" id="consulta_nombre" placeholder="Ej: Juan Pérez">
            </div>
            <div class="form-group">
                <label>Correo electrónico <span class="required">*</span></label>
                <input type="email" id="consulta_email" placeholder="ejemplo@correo.com">
            </div>
            <div class="form-group">
                <label>Teléfono / WhatsApp</label>
                <input type="tel" id="consulta_telefono" placeholder="+51 987 654 321">
            </div>
            <div class="form-group">
                <label>Tu consulta <span class="required">*</span></label>
                <textarea id="consulta_texto" rows="4" placeholder="¿Qué te gustaría saber sobre este tour?"></textarea>
            </div>
            <button type="button" class="btn-green" style="width: 100%;" onclick="enviarConsulta()">
                <i class="fas fa-paper-plane"></i> Enviar Consulta
            </button>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

// ============================================
// MODAL DE RESERVA (3 pasos)
// ============================================
window.openReservaModal = function(tourName) {
    console.log('Abriendo reserva 3 pasos para:', tourName);
    
    currentTour = tourName;
    currentStep = 1;
    selectedExtras = {
        bastones: false,
        seguro: false,
        traslado: false,
        cena: false,
        fotos: false
    };
    
    const modal = document.getElementById('modalReserva');
    const modalTitle = document.getElementById('modalReservaTitle');
    const modalDescription = document.getElementById('modalReservaDescription');
    const modalMessage = document.getElementById('modalReservaMessage');
    
    if (!modal) {
        console.error('No se encontró modalReserva');
        return;
    }
    
    // Resetear indicadores visuales de pasos
    const steps = document.querySelectorAll('#modalReserva .step');
    steps.forEach(step => {
        step.classList.remove('active', 'completed');
    });
    if (steps[0]) steps[0].classList.add('active');
    
    // Configurar botones
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    prevBtn.style.display = 'flex';
    nextBtn.style.display = 'flex';
    submitBtn.style.display = 'none';
    nextBtn.innerHTML = 'Siguiente →';
    
    if (modalMessage) modalMessage.style.display = 'none';
    
    modalTitle.innerHTML = '<i class="fas fa-calendar-check"></i> Reservar: ' + tourName;
    
    // Cargar el HTML de los 3 pasos
    modalDescription.innerHTML = getPaso1HTML() + getPaso2HTML() + getPaso3HTML();
    
    // Configurar event listeners de los botones
    prevBtn.onclick = retrocederPaso;
    nextBtn.onclick = avanzarPaso;
    submitBtn.onclick = enviarReserva;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

// ============================================
// HTML DE LOS 3 PASOS
// ============================================
function getPaso1HTML() {
    return `
        <div id="step1" class="form-step active">
            <div class="modal-form">
                <div class="form-group">
                    <label>Nombre completo <span class="required">*</span></label>
                    <input type="text" id="nombre" placeholder="Ej: Juan Pérez">
                </div>
                <div class="form-group">
                    <label>Correo electrónico <span class="required">*</span></label>
                    <input type="email" id="email" placeholder="ejemplo@correo.com">
                </div>
                <div class="form-group">
                    <label>Teléfono / WhatsApp <span class="required">*</span></label>
                    <input type="tel" id="telefono" placeholder="+51 987 654 321">
                </div>
                <div class="form-group">
                    <label>Fecha deseada <span class="required">*</span></label>
                    <input type="date" id="fecha">
                </div>
                <div class="form-group">
                    <label>Número de personas <span class="required">*</span></label>
                    <input type="number" id="personas" min="1" max="20" value="1">
                </div>
            </div>
        </div>
    `;
}

function getPaso2HTML() {
    return `
        <div id="step2" class="form-step">
            <div class="modal-form">
                <div class="extras-group">
                    <h4>🎒 Equipo adicional</h4>
                    <div class="extras-option">
                        <input type="checkbox" id="bastones" onchange="toggleExtra('bastones')">
                        <label>Bastones de trekking (par)</label>
                        <span class="extras-price">+$15</span>
                    </div>
                </div>
                <div class="extras-group">
                    <h4>🛡️ Seguros</h4>
                    <div class="extras-option">
                        <input type="checkbox" id="seguro" onchange="toggleExtra('seguro')">
                        <label>Seguro de viaje (3 días)</label>
                        <span class="extras-price">+$25</span>
                    </div>
                </div>
                <div class="extras-group">
                    <h4>🚐 Transporte adicional</h4>
                    <div class="extras-option">
                        <input type="checkbox" id="traslado" onchange="toggleExtra('traslado')">
                        <label>Traslado aeropuerto - hotel</label>
                        <span class="extras-price">+$10</span>
                    </div>
                </div>
                <div class="extras-group">
                    <h4>🍽️ Comidas</h4>
                    <div class="extras-option">
                        <input type="checkbox" id="cena" onchange="toggleExtra('cena')">
                        <label>Cena especial en Aguas Calientes</label>
                        <span class="extras-price">+$20</span>
                    </div>
                </div>
                <div class="extras-group">
                    <h4>📸 Fotografía</h4>
                    <div class="extras-option">
                        <input type="checkbox" id="fotos" onchange="toggleExtra('fotos')">
                        <label>Fotos profesionales del tour</label>
                        <span class="extras-price">+$30</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getPaso3HTML() {
    return `
        <div id="step3" class="form-step">
            <div class="modal-form">
                <div class="resume-card">
                    <div class="resume-item">
                        <span>📅 ${currentTour}</span>
                        <span id="resumeTourPrice">$${tourPrices[currentTour]}</span>
                    </div>
                    <div id="extrasResume"></div>
                    <div class="resume-item">
                        <strong>👥 Personas:</strong>
                        <span id="resumePersonas">1</span>
                    </div>
                    <div class="resume-total">
                        <strong>TOTAL:</strong>
                        <span id="resumeTotal">$${tourPrices[currentTour]}</span>
                    </div>
                </div>
                <div class="form-group">
                    <label>Método de pago <span class="required">*</span></label>
                    <select id="metodoPago">
                        <option value="">Selecciona un método</option>
                        <option value="tarjeta">💳 Tarjeta de crédito/débito</option>
                        <option value="paypal">💰 PayPal</option>
                        <option value="transferencia">🏦 Transferencia bancaria</option>
                        <option value="efectivo">💵 Efectivo (oficina Cusco)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Notas adicionales</label>
                    <textarea id="notas" rows="2" placeholder="Alguna información adicional..."></textarea>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// FUNCIONES DE NAVEGACIÓN
// ============================================
function avanzarPaso() {
    if (currentStep === 1 && validarPaso1()) {
        currentStep = 2;
        actualizarUI();
    } else if (currentStep === 2) {
        currentStep = 3;
        actualizarUI();
        actualizarResumen();
    }
}

function retrocederPaso() {
    if (currentStep > 1) {
        currentStep--;
        actualizarUI();
    }
}

function validarPaso1() {
    const nombre = document.getElementById('nombre')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const telefono = document.getElementById('telefono')?.value.trim();
    const fecha = document.getElementById('fecha')?.value;
    const personas = document.getElementById('personas')?.value;
    
    if (!nombre) { mostrarMensajeReserva('Ingresa tu nombre completo', 'error'); return false; }
    if (!email || !email.includes('@')) { mostrarMensajeReserva('Ingresa un email válido', 'error'); return false; }
    if (!telefono) { mostrarMensajeReserva('Ingresa tu número de teléfono', 'error'); return false; }
    if (!fecha) { mostrarMensajeReserva('Selecciona una fecha', 'error'); return false; }
    if (!personas || personas < 1) { mostrarMensajeReserva('Número de personas debe ser al menos 1', 'error'); return false; }
    
    return true;
}

function actualizarUI() {
    const steps = document.querySelectorAll('#modalReserva .step');
    for (let i = 1; i <= 3; i++) {
        const step = steps[i - 1];
        const formStep = document.getElementById(`step${i}`);
        
        if (i === currentStep) {
            step?.classList.add('active');
            step?.classList.remove('completed');
            formStep?.classList.add('active');
        } else if (i < currentStep) {
            step?.classList.add('completed');
            step?.classList.remove('active');
            formStep?.classList.remove('active');
        } else {
            step?.classList.remove('active', 'completed');
            formStep?.classList.remove('active');
        }
    }
    
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    if (currentStep === 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'flex';
        submitBtn.style.display = 'none';
        nextBtn.innerHTML = 'Siguiente →';
    } else if (currentStep === 2) {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
        submitBtn.style.display = 'none';
        nextBtn.innerHTML = 'Siguiente →';
    } else if (currentStep === 3) {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'flex';
        submitBtn.innerHTML = '✅ Reservar Ahora';
    }
}

// ============================================
// FUNCIONES DE EXTRAS Y RESUMEN
// ============================================
window.toggleExtra = function(extra) {
    const checkbox = document.getElementById(extra);
    if (checkbox) {
        selectedExtras[extra] = checkbox.checked;
        if (currentStep === 3) {
            actualizarResumen();
        }
    }
};

function actualizarResumen() {
    const personas = parseInt(document.getElementById('personas')?.value) || 1;
    let basePrice = tourPrices[currentTour] * personas;
    let extrasTotal = 0;
    let extrasList = '';
    
    const extraNames = {
        bastones: 'Bastones de trekking',
        seguro: 'Seguro de viaje',
        traslado: 'Traslado aeropuerto',
        cena: 'Cena especial',
        fotos: 'Fotos profesionales'
    };
    
    for (const [extra, selected] of Object.entries(selectedExtras)) {
        if (selected) {
            extrasTotal += extraPrices[extra] * personas;
            extrasList += `<div class="resume-item"><span>➕ ${extraNames[extra]}</span><span>+$${extraPrices[extra] * personas}</span></div>`;
        }
    }
    
    const total = basePrice + extrasTotal;
    
    const extrasResume = document.getElementById('extrasResume');
    const resumeTotal = document.getElementById('resumeTotal');
    const resumePersonas = document.getElementById('resumePersonas');
    const resumeTourPrice = document.getElementById('resumeTourPrice');
    
    if (extrasResume) extrasResume.innerHTML = extrasList;
    if (resumeTotal) resumeTotal.innerHTML = `$${total}`;
    if (resumePersonas) resumePersonas.innerHTML = personas;
    if (resumeTourPrice) resumeTourPrice.innerHTML = `$${basePrice}`;
}

// ============================================
// ENVÍO DE FORMULARIOS
// ============================================
window.enviarConsulta = function() {
    const data = {
        type: 'consulta',
        tour: currentTour,
        nombre: document.getElementById('consulta_nombre')?.value,
        email: document.getElementById('consulta_email')?.value,
        telefono: document.getElementById('consulta_telefono')?.value,
        consulta: document.getElementById('consulta_texto')?.value
    };
    
    fetch('process/email_handler.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        mostrarMensajeConsulta(result.message, result.success ? 'success' : 'error');
        if (result.success) setTimeout(() => cerrarModal('modalConsulta'), 2000);
    })
    .catch(() => mostrarMensajeConsulta('Error de conexión', 'error'));
};

function enviarReserva() {
    const metodoPago = document.getElementById('metodoPago')?.value;
    if (!metodoPago) {
        mostrarMensajeReserva('Selecciona un método de pago', 'error');
        return;
    }
    
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
    submitBtn.disabled = true;
    
    const extrasList = [];
    const extraNames = { bastones: 'Bastones', seguro: 'Seguro', traslado: 'Traslado', cena: 'Cena', fotos: 'Fotos' };
    for (const [extra, selected] of Object.entries(selectedExtras)) {
        if (selected) extrasList.push(extraNames[extra]);
    }
    
    const data = {
        type: 'reserva',
        tour: currentTour,
        nombre: document.getElementById('nombre')?.value,
        email: document.getElementById('email')?.value,
        telefono: document.getElementById('telefono')?.value,
        fecha: document.getElementById('fecha')?.value,
        personas: document.getElementById('personas')?.value,
        extras: extrasList.join(', ') || 'Ninguno',
        metodoPago: metodoPago,
        notas: document.getElementById('notas')?.value,
        precioTotal: calcularTotal()
    };
    
    fetch('process/email_handler.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        mostrarMensajeReserva(result.message, result.success ? 'success' : 'error');
        if (result.success) setTimeout(() => cerrarModal('modalReserva'), 2000);
    })
    .catch(() => mostrarMensajeReserva('Error de conexión', 'error'))
    .finally(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

function calcularTotal() {
    const personas = parseInt(document.getElementById('personas')?.value) || 1;
    let total = tourPrices[currentTour] * personas;
    for (const [extra, selected] of Object.entries(selectedExtras)) {
        if (selected) total += extraPrices[extra] * personas;
    }
    return total;
}

// ============================================
// FUNCIONES DE MENSAJES Y CIERRE
// ============================================
function mostrarMensajeConsulta(mensaje, tipo) {
    const modalMessage = document.getElementById('modalConsultaMessage');
    modalMessage.innerHTML = mensaje;
    modalMessage.style.display = 'block';
    modalMessage.className = tipo === 'success' ? 'modal-message-success' : 'modal-message-error';
    setTimeout(() => modalMessage.style.display = 'none', 5000);
}

function mostrarMensajeReserva(mensaje, tipo) {
    const modalMessage = document.getElementById('modalReservaMessage');
    modalMessage.innerHTML = mensaje;
    modalMessage.style.display = 'block';
    modalMessage.className = tipo === 'success' ? 'modal-message-success' : 'modal-message-error';
    setTimeout(() => modalMessage.style.display = 'none', 5000);
}

function cerrarModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners para cerrar modales
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modalConsulta = document.getElementById('modalConsulta');
        const modalReserva = document.getElementById('modalReserva');
        if (modalConsulta.classList.contains('active')) cerrarModal('modalConsulta');
        if (modalReserva.classList.contains('active')) cerrarModal('modalReserva');
    }
});

window.addEventListener('click', function(e) {
    const modalConsulta = document.getElementById('modalConsulta');
    const modalReserva = document.getElementById('modalReserva');
    if (e.target === modalConsulta) cerrarModal('modalConsulta');
    if (e.target === modalReserva) cerrarModal('modalReserva');
});

document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', function() {
        const modalConsulta = document.getElementById('modalConsulta');
        const modalReserva = document.getElementById('modalReserva');
        if (modalConsulta.classList.contains('active')) cerrarModal('modalConsulta');
        if (modalReserva.classList.contains('active')) cerrarModal('modalReserva');
    });
});

console.log('✅ Modal.js listo');