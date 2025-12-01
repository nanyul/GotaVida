// =========================
//      PERFIL / LOGIN
// =========================

document.addEventListener("DOMContentLoaded", () => {
    const cedulaActiva = localStorage.getItem("usuarioActivo");

    if (cedulaActiva) {
        const lista = JSON.parse(localStorage.getItem("listaUsuarios")) || [];
        const usuario = lista.find(u => u.cedula === cedulaActiva);

        //if (usuario && typeof cargarDatosFormulario === "function") {
          //  cargarDatosFormulario(usuario);
        //}
        if (usuario && document.getElementById("perfilForm")) {
            cargarDatosFormulario(usuario);
        }
    }
    mostrarUsuarioActivo();


    // Mostrar punto de notificación si hay campañas urgentes
const campanas = JSON.parse(localStorage.getItem("campanas")) || [];
const listaUsuarios = JSON.parse(localStorage.getItem("listaUsuarios")) || [];
const usuario = listaUsuarios.find(u => u.cedula === cedulaActiva);
const tipoUsuario = usuario?.grupo || null;

// Función de compatibilidad (ya la tienes en notificaciones.js, puedes copiarla)
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

// Filtrar campañas urgentes compatibles
const urgentes = campanas.filter(c => c.urgente && esCompatible(tipoUsuario, c.tipoSangre));

const puntoMini = document.getElementById("puntoNotificacionMini");
if (urgentes.length > 0) {
    puntoMini.classList.remove("hidden"); // Mostrar punto
} else {
    puntoMini.classList.add("hidden"); // Ocultar si no hay alertas
}

});


// Referencias clave
const form = document.getElementById("perfilForm");
const miniPerfil = document.getElementById("miniPerfil");
const loginMini = document.getElementById("loginMini");
const miniMenu = document.getElementById("miniMenu");



//CARGAR PERFIL
function cargarDatosFormulario(data) {
    document.getElementById("nombre").value = data.nombre;
    document.getElementById("correo").value = data.correo;
    document.getElementById("cedula").value = data.cedula;
    document.getElementById("telefono").value = data.telefono;
    document.getElementById("grupo").value = data.grupo;
    document.getElementById("historial").value = 
    data.historial.map(h => `${h.campaña} - ${new Date(h.fechaInscripcion).toLocaleDateString()}`).join("\n");
    //document.getElementById("historial").value = data.historial.map(h => `${h.campaña} - ${h.fecha}`).join("\n");
    //document.getElementById("historial").value = data.historial;
    document.getElementById("disponible").value = data.disponible;
}



//GUARDAR PERFIL
if (form) {
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const perfil = {
        nombre: document.getElementById("nombre").value,
        correo: document.getElementById("correo").value,
        cedula: document.getElementById("cedula").value,
        telefono: document.getElementById("telefono").value,
        grupo: document.getElementById("grupo").value,
        historial: [], 
        disponible: document.getElementById("disponible").value
    };

    //  Traer la lista actual de usuarios
    let lista = JSON.parse(localStorage.getItem("listaUsuarios")) || [];

    // Ver si la cédula ya existe → actualizar ese usuario
    const index = lista.findIndex(u => u.cedula === perfil.cedula);

    if (index >= 0) {
        lista[index] = perfil;   // Actualizar
    } else {
        lista.push(perfil);      // Crear nuevo
    }

    //  Guarda la lista completa otra vez
    localStorage.setItem("listaUsuarios", JSON.stringify(lista));

    // Usuario activo
    localStorage.setItem("usuarioActivo", perfil.cedula);

    mostrarUsuarioActivo();
    animacionGuardado();
    mostrarPerfil(perfil);
});
}

function mostrarPerfil(data) {
    document.getElementById("outNombre").textContent = data.nombre;
    document.getElementById("outGrupo").textContent = data.grupo;
    document.getElementById("outHistorial").textContent = data.historial;
    document.getElementById("outDisponible").textContent = data.disponible;

    document.getElementById("perfilGuardado").classList.remove("hidden");
}


function mostrarUsuarioActivo() {
    const cedulaActiva = localStorage.getItem("usuarioActivo");
    const lista = JSON.parse(localStorage.getItem("listaUsuarios")) || [];

    const user = lista.find(u => u.cedula === cedulaActiva);

    const box = document.getElementById("miniPerfil");
    const nameSpan = document.getElementById("miniNombre");
    const descSpan = document.getElementById("miniDescripcion");
    const avatar = document.getElementById("miniAvatar");

    box.classList.remove("hidden");

    if (user) {
        nameSpan.textContent = user.nombre;
        descSpan.textContent = "Ver perfil ▼";
        avatar.style.opacity = "1";
    } else {
        nameSpan.textContent = "Iniciar sesión";
        descSpan.textContent = "Toca aquí ▼";
        avatar.style.opacity = "0.4";
    }

    gsap.fromTo(
        box,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    );
}


