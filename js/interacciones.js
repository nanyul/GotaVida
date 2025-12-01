// Test de Donación de Sangre - Modal emergente
// preguntas del test
const testPreguntas = [
    {
        id: 'edad',
        pregunta: '¿Qué edad tenés?',
        tipo: 'select',
        opciones: [
            { valor: 'menor18', texto: 'Menor de 18 años' },
            { valor: 'entre18-64', texto: 'Entre 18 y 64 años' },
            { valor: 'mayor65', texto: 'Mayor de 65 años' }
        ],
        requerido: true
    },
    {
        id: 'peso',
        pregunta: '¿Cuánto pesás?',
        tipo: 'select',
        opciones: [
            { valor: 'menos50', texto: 'Menos de 50kg' },
            { valor: 'mas50', texto: 'Más de 50kg' }
        ],
        requerido: true
    },
    {
        id: 'embarazo',
        pregunta: '¿Estás embarazada o piensas que podrías estarlo?',
        tipo: 'select',
        opciones: [
            { valor: 'no', texto: 'No/No Aplica' },
            { valor: 'si', texto: 'Sí' }
        ],
        requerido: true
    },
    {
        id: 'salud',
        pregunta: '¿Gozas de buen estado de salud?',
        tipo: 'select',
        opciones: [
            { valor: 'si', texto: 'Sí' },
            { valor: 'no', texto: 'No' }
        ],
        requerido: true
    },
    {
        id: 'cirugiaMenor',
        pregunta: '¿Te has sometido a alguna intervención de cirugía menor* en la última semana?',
        descripcion: '* Cirugía de duración generalmente corta y que no requiere hospitalización, realizada en tejidos superficiales y accesibles, que suele conllevar anestesia local, por ejemplo: extracción dental, sutura de heridas, etc.',
        tipo: 'select',
        opciones: [
            { valor: 'no', texto: 'No' },
            { valor: 'si', texto: 'Sí' }
        ],
        requerido: true
    },
    {
        id: 'cirugiaMayor',
        pregunta: '¿Te has sometido a alguna intervención de cirugía mayor* tatuaje, piercing o microblading en los últimos 3 meses?',
        descripcion: '* Intervenciones complejas, que suelen conllevar anestesia general, por ejemplo: cirugía torácica, craneotomía, fractura grave (fémur, pelvis, etc.), prótesis articular (cadera, rodilla, etc.)',
        tipo: 'select',
        opciones: [
            { valor: 'no', texto: 'No' },
            { valor: 'si', texto: 'Sí' }
        ],
        requerido: true
    }
];


function evaluarTest(respuestas) {
    // Verificar edad
    if (respuestas.edad === 'menor18' || respuestas.edad === 'mayor65') {
        return {
            aprobado: false,
            mensaje: 'Lamentablemente, no cumples con el requisito de edad para donar sangre. Debes tener entre 18 y 64 años.'
        };
    }

    // Verificar peso
    if (respuestas.peso === 'menos50') {
        return {
            aprobado: false,
            mensaje: 'Lamentablemente, no cumples con el requisito de peso mínimo. Debes pesar más de 50kg para donar sangre.'
        };
    }

    // Verificar embarazo
    if (respuestas.embarazo === 'si') {
        return {
            aprobado: false,
            mensaje: 'Durante el embarazo no es posible donar sangre. Te esperamos después del parto.'
        };
    }

    // Verificar estado de salud
    if (respuestas.salud === 'no') {
        return {
            aprobado: false,
            mensaje: 'Es importante estar en buen estado de salud para donar sangre. Consulta con tu médico.'
        };
    }

    // Verificar cirugía menor
    if (respuestas.cirugiaMenor === 'si') {
        return {
            aprobado: false,
            mensaje: 'Debes esperar al menos 1 semana desde una cirugía menor para poder donar sangre.'
        };
    }

    // Verificar cirugía mayor
    if (respuestas.cirugiaMayor === 'si') {
        return {
            aprobado: false,
            mensaje: 'Debes esperar 3 meses para poder donar sangre. Te esperamos. Gracias'
        };
    }

    // Si pasa todas las validaciones
    return {
        aprobado: true,
        mensaje: '¡Felicidades! Cumples con todos los requisitos para donar sangre. Tu donación puede salvar hasta 3 vidas.'
    };
}

