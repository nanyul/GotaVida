// Importar datos de educacioninfo.js
import { elementosSangreInfo } from '../json/educacioninfo.js';

// Estado del juego
let componentesColocados = {
    zona1: null,
    zona2: null,
    zona3: null
};

// Solución correcta (basado en la imagen - de izquierda a derecha)
const solucionCorrecta = {
    zona1: "Glóbulos rojos",
    zona2: "Glóbulos blancos y plaquetas",
    zona3: "Plasma"
};

// Crear la sección del juego
function createJuegoSangreSection(data) {
    const container = document.getElementById('juego-sangre');
    if (!container) return;
    container.innerHTML = '';

    // Crear las tarjetas arrastrables
    const tarjetasHTML = data.componentes.map((componente, idx) => `
        <div class="componente-card" draggable="true" data-componente="${componente.nombre}" id="card-${idx}">
            <img src="${componente.imagen}" alt="${componente.nombre}" class="componente-img">
        </div>
    `).join('');

    const sectionHTML = `
        <div class="juego-content">
            <h2 class="juego-title">${data.titulo}</h2>
            <p class="juego-subtitle">${data.subtitulo}</p>
            
            <div class="juego-area">
                <!-- Área de componentes para arrastrar -->
                <div class="componentes-disponibles">
                    ${tarjetasHTML}
                </div>

                <!-- Imagen central con zonas de drop -->
                <div class="imagen-central">
                    <img src="${data.imagen}" alt="Componentes de la sangre" class="sangre-principal-img">
                    
                    <!-- Zonas de drop sobre la imagen -->
                    <div class="drop-zone" id="zona1" data-zona="zona1">
                        <div class="drop-placeholder">+</div>
                    </div>
                    <div class="drop-zone" id="zona2" data-zona="zona2">
                        <div class="drop-placeholder">+</div>
                    </div>
                    <div class="drop-zone" id="zona3" data-zona="zona3">
                        <div class="drop-placeholder">+</div>
                    </div>
                </div>
            </div>

            <button class="verificar-btn" id="verificar-btn">Verificar respuestas</button>
            <div class="resultado-mensaje" id="resultado-mensaje"></div>
        </div>
    `;

    container.innerHTML = sectionHTML;

    // Inicializar el drag & drop
    initDragAndDrop();
}

// Inicializar funcionalidad de arrastrar y soltar
function initDragAndDrop() {
    const cards = document.querySelectorAll('.componente-card');
    const dropZones = document.querySelectorAll('.drop-zone');
    const verificarBtn = document.getElementById('verificar-btn');

    // Eventos para las tarjetas (escritorio)
    cards.forEach(card => {
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
        
        // Eventos táctiles para móviles
        card.addEventListener('touchstart', handleTouchStart, { passive: false });
        card.addEventListener('touchmove', handleTouchMove, { passive: false });
        card.addEventListener('touchend', handleTouchEnd, { passive: false });
    });

    // Eventos para las zonas de drop
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('dragenter', handleDragEnter);
        zone.addEventListener('dragleave', handleDragLeave);
        zone.addEventListener('drop', handleDrop);
    });

    // Evento para verificar
    if (verificarBtn) {
        verificarBtn.addEventListener('click', verificarRespuestas);
    }
}

// Funciones de drag
let draggedElement = null;
let touchDraggedElement = null;
let touchClone = null;

function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }

    this.classList.remove('over');

    if (draggedElement) {
        // Si ya hay algo en esta zona, devolverlo
        const existingCard = this.querySelector('.componente-card');
        if (existingCard) {
            document.querySelector('.componentes-disponibles').appendChild(existingCard);
        }

        // Colocar la nueva tarjeta
        const componenteNombre = draggedElement.getAttribute('data-componente');
        const zonaId = this.getAttribute('data-zona');
        
        // Actualizar estado
        componentesColocados[zonaId] = componenteNombre;

        // Mover visualmente
        this.appendChild(draggedElement);
        this.classList.add('filled');

        // Ocultar placeholder
        const placeholder = this.querySelector('.drop-placeholder');
        if (placeholder) {
            placeholder.style.display = 'none';
        }
    }

    return false;
}

