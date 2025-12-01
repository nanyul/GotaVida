// Funcionalidad de la página de seguimiento
import { insignias, obtenerDonaciones, obtenerInsigniasGanadas } from '../json/seguimientoinfo.js';

document.addEventListener('DOMContentLoaded', () => {
    cargarDatosPerfil();
    cargarHistorialDonaciones();
    cargarInsignias();
});

// Cargar datos del perfil del usuario
function cargarDatosPerfil() {
    const cedula = localStorage.getItem("usuarioActivo");
    
    if (!cedula) {
        // Si no hay usuario logueado, mostrar advertencia y redirigir
        alert("⚠️ No hay usuario logueado. Por favor, inicia sesión primero.");
        window.location.href = "index.html";
        return;
    }
    
    const listaUsuarios = JSON.parse(localStorage.getItem("listaUsuarios")) || [];
    const usuario = listaUsuarios.find(u => u.cedula === cedula);
    
    if (!usuario) {
        window.location.href = "index.html";
        return;
    }
    
    // Mostrar nombre y cédula
    document.getElementById("nombreUsuario").textContent = usuario.nombre + " " + (usuario.apellido || "");
    document.getElementById("cedulaUsuario").textContent = "Cédula: " + usuario.cedula;
    
    // Actualizar foto de perfil si existe
    const fotoPerfil = document.getElementById("fotoPerfil");
    if (usuario.foto) {
        fotoPerfil.src = usuario.foto;
    }
    
    // Actualizar barra de progreso
    actualizarBarraProgreso();
}

// Actualizar barra de progreso de donaciones
function actualizarBarraProgreso() {
    const donaciones = obtenerDonaciones();
    const totalDonaciones = donaciones.length;
    const metaDonaciones = 10; // Meta para completar la barra
    
    const porcentaje = Math.min((totalDonaciones / metaDonaciones) * 100, 100);
    
    const barra = document.getElementById("barraDonaciones");
    const texto = document.getElementById("textoDonaciones");
    
    barra.style.width = porcentaje + "%";
    texto.textContent = totalDonaciones + " / " + metaDonaciones + " donaciones";
}

// Cargar historial de donaciones
function cargarHistorialDonaciones() {
    const donaciones = obtenerDonaciones();
    const listaHistorial = document.getElementById("historialLista");
    
    if (donaciones.length === 0) {
        listaHistorial.innerHTML = `
            <div class="sin-donaciones">
                <div class="sin-donaciones-icono">🩸</div>
                <p class="sin-donaciones-texto">Aún no has realizado ninguna donación.<br>¡Inscríbete en una campaña para comenzar!</p>
            </div>
        `;
        return;
    }
    
    // Ordenar donaciones por fecha (más reciente primero)
    donaciones.sort((a, b) => b.id - a.id);
    
    listaHistorial.innerHTML = donaciones.map(donacion => `
        <div class="historial-item">
            <div class="historial-fecha">${donacion.fecha}</div>
            <div class="historial-campana">${donacion.campana}</div>
            <div class="historial-ubicacion">📍 ${donacion.ubicacion}</div>
            <a href="img/Certificado.pdf" download="Certificado_Donacion.pdf" class="btn-certificado">
                Descargar certificado
            </a>
        </div>
    `).join('');
}

// Cargar insignias obtenidas
function cargarInsignias() {
    const insigniasGanadas = obtenerInsigniasGanadas();
    const gridInsignias = document.getElementById("insigniasGrid");
    
    gridInsignias.innerHTML = insignias.map(insignia => {
        const obtenida = insigniasGanadas.some(i => i.id === insignia.id);
        return `
            <div class="insignia ${obtenida ? 'obtenida' : 'bloqueada'}" 
                title="${insignia.descripcion}${!obtenida ? ' (Bloqueada: ' + insignia.requisito + ' donaciones)' : ''}">
                <img src="${insignia.icono}" alt="${insignia.nombre}">
            </div>
        `;
    }).join('');
}