//  CLICK EN MINI PERFIL
miniPerfil.addEventListener("click", () => {
    const user = localStorage.getItem("usuarioActivo");

    miniMenu.classList.add("hidden");
    loginMini.classList.add("hidden");

    if (user) {
        miniMenu.classList.toggle("hidden");

        gsap.fromTo(
            miniMenu,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power1.out" }
        );

    } else {
        loginMini.classList.toggle("hidden");

        gsap.fromTo(
            loginMini,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power1.out" }
        );
    }
});

document.getElementById("btnVerPerfil").addEventListener("click", () => {
    window.location.href = "donante.html"; 
});

document.getElementById("btnNoti").addEventListener("click", () => {
    window.location.href = "alertas.html"; 
})


//  CERRAR MINI MENU AL HACER CLICK FUERA
document.addEventListener("click", (e) => {

   // Si el clic NO fue en miniPerfil, NO fue en miniMenu y NO fue en loginMini
    if (
        !miniPerfil.contains(e.target) &&
        !miniMenu.contains(e.target) &&
        !loginMini.contains(e.target)
    ) {
        miniMenu.classList.add("hidden");
        loginMini.classList.add("hidden");
    }

});



// LOGIN MINI
document.getElementById("btnLoginMini").addEventListener("click", () => {
    const cedula = document.getElementById("loginCedula").value.trim();
    const error = document.getElementById("loginError");

    const lista = JSON.parse(localStorage.getItem("listaUsuarios")) || [];

    const perfil = lista.find(u => u.cedula === cedula);

    if (perfil) {
        localStorage.setItem("usuarioActivo", perfil.cedula);

        loginMini.classList.add("hidden");
        error.classList.add("hidden");

        mostrarUsuarioActivo();
    } else {
        error.classList.remove("hidden");
    }
});



// CERRAR SESIÓN
document.getElementById("cerrarSesion").addEventListener("click", () => {
    // Quitar usuario activo 
    localStorage.removeItem("usuarioActivo");

    //Cerrar menú
    miniMenu.classList.add("hidden");

    // Limpiar el formulario
    if (typeof form !== "undefined" && form instanceof HTMLFormElement) {
        form.reset();
    } else {
        const f = document.getElementById("perfilForm");
        if (f) f.reset();
    }

    //Ocultar la tarjeta con la info guardada (si está visible)
    const perfilGuardadoEl = document.getElementById("perfilGuardado");
    if (perfilGuardadoEl) {
        perfilGuardadoEl.classList.add("hidden");
    }

    //Limpiar los campos de salida por si quedan textos
    ["outNombre","outGrupo","outHistorial","outDisponible"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = "";
    });

    // Actualizar UI del miniPerfil (mostrará "Iniciar sesión")
    mostrarUsuarioActivo();
});


// ANIMACIÓN GUARDADO + NOTIFICACIÓN
function animacionGuardado() {
    const card = document.getElementById("perfilGuardado");

    // Animación de aparición del card principal
    gsap.fromTo(
        card,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }
    );

    // Animación del mini perfil
    gsap.fromTo(
        "#miniPerfil",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }
    );

    
    //  NOTIF. DE PERFIL CREADO
    let notif = document.createElement("div");
    notif.id = "notifPerfil";
    notif.textContent = "✔ Perfil creado exitosamente";
    notif.style.position = "fixed";
    notif.style.top = "20px";
    notif.style.right = "20px";
    notif.style.padding = "12px 20px";
    notif.style.background = "#38c172";
    notif.style.color = "white";
    notif.style.borderRadius = "10px";
    notif.style.fontSize = "15px";
    notif.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
    notif.style.zIndex = "9999";
    notif.style.opacity = "0";

    document.body.appendChild(notif);

    // Animar aparición
    gsap.to("#notifPerfil", {
        opacity: 1,
        y: 10,
        duration: 0.4,
        ease: "power2.out"
    });

    // Desaparece sola
    setTimeout(() => {
        gsap.to("#notifPerfil", {
            opacity: 0,
            y: -10,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => notif.remove()
        });
    }, 1800);
}
