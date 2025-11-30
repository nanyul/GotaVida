// Importar datos de educacioninfo.js
import { cuidadosDonacionInfo } from '../json/educacioninfo.js';

// Crear la sección de Cuidados al donar sangre
function createCuidadosSection(data) {
    const container = document.getElementById('cuidados-donacion');
    if (!container) return;
    container.innerHTML = ''; // Limpiar contenido existente

    const sectionHTML = `
        <div class="cuidados-content">
            <h2 class="cuidados-title">${data.titulo}</h2>
            <div class="cuidados-grid">
                <div class="cuidados-lista">
                    ${data.cuidados.map((cuidado, index) => `
                        <div class="cuidado-item" data-index="${index}">
                            <div class="cuidado-icon-wrapper">
                                <img src="${cuidado.icono}" alt="${cuidado.texto}" class="cuidado-icon">
                            </div>
                            <div class="cuidado-line"></div>
                            <p class="cuidado-text">${cuidado.texto}</p>
                        </div>
                    `).join('')}
                </div>
                <div class="cuidados-imagen">
                    <img src="${data.imagen}" alt="Cuidados al donar sangre" class="cuidados-img">
                </div>
            </div>
        </div>
    `;

    container.innerHTML = sectionHTML;
}

// Cargar y crear la sección cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    createCuidadosSection(cuidadosDonacionInfo);
});
