<!-- ============================================
     MODAL DE CONSULTA (1 paso - Formulario simple)
     ============================================ -->
<div id="modalConsulta" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h3 id="modalConsultaTitle">Consultar Tour</h3>
            <button class="close-modal">&times;</button>
        </div>
        <div class="modal-body">
            <div id="modalConsultaDescription"></div>
            <div id="modalConsultaMessage" style="display: none; padding: 12px; margin-top: 15px; border-radius: 8px;"></div>
        </div>
        <div class="modal-footer">
            <button class="btn-secondary close-modal">Cerrar</button>
        </div>
    </div>
</div>

<!-- ============================================
     MODAL DE RESERVA (3 pasos)
     ============================================ -->
<div id="modalReserva" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <div class="step-indicator">
                <div class="step active" data-step="1">
                    <div class="step-number">1</div>
                    <div class="step-label">Datos</div>
                </div>
                <div class="step" data-step="2">
                    <div class="step-number">2</div>
                    <div class="step-label">Extras</div>
                </div>
                <div class="step" data-step="3">
                    <div class="step-number">3</div>
                    <div class="step-label">Pago</div>
                </div>
            </div>
            <h3 id="modalReservaTitle">Reservar Tour</h3>
            <button class="close-modal">&times;</button>
        </div>
        <div class="modal-body">
            <div id="modalReservaDescription"></div>
            <div id="modalReservaMessage" style="display: none; padding: 12px; margin-top: 15px; border-radius: 8px;"></div>
        </div>
        <div class="modal-footer">
            <button class="btn-secondary" id="prevBtn">← Anterior</button>
            <button class="btn-green" id="nextBtn">Siguiente →</button>
            <button class="btn-green" id="submitBtn">✅ Reservar Ahora</button>
            <button class="btn-secondary close-modal">Cerrar</button>
        </div>
    </div>
</div>