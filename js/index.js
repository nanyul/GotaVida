// Carrusel
let currentSlide = 0;
let slides = [];
let totalSlides = 0;


fetch("json/carousel.json")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        createCarouselSlides(data.slides);
        slides = document.querySelectorAll('.carousel-slide');
        totalSlides = slides.length;
        startCarousel();
        
        // Notificar que el carrusel está listo
        console.log('Carrusel creado, disparando evento carouselReady');
        window.dispatchEvent(new Event('carouselReady'));
    })
    .catch(error => {
        console.error('Error loading carousel data:', error);

        slides = document.querySelectorAll('.carousel-slide');
        totalSlides = slides.length;
        startCarousel();
        
        // Disparar evento incluso si hay error
        window.dispatchEvent(new Event('carouselReady'));
    });

function createCarouselSlides(slidesData) {
    const carouselContainer = document.getElementById('carousel');
    carouselContainer.innerHTML = ''; // Limpiar existentes slides

    slidesData.forEach((slideData, index) => {
        // Aignar color en base al index
        let buttonColor = '';
        let buttonHoverColor = '';

        if (index === 0) {
            buttonColor = '#003049';
            buttonHoverColor = '#264a6b';
        } else if (index === 1) {
            buttonColor = '#69021E';
            buttonHoverColor = '#a12c3d';
        } else if (index === 2) {
            buttonColor = '#AA0235';
            buttonHoverColor = '#d13c6a';
        } else {
            buttonColor = '#003049';
            buttonHoverColor = '#264a6b';
        }

        // Construir el atributo data-action solo para el primer botón
        const dataAction = index === 0 ? 'data-action="test-donacion"' : '';
        // Construir el onclick para el segundo botón (Donar ahora)
        const onclickAction = index === 1 ? 'onclick="window.location.href=\'centros.html\'"' : 
                              index === 2 ? 'onclick="window.location.href=\'acercade.html\'"' : '';
        console.log(`Slide ${index}: dataAction = "${dataAction}", onclick = "${onclickAction}"`);

        const slideHTML = `
        <div class="carousel-slide absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === 0 ? 'opacity-100' : 'opacity-0'}" style="z-index: ${index === 0 ? '10' : '1'};">
            <img src="${slideData.image}" class="w-full h-full object-cover" alt="Slide ${index + 1}">
            <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div class="text-center" style="color: #F7F3DA;">
                    <h2 class="text-4xl font-bold mb-4">${slideData.title}</h2>
                    <button ${dataAction} ${onclickAction} style="background-color: ${buttonColor}; color: #F7F3DA; font-weight: bold; padding: 0.75rem 2rem; border-radius: 9999px; transition: background-color 0.3s; cursor: pointer;" onmouseover="this.style.backgroundColor='${buttonHoverColor}'" onmouseout="this.style.backgroundColor='${buttonColor}'">
                    ${slideData.buttonText}
                    </button>
                </div>
            </div>
        </div>
        `;
        carouselContainer.innerHTML += slideHTML;
    });
    
    // Verificar que los botones se crearon correctamente
    setTimeout(() => {
        const botonesConDataAction = document.querySelectorAll('[data-action="test-donacion"]');
        console.log('Botones con data-action encontrados después de crear carrusel:', botonesConDataAction.length);
        botonesConDataAction.forEach((btn, i) => {
            console.log(`Botón ${i}:`, btn.getAttribute('data-action'), btn.textContent.trim());
        });
    }, 100);
}

function showSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.remove('opacity-0');
            slide.classList.add('opacity-100');
            slide.style.zIndex = '10'; // Slide visible encima
        } else {
            slide.classList.remove('opacity-100');
            slide.classList.add('opacity-0');
            slide.style.zIndex = '1'; // Slides ocultos debajo
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function startCarousel() {
    setInterval(nextSlide, 4000);
}

//Importancia seccion
fetch("json/importancia.json")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        createImportanciaSection(data);
    })
    .catch(error => {
        console.error('Error loading importancia data:', error);
    });

