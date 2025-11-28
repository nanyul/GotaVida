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
