// Importar datos de educacioninfo.js
import { donarSangreInfo, elementosSangreInfo } from '../json/educacioninfo.js';

// Crear la sección de Beneficios de donar sangre
function createBeneficiosSection(data) {
    const container = document.getElementById('beneficios-de-donar');
    if (!container) return;
    container.innerHTML = ''; // Limpiar contenido existente

    // Crear botones de beneficios
    const allBeneficios = data.beneficios_donar_sangre.map((beneficio) => `
        <button class="beneficio-btn">${beneficio}</button>
    `).join('');

    const sectionHTML = `
        <div class="beneficios-content">
            <div class="beneficios-left">
                <h2 class="beneficios-main-title">Algunos</h2>
                <h1 class="beneficios-subtitle">Beneficios de donar sangre</h1>
            </div>
            <div class="beneficios-lista">
                ${allBeneficios}
                <div class="beneficios-right">
                    <img src="${data.beneficios_donar_sangre_imagen}" alt="Beneficios de donar sangre" class="beneficios-image">
                </div>
            </div>
        </div>
    `;

    container.innerHTML = sectionHTML;
}

// Cargar y crear la sección cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    createBeneficiosSection(donarSangreInfo);
});


import { mitosInfo } from '../json/educacioninfo.js';
function createMitosSection(data) {
    const container = document.getElementById('mitos-realidad');
    if (!container) return;
    container.innerHTML = '';

    const sectionHTML = `
        <div class="mitos-content">
            <div class="mitos-grid">
                <div class="mitos-column">
                    <h3 class="column-title mito-title">Mito</h3>
                    ${data.mitos_vs_realidad.map((item, index) => `
                        <div class="mito-card" data-index="${index}">
                            <span class="mito-icon">✖</span>
                            <p class="mito-text">${item.mito}</p>
                        </div>
                    `).join('')}
                </div>
                <div class="mitos-column-center">
                    <div class="mitos-vs-imagen">
                        <img src="${data.imagen}" alt="VS" class="vs-image">
                    </div>
                </div>
                <div class="mitos-column">
                    <h3 class="column-title realidad-title">Realidad</h3>
                    ${data.mitos_vs_realidad.map((item, index) => `
                        <div class="realidad-card" data-index="${index}">
                            <span class="realidad-icon">✓</span>
                            <p class="realidad-text">${item.realidad}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

    container.innerHTML = sectionHTML;
}

document.addEventListener('DOMContentLoaded', () => {
    createMitosSection(mitosInfo);
});

