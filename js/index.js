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
    })
    .catch(error => {
        console.error('Error loading carousel data:', error);

        slides = document.querySelectorAll('.carousel-slide');
        totalSlides = slides.length;
        startCarousel();
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

        const slideHTML = `
        <div class="carousel-slide absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === 0 ? 'opacity-100' : 'opacity-0'}">
            <img src="${slideData.image}" class="w-full h-full object-cover" alt="Slide ${index + 1}">
            <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div class="text-center" style="color: #F7F3DA;">
                    <h2 class="text-4xl font-bold mb-4">${slideData.title}</h2>
                    <button style="background-color: ${buttonColor}; color: #F7F3DA; font-weight: bold; padding: 0.75rem 2rem; border-radius: 9999px; transition: background-color 0.3s;" onmouseover="this.style.backgroundColor='${buttonHoverColor}'" onmouseout="this.style.backgroundColor='${buttonColor}'">
                    ${slideData.buttonText}
                    </button>
                </div>
            </div>
        </div>
        `;
        carouselContainer.innerHTML += slideHTML;
    });
}

function showSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.remove('opacity-0');
            slide.classList.add('opacity-100');
        } else {
            slide.classList.remove('opacity-100');
            slide.classList.add('opacity-0');
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


