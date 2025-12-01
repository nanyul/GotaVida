document.addEventListener("DOMContentLoaded", async () => {

const cedulaActiva = localStorage.getItem("usuarioActivo");
const contenedor = document.getElementById("listaNotificaciones");

if (!cedulaActiva) {
    contenedor.innerHTML = "<p class='text-red-500'>Debes iniciar sesión para ver las notificaciones.</p>";
    return;
}

let campanas = JSON.parse(localStorage.getItem("campanas")) || [];

if (campanas.length === 0) {
    try {
        const res = await fetch("json/campanas.json");
        campanas = await res.json();
        localStorage.setItem("campanas", JSON.stringify(campanas));
    } catch (e) {
        contenedor.innerHTML = "<p class='text-red-500'>Error cargando campañas.</p>";
        console.error(e);
        return;
    }
}

const listaUsuarios = JSON.parse(localStorage.getItem("listaUsuarios")) || [];
const usuario = listaUsuarios.find(u => u.cedula === cedulaActiva);
const tipoUsuario = usuario?.grupo || null;

const urgentes = campanas.filter(c => tipoUsuario && esCompatible(tipoUsuario, c.tipoSangre) && c.urgente);

if (urgentes.length === 0) {
    contenedor.innerHTML = "<p class='text-gray-600'>No hay campañas urgentes para tu tipo de sangre.</p>";
    return;
}

urgentes.forEach((c, i) => {
    if (!contenedor) return;

    const div = document.createElement("div");
    div.className = "bg-gradient-to-r from-red-50 to-red-100 p-5 rounded-xl shadow-lg border-l-4 border-[var(--rojo)] hover:shadow-2xl cursor-pointer";
    div.innerHTML = `
    <h3 class="font-bold text-[var(--rojo)] text-lg mb-2">${c.titulo}</h3>
    <p class="text-sm"><strong>Lugar:</strong> ${c.lugar}</p>
    <p class="text-sm"><strong>Fecha:</strong> ${c.fecha}</p>
    <p class="text-sm"><strong>Tipo:</strong> ${c.tipo}</p>
    <p class="text-sm"><strong>Tipo requerido:</strong> ${c.tipoSangre || '-'}</p>
    <button class="mt-3 px-4 py-1 bg-[var(--rojo-rubi)] text-white rounded-full hover:bg-red-700 transition-colors"
    onclick="verCampana('${c.id}')">Ver campaña</button>
    `;

    contenedor.appendChild(div);

    gsap.from(div, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: i * 0.1,
        ease: "power2.out"
    });
});
});

// Función de compatibilidad
function esCompatible(donante, receptor) {
const compatibilidad = {
"O-": ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
"O+": ["O+", "A+", "B+", "AB+"],
"A-": ["A-", "A+", "AB-", "AB+"],
"A+": ["A+", "AB+"],
"B-": ["B-", "B+", "AB-", "AB+"],
"B+": ["B+", "AB+"],
"AB-": ["AB-", "AB+"],
"AB+": ["AB+"]
};
return compatibilidad[donante]?.includes(receptor) ?? false;
}

function verCampana(idCampana) {
    localStorage.setItem("campanaSeleccionada", String(idCampana));
    window.location.href = "centros.html";
}