function createImportanciaSection(data) {
    const importanciaContainer = document.getElementById('importancia');
    importanciaContainer.innerHTML = ''; // Limpiar contenido existente

    const tituloHTML = `<h2 class="importancia-title">${data.titulo}</h2>`;
    let elementosHTML = '<div class="importancia-elementos-row">';
    data.elementos.forEach(elemento => {
        const descripcionConSaltos = elemento.descripcion.replace(/\n/g, '<br>');
        elementosHTML += `
            <div class="importancia-elemento">
                <img src="${elemento.icono}" alt="Icono importancia" class="importancia-icono">
                <p class="importancia-descripcion">${descripcionConSaltos}</p>
            </div>
        `;
    });
    elementosHTML += '</div>';
    importanciaContainer.innerHTML = tituloHTML + elementosHTML;
}

//Antes de donar seccion
fetch("json/antesdedonar.json")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        createAntesDeDonarSection(data);
    })
    .catch(error => {
        console.error('Error loading antes de donar data:', error);
    });

function createAntesDeDonarSection(data) {
    const antesContainer = document.getElementById('antes-de-donar');
    antesContainer.innerHTML = ''; // Limpiar contenido existente

    const sectionHTML = `
        <div class="antes-content">
            <div class="antes-left">
                <h2 class="antes-title">${data.titulo}</h2>
                <div class="antes-lista">
                    ${data.recomendaciones.map(rec => `
                        <div class="antes-item">
                            <span class="antes-numero">${rec.numero}</span>
                            <p class="antes-descripcion">${rec.descripcion}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="antes-right">
                <img src="${data.Imagen}" alt="Antes de donar" class="antes-imagen">
            </div>
        </div>
    `;
    antesContainer.innerHTML = sectionHTML;
}

//Quien puede donar seccion
fetch("json/quiendonar.json")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        createQuienDonarSection(data);
    })
    .catch(error => {
        console.error('Error loading importancia data:', error);
    });

function createQuienDonarSection(data) {
    const quienDonarContainer = document.getElementById('quien-donar');
    quienDonarContainer.innerHTML = '';

    const tituloHTML = `<h2 class="quien-donar-title">${data.titulo}</h2>`;
    let elementosHTML = '<div class="quien-donar-elementos-row">';
    data.requisitos.forEach(requisito => {
        const descripcionConSaltos = requisito.descripcion.replace(/\n/g, '<br>');
        elementosHTML += `
            <div class="quien-donar-elemento">
                <img src="${requisito.icono}" alt="Icono quien puede donar" class="quien-donar-icono">
                <p class="quien-donar-descripcion">${descripcionConSaltos}</p>
            </div>
        `;
    });
    elementosHTML += '</div>';
    quienDonarContainer.innerHTML = tituloHTML + elementosHTML;
}

//Despues de donar seccion
fetch("json/despuesdedonar.json")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        createDespuesDeDonarSection(data);
    })
    .catch(error => {
        console.error('Error loading despues de donar data:', error);
    });

function createDespuesDeDonarSection(data) {
    const despuesContainer = document.getElementById('despues-de-donar');
    despuesContainer.innerHTML = ''; // Limpiar contenido existente

    const sectionHTML = `
        <div class="despues-content">
                    <div class="despues-right">
                <img src="${data.Imagen}" alt="Después de donar" class="despues-imagen">
            </div>
            <div class="despues-left">
                <h2 class="despues-title">${data.titulo}</h2>
                <div class="despues-lista">
                    ${data.recomendaciones.map(rec => `
                        <div class="despues-item">
                            <span class="despues-numero">${rec.numero}</span>
                            <p class="despues-descripcion">${rec.descripcion}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    despuesContainer.innerHTML = sectionHTML;

}

//Recuadros seccion
import('../json/recuadros.js')
    .then(module => {
        console.log(module.default);
        createRecuadrosSection(module.default);
    })
    .catch(error => {
        console.error('Error loading recuadros data:', error);
    });

function createRecuadrosSection(data) {
    const recuadrosContainer = document.getElementById('recuadros-container');
    recuadrosContainer.innerHTML = '';

    // Mensaje principal de donaciones
    const mensajePrincipalHTML = `
        <div class="donaciones-counter">
            <div class="punno-container">
                <img src="${data.donaciones.imagen1}" alt="punno" class="punno-imagen">
            </div>
            <div class="donaciones-content">
                <h2 class="donaciones-mensaje">${data.donaciones.mensaje}</h2>
                <div class="donaciones-total">${data.donaciones.total.toLocaleString()} DONACIONES</div>
            </div>
            <div class="elementos-container">
                <img src="${data.donaciones.imagen2}" alt="Elementos" class="elementos-imagen">
            </div>
        </div>
    `;

    // Grid de secciones
    let seccionesHTML = '<div class="recuadros-grid">';

    data.secciones.forEach((seccion, index) => {
        let recuadroContent = '';

        if (seccion.nombre === "Registro de Donantes") {
            recuadroContent = `
                <div class="recuadro registro-donantes">
                    <div class="corazonredondo-container">
                        <img src="${seccion.imagen}" alt="CorazonRedondo" class="corazonredondo-imagen">
                    </div>
                    <h3 class="recuadro-title">${seccion.nombre}</h3>
                    <p class="recuadro-descripcion">${seccion.descripcion}</p>
                    <ul class="recuadro-beneficios">
                        ${seccion.beneficios.map(beneficio => `<li>• ${beneficio}</li>`).join('')}
                    </ul>
                    <button class="recuadro-btn"><a href="donante.html">${seccion.boton}</a></button>
                </div>
            `;
        } else if (seccion.nombre === "Campañas y Centros cercanos") {
            recuadroContent = `
                <div class="recuadro campanias-centros">
                    <h3 class="recuadro-title">${seccion.nombre}</h3>
                    <div class="mapa-container">
                        <img src="${seccion.imagen}" alt="Mapa" class="mapa-imagen">
                    </div>
                    <button class="recuadro-btn"><a href="contacto.html">${seccion.boton}</a></button>
                </div>
            `;
        } else if (seccion.nombre === "Alertas y Notificaciones") {
            recuadroContent = `
                <div class="recuadro alertas-notificaciones">
                    <h3 class="recuadro-title">${seccion.nombre}</h3>
                    <div class="alerta-urgente">
                        <div class="gotasangre-container">
                            <img src="${seccion.imagen}" alt="Gota de Sangre" class="gotasangre-imagen">
                        </div>
                        <div class="alerta-content">
                            <p class="alerta-descripcion">${seccion.descripcion}</p>
                            <div class="alerta-detalle">
                                <span class="alerta-lugar">${seccion.detalle.lugar}</span>
                                <span class="alerta-tiempo">${seccion.detalle.tiempo}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else if (seccion.nombre === "Sección Educativa") {
            recuadroContent = `
                <div class="recuadro seccion-educativa">
                    <h3 class="recuadro-title">${seccion.nombre}</h3>
                    <p class="recuadro-descripcion">${seccion.descripcion}</p>
                    <button class="recuadro-btn"><a href="educacion.html">${seccion.boton}</a></button>
                </div>
            `;
        } else if (seccion.nombre === "Reconocimiento, insignias y Perfil") {
            recuadroContent = `
                <div class="recuadro reconocimiento-perfil">
                    <h3 class="recuadro-title">${seccion.nombre}</h3>
                    <p class="recuadro-descripcion">${seccion.descripcion}</p>
                    <button class="recuadro-btn"><a href="segumiento.html">${seccion.boton}</a></button>
                </div>
            `;
        } else if (seccion.nombre === "Estadísticas y Testimonios") {
            const tituloConSalto = "Estadísticas y <br> Testimonios";
            recuadroContent = `
                <div class="recuadro estadisticas-testimonios">
                    <div class="estadisticas-testimonios-header">
                        <h3 class="recuadro-title">${tituloConSalto}</h3>
                        <img src="${seccion.imagen}" alt="Mano con Corazon" class="manocorazon-imagen">
                    </div>
                    <p class="recuadro-descripcion">${seccion.descripcion}</p>
                    <button class="recuadro-btn"><a href="contacto.html">${seccion.boton}</a></button>
                </div>
            `;
        }

        seccionesHTML += recuadroContent;
    });

    seccionesHTML += '</div>';

    recuadrosContainer.innerHTML = mensajePrincipalHTML + seccionesHTML;
}


