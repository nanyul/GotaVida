function validateCaptcha() {
    const response = grecaptcha.getResponse();
    if (response.length === 0) {
        alert("Por favor verifica el captcha.");
        return false; // No envía el formulario
    }
    // Aquí puedes enviar el formulario o mostrar un mensaje de éxito
    alert("Reporte enviado correctamente.");
    return true; // Permite el envío del formulario
}