// Funciones táctiles para móviles
function handleTouchStart(e) {
    e.preventDefault();
    touchDraggedElement = this;
    this.classList.add('dragging');
    
    // Crear un clon visual para arrastrar
    touchClone = this.cloneNode(true);
    touchClone.style.position = 'fixed';
    touchClone.style.zIndex = '9999';
    touchClone.style.opacity = '0.8';
    touchClone.style.pointerEvents = 'none';
    touchClone.style.width = this.offsetWidth + 'px';
    touchClone.style.height = this.offsetHeight + 'px';
    document.body.appendChild(touchClone);
    
    // Posicionar el clon en el dedo
    const touch = e.touches[0];
    touchClone.style.left = (touch.pageX - this.offsetWidth / 2) + 'px';
    touchClone.style.top = (touch.pageY - this.offsetHeight / 2) + 'px';
}

function handleTouchMove(e) {
    e.preventDefault();
    
    if (!touchClone || !touchDraggedElement) return;
    
    const touch = e.touches[0];
    touchClone.style.left = (touch.pageX - touchClone.offsetWidth / 2) + 'px';
    touchClone.style.top = (touch.pageY - touchClone.offsetHeight / 2) + 'px';
    
    // Detectar sobre qué zona está
    const dropZones = document.querySelectorAll('.drop-zone');
    dropZones.forEach(zone => zone.classList.remove('over'));
    
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    const dropZone = elementBelow?.closest('.drop-zone');
    
    if (dropZone) {
        dropZone.classList.add('over');
    }
}

function handleTouchEnd(e) {
    e.preventDefault();
    
    if (!touchDraggedElement) return;
    
    touchDraggedElement.classList.remove('dragging');
    
    // Obtener la posición final
    const touch = e.changedTouches[0];
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    const dropZone = elementBelow?.closest('.drop-zone');
    
    // Limpiar clases 'over'
    document.querySelectorAll('.drop-zone').forEach(zone => zone.classList.remove('over'));
    
    if (dropZone) {
        // Si ya hay algo en esta zona, devolverlo
        const existingCard = dropZone.querySelector('.componente-card');
        if (existingCard) {
            document.querySelector('.componentes-disponibles').appendChild(existingCard);
        }
        
        // Colocar la nueva tarjeta
        const componenteNombre = touchDraggedElement.getAttribute('data-componente');
        const zonaId = dropZone.getAttribute('data-zona');
        
        // Actualizar estado
        componentesColocados[zonaId] = componenteNombre;
        
        // Mover visualmente
        dropZone.appendChild(touchDraggedElement);
        dropZone.classList.add('filled');
        
        // Ocultar placeholder
        const placeholder = dropZone.querySelector('.drop-placeholder');
        if (placeholder) {
            placeholder.style.display = 'none';
        }
    }
    
    // Limpiar el clon
    if (touchClone && touchClone.parentNode) {
        touchClone.parentNode.removeChild(touchClone);
    }
    
    touchClone = null;
    touchDraggedElement = null;
}

// Verificar respuestas
function verificarRespuestas() {
    const resultadoDiv = document.getElementById('resultado-mensaje');
    let correctas = 0;
    let total = 3;

    // Verificar cada zona
    Object.keys(componentesColocados).forEach(zona => {
        const respuesta = componentesColocados[zona];
        const correcta = solucionCorrecta[zona];
        const dropZone = document.getElementById(zona);

        if (respuesta === correcta) {
            correctas++;
            dropZone.classList.add('correcta');
            dropZone.classList.remove('incorrecta');
        } else {
            dropZone.classList.add('incorrecta');
            dropZone.classList.remove('correcta');
        }
    });

    // Mostrar resultado
    if (correctas === total) {
        resultadoDiv.innerHTML = `
            <div class="resultado-exito">
                ¡Excelente! Has colocado correctamente todos los componentes de la sangre.
            </div>
        `;
    } else {
        resultadoDiv.innerHTML = `
            <div class="resultado-parcial">
                ✓ ${correctas} de ${total} correctas. Intenta reorganizar los componentes.
            </div>
        `;
    }

    resultadoDiv.style.display = 'block';
}

// Reiniciar juego
function reiniciarJuego() {
    componentesColocados = {
        zona1: null,
        zona2: null,
        zona3: null
    };

    const dropZones = document.querySelectorAll('.drop-zone');
    dropZones.forEach(zone => {
        zone.classList.remove('correcta', 'incorrecta', 'filled');
        const card = zone.querySelector('.componente-card');
        if (card) {
            document.querySelector('.componentes-disponibles').appendChild(card);
        }
        const placeholder = zone.querySelector('.drop-placeholder');
        if (placeholder) {
            placeholder.style.display = 'flex';
        }
    });

    const resultadoDiv = document.getElementById('resultado-mensaje');
    if (resultadoDiv) {
        resultadoDiv.style.display = 'none';
    }
}

// Cargar el juego cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    createJuegoSangreSection(elementosSangreInfo);
});
