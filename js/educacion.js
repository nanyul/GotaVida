// Importar datos de educacioninfo.js
import donarSangreInfo from '../json/educacioninfo.js';

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
