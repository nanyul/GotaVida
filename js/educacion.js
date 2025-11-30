// Importar datos de educacioninfo.js
import donarSangreInfo from '../json/educacioninfo.js';

// Crear la sección de Beneficios de donar sangre
function createBeneficiosSection(data) {
    const container = document.getElementById('beneficios-de-donar');
    if (!container) return;

    // Crear el título principal
    const titleWrapper = document.createElement('div');
    titleWrapper.className = 'beneficios-title-wrapper';
    
    const mainTitle = document.createElement('h2');
    mainTitle.className = 'beneficios-main-title';
    mainTitle.textContent = 'Algunos';
    
    const subtitle = document.createElement('h1');
    subtitle.className = 'beneficios-subtitle';
    subtitle.textContent = 'Beneficios de donar sangre';
    
    titleWrapper.appendChild(mainTitle);
    titleWrapper.appendChild(subtitle);
    container.appendChild(titleWrapper);

    // Crear el contenedor de contenido
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'beneficios-content';

    // Columna izquierda con beneficios
    const leftColumn = document.createElement('div');
    leftColumn.className = 'beneficios-left-column';

    const leftBeneficios = [
        data.beneficios_donar_sangre[1], // Salvas vidas
        data.beneficios_donar_sangre[3], // Estimula la producción de nuevas células sanguíneas
        data.beneficios_donar_sangre[5]  // Reduces el riesgo de enfermedades cardíaca
    ];

    leftBeneficios.forEach(beneficio => {
        const beneficioBtn = document.createElement('button');
        beneficioBtn.className = 'beneficio-btn beneficio-left';
        beneficioBtn.textContent = beneficio;
        leftColumn.appendChild(beneficioBtn);
    });

    // Columna central con imagen
    const centerColumn = document.createElement('div');
    centerColumn.className = 'beneficios-center-column';
    
    const img = document.createElement('img');
    img.src = data.beneficios_donar_sangre_imagen;
    img.alt = 'Beneficios de donar sangre';
    img.className = 'beneficios-image';
    centerColumn.appendChild(img);

    // Columna derecha con beneficios
    const rightColumn = document.createElement('div');
    rightColumn.className = 'beneficios-right-column';

    const rightBeneficios = [
        data.beneficios_donar_sangre[2], // Mejora la salud cardiovascular
        data.beneficios_donar_sangre[4], // Fomenta una cultura de solidaridad
        data.beneficios_donar_sangre[0]  // Facilitas procedimientos médicos y de emergencia
    ];

    rightBeneficios.forEach(beneficio => {
        const beneficioBtn = document.createElement('button');
        beneficioBtn.className = 'beneficio-btn beneficio-right';
        beneficioBtn.textContent = beneficio;
        rightColumn.appendChild(beneficioBtn);
    });

    // Agregar columnas al contenedor
    contentWrapper.appendChild(leftColumn);
    contentWrapper.appendChild(centerColumn);
    contentWrapper.appendChild(rightColumn);
    container.appendChild(contentWrapper);
}

// Cargar y crear la sección cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    createBeneficiosSection(donarSangreInfo);
});
