<section id="tour" class="tour-section">
    <div class="tour-container">
        <div class="section-header">
            <span class="section-subtitle">AVENTURAS INOLVIDABLES</span>
            <h2 class="section-title">Nuestros <span class="green-text">Tours</span></h2>
            <p class="section-description">Descubre las rutas más emblemáticas de Perú con nosotros</p>
        </div>

        <!-- Selector de Tours -->
        <div class="tour-selector">
            <button class="tour-btn active" data-tour="salkantay">
                <i class="fas fa-mountain"></i>
                <span>Salkantay Trekking</span>
            </button>
            <button class="tour-btn" data-tour="inca">
                <i class="fas fa-landmark"></i>
                <span>Camino Inca</span>
            </button>
        </div>

        <!-- Tour Salkantay -->
        <div id="tour-salkantay" class="tour-content active">
            <div class="tour-grid">
                <div class="tour-gallery">
                    <div class="main-image">
                        <img src="https://www.alpacaexpeditions.com/wp-content/webp-express/webp-images/uploads/Salkantay-Tour-the-Inca-Trail-7-Days-6-Nights.jpg.webp" alt="Salkantay Trekking" id="mainImage">
                    </div>
                    <div class="thumbnails">
                        <img src="https://www.alpacaexpeditions.com/wp-content/webp-express/webp-images/uploads/Salkantay-Tour-the-Inca-Trail-7-Days-6-Nights.jpg.webp" alt="Salkantay 1" onclick="changeImage(this.src)">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqjKy6ih8OER-x7i1WFpdty0hgcaEnnh2jWQ&s" alt="Salkantay 2" onclick="changeImage(this.src)">
                        <img src="https://www.boletomachupicchu.com/gutblt/wp-content/uploads/2018/08/salkantay-trek-machu-picchu.jpg" alt="Salkantay 3" onclick="changeImage(this.src)">
                        <img src="https://www.caminosalkantay.com/blog/wp-content/uploads/2025/11/Pareja-turistas-nevado-salkantay-1024x683.jpg" alt="Salkantay 4" onclick="changeImage(this.src)">
                    </div>
                </div>
                
                <div class="tour-info">
                    <h3>Salkantay Trekking 5 Días</h3>
                    <div class="tour-rating">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <span>(450+ reseñas)</span>
                    </div>
                    <p class="tour-description">El Salkantay Trek es considerado uno de los 25 mejores trekking del mundo por National Geographic. Una aventura única que combina paisajes de montaña, selva y llegada a Machu Picchu.</p>
                    
                    <div class="tour-details">
                        <div class="detail-item">
                            <i class="fas fa-clock"></i>
                            <span>5 Días / 4 Noches</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-hiking"></i>
                            <span>Dificultad: Moderada/Alta</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-chart-line"></i>
                            <span>Altura máx: 4,600 msnm</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-users"></i>
                            <span>Grupo máx: 12 personas</span>
                        </div>
                    </div>
                    
                    <div class="tour-price">
                        <span class="old-price">$650</span>
                        <span class="current-price">$520</span>
                        <span class="per-person">por persona</span>
                    </div>
                    
                    <div class="tour-actions">
                        <button class="btn-green" onclick="openReservaModal('Salkantay Trekking')">
                            <i class="fas fa-calendar-check"></i> Reservar Ahora
                        </button>
                        <button class="btn-outline-green" onclick="openConsultaModal('Salkantay Trekking')">
                            <i class="fas fa-question-circle"></i> Consultar
                        </button>
                    </div>
                </div>
            </div>

            <!-- Detalles del Tour (Acordeón) -->
            <div class="tour-accordion">
                <div class="accordion-item">
                    <div class="accordion-header">
                        <i class="fas fa-route"></i>
                        <span>Itinerario</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="accordion-content">
                        <div class="itinerary-day">
                            <h4>Día 1: Cusco - Mollepata - Soraypampa</h4>
                            <p>Recogida del hotel, viaje a Mollepata (2,900m) y caminata hasta Soraypampa (3,850m). Primera noche en campamento.</p>
                        </div>
                        <div class="itinerary-day">
                            <h4>Día 2: Soraypampa - Paso Salkantay - Huayracmachay</h4>
                            <p>Desafío del día: ascenso al punto más alto (4,600m) con vistas espectaculares del Nevado Salkantay.</p>
                        </div>
                        <div class="itinerary-day">
                            <h4>Día 3: Huayracmachay - Collpapampa - La Playa</h4>
                            <p>Descenso a la selva alta, paisajes cambiantes y cascadas.</p>
                        </div>
                        <div class="itinerary-day">
                            <h4>Día 4: La Playa - Hidroeléctrica - Aguas Calientes</h4>
                            <p>Caminata por el valle hasta Hidroeléctrica y tren a Aguas Calientes.</p>
                        </div>
                        <div class="itinerary-day">
                            <h4>Día 5: Aguas Calientes - Machu Picchu - Cusco</h4>
                            <p>Visita guiada a Machu Picchu y retorno a Cusco en tren.</p>
                        </div>
                    </div>
                </div>

                <div class="accordion-item">
                    <div class="accordion-header">
                        <i class="fas fa-check-circle"></i>
                        <span>Qué Incluye</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="accordion-content">
                        <ul class="includes-list">
                            <li><i class="fas fa-check"></i> Transporte ida y vuelta desde Cusco</li>
                            <li><i class="fas fa-check"></i> Guía profesional en español/inglés</li>
                            <li><i class="fas fa-check"></i> Equipo de campamento (carpa, colchoneta)</li>
                            <li><i class="fas fa-check"></i> Alimentación completa (4 desayunos, 4 almuerzos, 4 cenas)</li>
                            <li><i class="fas fa-check"></i> Entrada a Machu Picchu</li>
                            <li><i class="fas fa-check"></i> Tren de regreso a Cusco</li>
                            <li><i class="fas fa-check"></i> Botiquín de primeros auxilios y oxígeno</li>
                        </ul>
                    </div>
                </div>

                <div class="accordion-item">
                    <div class="accordion-header">
                        <i class="fas fa-times-circle"></i>
                        <span>Qué No Incluye</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="accordion-content">
                        <ul class="excludes-list">
                            <li><i class="fas fa-times"></i> Comidas no especificadas</li>
                            <li><i class="fas fa-times"></i> Seguro de viaje</li>
                            <li><i class="fas fa-times"></i> Propinas para guías y personal</li>
                            <li><i class="fas fa-times"></i> Entrada a Huayna Picchu o Montaña Machu Picchu</li>
                            <li><i class="fas fa-times"></i> Bastones de trekking (se pueden alquilar)</li>
                        </ul>
                    </div>
                </div>

                <div class="accordion-item">
                    <div class="accordion-header">
                        <i class="fas fa-video"></i>
                        <span>Video del Tour</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="accordion-content">
                        <div class="video-wrapper">
                            <iframe 
                                src="https://www.youtube.com/embed/VIDEO_ID_SALKANTAY" 
                                title="Salkantay Trekking Video" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen>
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tour Camino Inca -->
        <div id="tour-inca" class="tour-content">
            <div class="tour-grid">
                <div class="tour-gallery">
                    <div class="main-image">
                        <img src="https://caminoincamachupicchu.org/cmingutd/wp-content/uploads/2021/02/caminoinca-4dias.jpg" alt="Camino Inca" id="mainImageInca">
                    </div>
                    <div class="thumbnails">
                        <img src="https://caminoincamachupicchu.org/cmingutd/wp-content/uploads/2021/02/caminoinca-4dias.jpg" alt="Inca 1" onclick="changeImageInca(this.src)">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqFTj6J7oExnuR-V0z9mieWAogxwxgGjA98w&s" alt="Inca 2" onclick="changeImageInca(this.src)">
                        <img src="https://www.boletomachupicchu.com/gutblt/wp-content/uploads/2024/12/turistas-recorriendo-camino-inca-full.jpg" alt="Inca 3" onclick="changeImageInca(this.src)">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROp_rNUR-pOKrrkd67TGc_CTJNUaVd8-Rq_Q&s" alt="Inca 4" onclick="changeImageInca(this.src)">
                    </div>
                </div>
                
                <div class="tour-info">
                    <h3>Camino Inca 4 Días</h3>
                    <div class="tour-rating">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <span>(680+ reseñas)</span>
                    </div>
                    <p class="tour-description">El clásico Camino Inca es la ruta más famosa de Sudamérica. Recorre antiguos caminos empedrados, ruinas arqueológicas y llega a Machu Picchu por la Puerta del Sol.</p>
                    
                    <div class="tour-details">
                        <div class="detail-item">
                            <i class="fas fa-clock"></i>
                            <span>4 Días / 3 Noches</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-hiking"></i>
                            <span>Dificultad: Moderada</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-chart-line"></i>
                            <span>Altura máx: 4,200 msnm</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-users"></i>
                            <span>Grupo máx: 10 personas</span>
                        </div>
                    </div>
                    
                    <div class="tour-price">
                        <span class="old-price">$750</span>
                        <span class="current-price">$590</span>
                        <span class="per-person">por persona</span>
                    </div>
                    
                    <div class="tour-actions">
                        <button class="btn-green" onclick="openReservaModal('Camino Inca')">
                            <i class="fas fa-calendar-check"></i> Reservar Ahora
                        </button>
                        <button class="btn-outline-green" onclick="openConsultaModal('Camino Inca')">
                            <i class="fas fa-question-circle"></i> Consultar
                        </button>
                    </div>
                </div>
            </div>

            <!-- Detalles del Tour Camino Inca -->
            <div class="tour-accordion">
                <div class="accordion-item">
                    <div class="accordion-header">
                        <i class="fas fa-route"></i>
                        <span>Itinerario</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="accordion-content">
                        <div class="itinerary-day">
                            <h4>Día 1: Cusco - Km 82 - Wayllabamba</h4>
                            <p>Salida temprano desde Cusco, inicio del trekking en el Km 82, visita a Llaqtapata y campamento en Wayllabamba (3,000m).</p>
                        </div>
                        <div class="itinerary-day">
                            <h4>Día 2: Wayllabamba - Paso Warmiwañusca</h4>
                            <p>Desafío del día: ascenso al punto más alto (4,200m) en el Abra Warmiwañusca.</p>
                        </div>
                        <div class="itinerary-day">
                            <h4>Día 3: Pacaymayo - Wiñaywayna</h4>
                            <p>Descenso a la selva, visita a ruinas incas como Runkurakay y Sayacmarca.</p>
                        </div>
                        <div class="itinerary-day">
                            <h4>Día 4: Wiñaywayna - Machu Picchu - Cusco</h4>
                            <p>Llegada a Inti Punku (Puerta del Sol), visita guiada a Machu Picchu y retorno a Cusco.</p>
                        </div>
                    </div>
                </div>

                <div class="accordion-item">
                    <div class="accordion-header">
                        <i class="fas fa-check-circle"></i>
                        <span>Qué Incluye</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="accordion-content">
                        <ul class="includes-list">
                            <li><i class="fas fa-check"></i> Permiso oficial para el Camino Inca</li>
                            <li><i class="fas fa-check"></i> Transporte ida y vuelta desde Cusco</li>
                            <li><i class="fas fa-check"></i> Guía profesional especializado</li>
                            <li><i class="fas fa-check"></i> Equipo de campamento y carpas</li>
                            <li><i class="fas fa-check"></i> Alimentación completa (3 desayunos, 3 almuerzos, 3 cenas)</li>
                            <li><i class="fas fa-check"></i> Entrada a Machu Picchu</li>
                            <li><i class="fas fa-check"></i> Tren de regreso</li>
                            <li><i class="fas fa-check"></i> Botiquín y oxígeno</li>
                        </ul>
                    </div>
                </div>

                <div class="accordion-item">
                    <div class="accordion-header">
                        <i class="fas fa-times-circle"></i>
                        <span>Qué No Incluye</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="accordion-content">
                        <ul class="excludes-list">
                            <li><i class="fas fa-times"></i> Comidas no especificadas</li>
                            <li><i class="fas fa-times"></i> Seguro de viaje</li>
                            <li><i class="fas fa-times"></i> Propinas</li>
                            <li><i class="fas fa-times"></i> Entrada a Huayna Picchu ($75 extra)</li>
                            <li><i class="fas fa-times"></i> Bastones de trekking</li>
                        </ul>
                    </div>
                </div>

                <div class="accordion-item">
                    <div class="accordion-header">
                        <i class="fas fa-video"></i>
                        <span>Video del Tour</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="accordion-content">
                        <div class="video-wrapper">
                            <iframe 
                                src="https://www.youtube.com/embed/VIDEO_ID_INCA" 
                                title="Camino Inca Video" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen>
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>