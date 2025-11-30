document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contacto-form');
    const mensajeDiv = document.getElementById('form-mensaje');

    // Manejar el envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Obtener valores del formulario
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();

        // Validaciones básicas
        if (!validarFormulario(nombre, email, mensaje)) {
            return;
        }

        // Simular envío del formulario (en producción, aquí iría una llamada a la API)
        enviarFormulario(nombre, email, mensaje);
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

    // Función para simular envío
    function enviarFormulario(nombre, email, mensaje) {
        // Deshabilitar botón mientras se procesa
        const submitBtn = form.querySelector('.form-submit-btn');
        const textoOriginal = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;

        // Simular delay de red (1.5 segundos)
        setTimeout(() => {
            // Simular respuesta exitosa
            console.log('Formulario enviado:');
            console.log('Nombre:', nombre);
            console.log('Email:', email);
            console.log('Mensaje:', mensaje);

            // Mostrar mensaje de éxito
            mostrarMensaje('¡Gracias por contactarnos! Tu mensaje ha sido enviado correctamente. Te responderemos pronto.', 'exito');

            // Limpiar formulario
            form.reset();

            // Restaurar botón
            submitBtn.textContent = textoOriginal;
            submitBtn.disabled = false;

            // Scroll al mensaje
            mensajeDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 1500);
    }

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