// Crear el modal del test
function crearModalTest() {
    const modalHTML = `
        <div id="modal-test-donacion" class="modal-overlay" style="display: none;">
            <div class="modal-container">
                <button class="modal-close" id="cerrar-modal-test">&times;</button>
                <h2 class="modal-title">Test de donación</h2>
                
                <form id="form-test-donacion" class="test-form">
                    ${testPreguntas.map((pregunta, index) => `
                        <div class="pregunta-container">
                            <label class="pregunta-label">
                                ${pregunta.pregunta}${pregunta.requerido ? '<span class="requerido">*</span>' : ''}
                            </label>
                            ${pregunta.descripcion ? `<p class="pregunta-descripcion">${pregunta.descripcion}</p>` : ''}
                            
                            <select 
                                id="${pregunta.id}" 
                                name="${pregunta.id}" 
                                class="pregunta-select"
                                ${pregunta.requerido ? 'required' : ''}
                            >
                                <option value="">Seleccionar...</option>
                                ${pregunta.opciones.map(opcion => `
                                    <option value="${opcion.valor}">${opcion.texto}</option>
                                `).join('')}
                            </select>
                        </div>
                    `).join('')}
                    
                    <button type="submit" class="test-btn-submit">Obtener resultado</button>
                </form>
                
                <div id="resultado-test" class="resultado-container" style="display: none;">
                    <p id="mensaje-resultado" class="resultado-mensaje"></p>
                    <button id="cerrar-resultado" class="test-btn-cerrar">Cerrar</button>
                </div>
            </div>
        </div>
    `;

    // Insertar el modal en el body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Inicializar el test cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded ejecutado');
    
    // Crear el modal
    crearModalTest();

    // Referencias a elementos
    const modal = document.getElementById('modal-test-donacion');
    const cerrarModalBtn = document.getElementById('cerrar-modal-test');
    const formTest = document.getElementById('form-test-donacion');
    const resultadoDiv = document.getElementById('resultado-test');
    const mensajeResultado = document.getElementById('mensaje-resultado');
    const cerrarResultadoBtn = document.getElementById('cerrar-resultado');

    console.log('Modal encontrado:', modal ? 'SÍ' : 'NO');

    // Usar delegación de eventos para capturar clicks en botones del carrusel
    // Esto funciona incluso si los botones se crean dinámicamente después
    document.addEventListener('click', function(e) {
        console.log('Click detectado en:', e.target.tagName, e.target.textContent.substring(0, 30));
        
        // Verificar si el click fue en un botón con data-action="test-donacion"
        const botonTest = e.target.closest('[data-action="test-donacion"]');
        
        if (botonTest) {
            console.log('✅ Click detectado en botón del test');
            console.log('Atributo data-action:', botonTest.getAttribute('data-action'));
            e.preventDefault();
            e.stopPropagation();
            
            if (modal) {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                console.log('✅ Modal abierto');
            } else {
                console.error('❌ Modal no encontrado');
            }
        } else {
            console.log('⚠️ Click NO fue en botón con data-action="test-donacion"');
        }
    });

    // Cerrar modal con botón X
    cerrarModalBtn.addEventListener('click', function() {
        cerrarModal();
    });

    // Cerrar modal al hacer click fuera del contenedor
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            cerrarModal();
        }
    });

    // Función para cerrar el modal
    function cerrarModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        formTest.reset();
        formTest.style.display = 'block';
        resultadoDiv.style.display = 'none';
    }

    // Manejar envío del formulario
    formTest.addEventListener('submit', function(e) {
        e.preventDefault();

        // Recopilar respuestas
        const respuestas = {};
        testPreguntas.forEach(pregunta => {
            const elemento = document.getElementById(pregunta.id);
            respuestas[pregunta.id] = elemento.value;
        });

        // Evaluar el test
        const resultado = evaluarTest(respuestas);

        // Mostrar resultado
        formTest.style.display = 'none';
        resultadoDiv.style.display = 'block';
        mensajeResultado.textContent = resultado.mensaje;
        
        // Agregar clase según aprobado o no
        resultadoDiv.className = 'resultado-container ' + (resultado.aprobado ? 'aprobado' : 'no-aprobado');
    });

    // Cerrar resultado y volver al formulario
    cerrarResultadoBtn.addEventListener('click', function() {
        cerrarModal();
    });

    // Cerrar con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            cerrarModal();
        }
    });
});
