document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contacto-form');
    const mensajeDiv = document.getElementById('form-mensaje');
    const modal = document.getElementById('modal-confirmacion');
    const modalDatos = document.getElementById('modal-datos');
    const cerrarModalBtn = document.getElementById('cerrar-modal');
    const btnCerrarModal = document.getElementById('btn-cerrar-modal');

    // Manejar el envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validar captcha PRIMERO
        const captchaResponse = grecaptcha.getResponse();
        if (captchaResponse.length === 0) {
            mostrarMensaje('Por favor verifica el captcha.', 'error');
            return;
        }

        // Obtener valores del formulario
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const asunto = document.getElementById('asunto').value;
        const mensaje = document.getElementById('mensaje').value.trim();

        // Validaciones básicas
        if (!validarFormulario(nombre, email, mensaje)) {
            return;
        }

        // Enviar formulario y mostrar modal
        enviarFormulario(nombre, email, asunto, mensaje);
    });

    function validarFormulario(nombre, email, mensaje) {
        // Validar nombre
        if (nombre.length < 3) {
            mostrarMensaje('Por favor, ingresa un nombre válido (mínimo 3 caracteres).', 'error');
            return false;
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            mostrarMensaje('Por favor, ingresa un email válido.', 'error');
            return false;
        }

        // Validar mensaje
        if (mensaje.length < 10) {
            mostrarMensaje('Por favor, escribe un mensaje más detallado (mínimo 10 caracteres).', 'error');
            return false;
        }

        return true;
    }

    // Función para simular envío y mostrar modal
    function enviarFormulario(nombre, email, asunto, mensaje) {
        // Deshabilitar botón mientras se procesa
        const submitBtn = form.querySelector('.form-submit-btn');
        const textoOriginal = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;

        // Simular delay de red (1.5 segundos)
        setTimeout(() => {
            // Mostrar modal con los datos
            mostrarModal(nombre, email, asunto, mensaje);

            // Limpiar formulario
            form.reset();
            grecaptcha.reset(); // Resetear captcha

            // Restaurar botón
            submitBtn.textContent = textoOriginal;
            submitBtn.disabled = false;
        }, 1500);
    }

    // Función para mostrar el modal con los datos
    function mostrarModal(nombre, email, asunto, mensaje) {
        // Obtener el texto del asunto seleccionado
        const asuntoTexto = document.querySelector(`#asunto option[value="${asunto}"]`).textContent;

        // Crear contenido del modal
        modalDatos.innerHTML = `
            <div class="dato-item">
                <strong>Nombre:</strong> ${nombre}
            </div>
            <div class="dato-item">
                <strong>Email:</strong> ${email}
            </div>
            <div class="dato-item">
                <strong>Asunto:</strong> ${asuntoTexto}
            </div>
            <div class="dato-item">
                <strong>Mensaje:</strong> ${mensaje}
            </div>
        `;

        // Mostrar modal
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    // Función para cerrar el modal
    function cerrarModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    // Event listeners para cerrar modal
    if (cerrarModalBtn) {
        cerrarModalBtn.addEventListener('click', cerrarModal);
    }
    
    if (btnCerrarModal) {
        btnCerrarModal.addEventListener('click', cerrarModal);
    }

    // Cerrar modal al hacer click fuera
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            cerrarModal();
        }
    });

    // Función para mostrar mensajes
    function mostrarMensaje(texto, tipo) {
        mensajeDiv.textContent = texto;
        mensajeDiv.className = 'form-mensaje ' + tipo;
        mensajeDiv.style.display = 'block';

        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
            mensajeDiv.style.display = 'none';
        }, 5000);
    }

    // Validación en tiempo real para email
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('blur', function() {
        const email = this.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email && !emailRegex.test(email)) {
            this.style.borderColor = '#AA0235';
        } else {
            this.style.borderColor = '';
        }
    });

    // Contador de caracteres para el textarea (opcional)
    const mensajeTextarea = document.getElementById('mensaje');
    const minCaracteres = 10;

    mensajeTextarea.addEventListener('input', function() {
        const longitud = this.value.trim().length;
        
        if (longitud > 0 && longitud < minCaracteres) {
            this.style.borderColor = '#AA0235';
        } else if (longitud >= minCaracteres) {
            this.style.borderColor = '#4caf50';
        } else {
            this.style.borderColor = '';
        }
    });

    // Limpiar estilos de validación cuando el usuario empiece a escribir
    const inputs = form.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '';
        });
    });
});
