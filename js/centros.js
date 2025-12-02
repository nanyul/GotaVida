let map, userLat = null, userLng = null, userMarker;
let markers = [];
let campanas = [];


//UTILS
function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;

    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function mostrarToast(msg, esError = false) {
    let div = document.createElement('div');
    div.textContent = msg;
    div.style.position = "fixed";
    div.style.top = "20px";
    div.style.right = "20px";
    div.style.padding = "10px 14px";
    div.style.borderRadius = "12px";
    div.style.background = esError ? "#dc2626" : "#16a34a";
    div.style.color = "white";
    div.style.boxShadow = "0 4px 12px rgba(0,0,0,0.25)";
    div.style.opacity = "0";
    div.style.zIndex = "99999";
    document.body.appendChild(div);

    gsap.to(div, { opacity: 1, y: 6, duration: .3 });
    setTimeout(() => gsap.to(div, { opacity: 0, y: -6, duration: .3, onComplete: () => div.remove() }), 1800);
}

function latidoCorazon() {
    const corazon = document.querySelector(".corazon-icon");
    if (!corazon) return;
    gsap.fromTo(corazon, { scale: 1 }, { scale: 1.25, duration: .18, yoyo: true, repeat: 1 });
}


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


//INICIALIZAR MAPA
function iniciarMapa(lat = 9.9333, lng = -84.0833) {
    map = L.map("map").setView([lat, lng], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    // ANIMACIÓN AL CARGAR MAPA
    gsap.from("#map", {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "power2.out"
    });
}

function obtenerTipoUsuario() {
    const cedula = localStorage.getItem("usuarioActivo");
    if (!cedula) return null;

    const lista = JSON.parse(localStorage.getItem("listaUsuarios")) || [];
    const user = lista.find(u => u.cedula === cedula);

    return user ? (user.grupo || null) : null;
}


//      MOSTRAR MARCADORES
function mostrarMarcadores(radioKm = 5) {

    // limpiar marcadores anteriores
    markers.forEach(m => map.removeLayer(m));
    markers = [];

    let tipoSeleccionado = document.getElementById("filtroTipo").value;
    let ordenar = document.getElementById("filtroOrden").value;

    // filtro tipo
    let filtradas = campanas.filter(c => {
        if (tipoSeleccionado === "todos") return true;
        return c.tipo.toLowerCase().includes(tipoSeleccionado);
    });

    if (ordenar === "nombre") {
        filtradas.sort((a, b) => a.titulo.localeCompare(b.titulo));
    }
    if (ordenar === "fecha") {
        filtradas.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    }
    if (ordenar === "distancia" && userLat && userLng) {
        filtradas.sort((a, b) => {
            let d1 = calcularDistancia(userLat, userLng, a.lat, a.lng);
            let d2 = calcularDistancia(userLat, userLng, b.lat, b.lng);
            return d1 - d2;
        });
    }

    const tiposUsuario = obtenerTipoUsuario();

    filtradas.sort((a, b) => {
        const aComp = tiposUsuario && esCompatible(tiposUsuario, a.tipoSangre);
        const bComp = tiposUsuario && esCompatible(tiposUsuario, b.tipoSangre);

        if (aComp === bComp) return 0;
        return aComp ? -1 : 1;
    });

    const lista = document.getElementById("listaCampanas");
    lista.innerHTML = "";
    let totalVisibles = 0;

    //validar tipo de usuario para mostrar solo campañas compatibles
    const tipoUsuario = obtenerTipoUsuario();

    //campanas.forEach(c => {
    filtradas.forEach(c => {
        let compatible = true; // por defecto todas seran válidas

        if (tipoUsuario && c.tipoSangre) {
            compatible = esCompatible(tipoUsuario, c.tipoSangre);
        }

        let distancia = userLat && userLng
            ? calcularDistancia(userLat, userLng, c.lat, c.lng)
            : null;

        if (distancia !== null && distancia > radioKm) return;

        let marker = L.marker([c.lat, c.lng]).addTo(map);
        marker.campanaId = c.id;
        markers.push(marker);

        let popup = `
            <h3 class="font-bold mb-2" style="color:#69021E">${c.titulo}</h3>
            <p><strong>Fecha:</strong> ${c.fecha}</p>
            <p><strong>Lugar:</strong> ${c.lugar}</p>
            <p><strong>Tipo:</strong> ${c.tipo}</p>
            ${c.tipoSangre ? `<p><strong>Tipo requerido:</strong> ${c.tipoSangre}</p>` : ""}
            <p><strong>Requisitos:</strong> ${c.requisitos}</p>
            <p><strong>Contacto:</strong> ${c.contacto}</p>
            <button class="btnInscribirMap"
                    data-id="${c.id}"
                    style="margin-top:8px;padding:6px 10px;color:white;background:#AA0235;border-radius:8px; opacity:${compatible ? 1 : 0.5};
        pointer-events:${compatible ? 'auto' : 'none'};">
                Inscribirme
            </button>
        `;

        marker.bindPopup(popup);

        marker.on("popupopen", () => {
            let popupEl = document.querySelector(".leaflet-popup-content");
            if (popupEl) {
                gsap.from(popupEl, { y: -10, opacity: 0, duration: .3 });
            }

            //Activar botón de inscripción dentro del popup
            const btn = document.querySelector(".btnInscribirMap");
            if (btn) {
                btn.addEventListener("click", () => inscribirse(c.id));
            }
        });

        if (markers.length > 0) {
            const grupo = L.featureGroup(markers);
            map.fitBounds(grupo.getBounds(), { padding: [50, 50] });
        }

        totalVisibles++;

        // LISTA
        let div = document.createElement("div");
        div.className = "camp-item mb-3 p-3 rounded-lg bg-white shadow";

        div.innerHTML = `
    <div class="card-content">

    <div class="card-info">
        <div class="titulo-campana">${c.titulo}</div>
        ${badgeCampana(c.fecha)}


        <div class="lugar-info">
        ${compatible ? `
<div class="compatible-pill">
    <span class="material-icons dato-icon">favorite</span>
    Compatible con tu tipo (${tipoUsuario})
</div>` : ""}
            <span class="material-icons dato-icon">place</span>
            ${c.lugar}
        </div>

        <div class="flex items-center gap-2 text-sm text-[var(--negro)]">
    <span class="material-icons text-[var(--rojo-rubi)]">calendar_month</span>
    ${c.fecha}
</div>


        <span class="tipo-badge">
    <span class="material-icons tipo-icon">
        ${iconoTipo(c.tipo)}
    </span>
    ${c.tipo}
</span>

${c.tipoSangre ? `
    <div class="tipo-sangre-pill">
        <span class="material-icons dato-icon">bloodtype</span>
        Tipo requerido: ${c.tipoSangre}
    </div>` : ""
            }

        ${distancia !== null
                ? `<div class="distancia-pill">
                    <span class="material-icons dato-icon">route</span>
                    ${distancia.toFixed(2)} km
               </div>`
                : ""
            }
    </div>

  <div class="info-extra">
    <div class="req">
        <span class="material-icons text-[var(--burdeos)]">task_alt</span>
        <span>${c.requisitos}</span>
    </div>

    <div class="telefono">
        <span class="material-icons text-[var(--burdeos)]">call</span>
        <span>${c.contacto}</span>
    </div>

    ${!compatible ? `
        <div class="no-compatible">
            No compatible con tu tipo (${tipoUsuario})
        </div>` : ""}
</div>


    <div class="card-action">
        <button data-id="${c.id}" class="btnInscribirLista ${!compatible ? 'opacity-50 cursor-not-allowed' : ''}"
    ${!compatible ? 'disabled' : ''}    flex items-center gap-2">
    <img src="https://cdn-icons-png.flaticon.com/512/15624/15624065.png" class="w-5 h-5">
    Inscribirme
</button>

    </div>

</div>

        `;

        lista.appendChild(div);

        gsap.from(div, {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power2.out"
        });

    });


    document.getElementById("contadorCampanas").textContent =
        totalVisibles > 0
            ? `🔎 ${totalVisibles} campañas encontradas cerca de ti`
            : "⚠️ No se encontraron campañas dentro del radio seleccionado";

    // listeners
    document.querySelectorAll(".btnInscribirMap, .btnInscribirLista")
        .forEach(btn =>
            btn.addEventListener("click", () => inscribirse(Number(btn.dataset.id)))
        );
}

function mostrarCampanaPorID(idCampana) {
    const c = campanas.find(c => c.id == idCampana);
    if (!c) {
        mostrarToast("Campaña no encontrada", true);
        // Si no existe la campaña, retiramos la clave para evitar loops futuros
        localStorage.removeItem("campanaSeleccionada");
        return;
    }

    // Centrar mapa
    map.setView([c.lat, c.lng], 15);

    // Crear marker temporal (y guardarlo para poder eliminarlo si hace falta)
    const mk = L.marker([c.lat, c.lng]).addTo(map);

    mk.bindPopup(`
        <h3 class="font-bold mb-2" style="color:#69021E">${c.titulo}</h3>
        <p><strong>Fecha:</strong> ${c.fecha}</p>
        <p><strong>Lugar:</strong> ${c.lugar}</p>
        ${c.tipoSangre ? `<p><strong>Tipo requerido:</strong> ${c.tipoSangre}</p>` : ""}
        <p><strong>Contacto:</strong> ${c.contacto}</p>
        <button class="btnInscribirMap" data-id="${c.id}"
            style="margin-top:8px;padding:6px 10px;color:white;background:#AA0235;border-radius:8px">
            Inscribirme
        </button>
    `).openPopup();

    
}


function resaltarCampanaEnLista(idCampana) {
    const card = document.querySelector(`.btnInscribirLista[data-id="${idCampana}"]`)?.closest(".camp-item");
    if (!card) return;

    card.scrollIntoView({ behavior: "smooth", block: "center" });
    card.style.border = "2px solid #AA0235";
    card.style.boxShadow = "0 0 12px rgba(170,2,53,.4)";

    setTimeout(() => {
        card.style.border = "";
        card.style.boxShadow = "";
    }, 1800);

    resaltarCampanaEnLista(idCampana);
}


function iconoTipo(tipo) {
    tipo = tipo.toLowerCase();

    if (tipo.includes("total")) return "bloodtype";     
    if (tipo.includes("plasma")) return "water_drop";    
    if (tipo.includes("plaqueta")) return "biotech";     

    return "healing"; // icono por defecto
}

function badgeCampana(fecha) {
    let hoy = new Date();
    let f = new Date(fecha);

    let diff = (f - hoy) / (1000 * 60 * 60 * 24);

    if (diff < 0) return "";               // ya pasó
    if (diff < 1) return `<span class="badge-info">Hoy</span>`;
    if (diff < 3) return `<span class="badge-info">Próxima</span>`;
    return `<span class="badge-info">Nueva</span>`;
}


//INSCRIPCIÓN
function inscribirse(idCampana) {
    let cedulaActiva = localStorage.getItem("usuarioActivo");

    if (!cedulaActiva) {
        mostrarToast("Debes iniciar sesión para inscribirte", true);
        document.getElementById("loginMini")?.classList.remove("hidden");
        return;
    }

    let listaUsuarios = JSON.parse(localStorage.getItem("listaUsuarios")) || [];
    let userIndex = listaUsuarios.findIndex(u => u.cedula === cedulaActiva);

    if (userIndex < 0) {
        mostrarToast("Usuario no encontrado", true);
        return;
    }

    let campana = campanas.find(c => c.id === idCampana);

    if (!campana) {
        mostrarToast("Campaña no encontrada", true);
        return;
    }

    let registro = {
        idCampana: campana.id,
        campaña: campana.titulo,
        fechaInscripcion: new Date().toISOString(),
        lugar: campana.lugar,
        tipo: campana.tipo,
        lat: campana.lat,
        lng: campana.lng
    };

    if (!Array.isArray(listaUsuarios[userIndex].historial))
        listaUsuarios[userIndex].historial = [];

    // para evitar duplicados
    if (listaUsuarios[userIndex].historial.some(h => h.idCampana === registro.idCampana)) {
        mostrarToast("Ya estás inscrito", false);
        latidoCorazon();
        return;
    }

    listaUsuarios[userIndex].historial.push(registro);

    localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuarios));

    mostrarToast("Inscripción guardada");
    latidoCorazon();

    if (typeof mostrarUsuarioActivo === "function")
        mostrarUsuarioActivo();
}

//SE CARGA DE JSON
async function cargarCampanas() {
    try {
        let res = await fetch("json/campanas.json");
        campanas = await res.json();
        return true;
    } catch (e) {
        mostrarToast("Error cargando campañas", true);
        return false;
    }
}


//INICIO GENERAL
async function iniciarCentros() {
    await cargarCampanas();

    iniciarMapa();

    procesarCampanaGuardada();
    mostrarMarcadores(5);
    
    // geolocalización
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            userLat = pos.coords.latitude;
            userLng = pos.coords.longitude;

            map.setView([userLat, userLng], 14);
            userMarker = L.marker([userLat, userLng]).addTo(map).bindPopup("Estás aquí");
        }, () => {
            
            mostrarToast("No se pudo obtener tu ubicación", true);
            mostrarMarcadores();
            procesarCampanaGuardada();
        });
       
    } else {
        mostrarMarcadores();
        procesarCampanaGuardada();
        mostrarToast("Geolocalización no disponible", true);
    }
}


// EVENTOS
document.addEventListener("DOMContentLoaded", () => {

    iniciarCentros();
    document.getElementById("btnAplicarRadio").addEventListener("click", () => {
        let r = Number(document.getElementById("radioInput").value) || 5;
        document.getElementById("radioText").textContent = r;
        mostrarMarcadores(r);
    });

    // Manejar clics en botones de inscripción
    document.addEventListener("click", (e) => {
        if (e.target.closest(".btnInscribirLista")) {
            const btn = e.target.closest(".btnInscribirLista");
            
            // Verificar si el botón está deshabilitado
            if (btn.disabled) {
                mostrarToast("No eres compatible con esta campaña", true);
                return;
            }
            
            const campaniaId = btn.getAttribute("data-id");
            inscribirseEnCampana(campaniaId);
        }
    });
});

// Función para inscribirse en una campaña
function inscribirseEnCampana(campaniaId) {
    const cedula = localStorage.getItem("usuarioActivo");
    
    if (!cedula) {
        mostrarToast("Debes iniciar sesión para inscribirte", true);
        setTimeout(() => {
            window.location.href = "donante.html";
        }, 1500);
        return;
    }
    
    // Buscar la campaña
    const campania = campanas.find(c => c.id == campaniaId);
    
    if (!campania) {
        mostrarToast("Campaña no encontrada", true);
        return;
    }
    
    // Agregar donación al historial
    const donaciones = JSON.parse(localStorage.getItem("donaciones_" + cedula)) || [];
    const fecha = new Date().toLocaleDateString('es-ES');
    
    donaciones.push({
        fecha: fecha,
        campana: campania.titulo,
        ubicacion: campania.lugar,
        id: Date.now()
    });
    
    localStorage.setItem("donaciones_" + cedula, JSON.stringify(donaciones));
    
    // Actualizar contador en la página de inicio si existe la función
    if (typeof window.actualizarContadorDonaciones === 'function') {
        window.actualizarContadorDonaciones();
    }
    
    // Mostrar mensaje de éxito
    mostrarToast("¡Te has inscrito exitosamente! Revisa tu seguimiento.");
    latidoCorazon();
    
    // Redirigir a seguimiento después de 2 segundos
    setTimeout(() => {
        if (confirm("¿Deseas ver tu historial de donaciones?")) {
            window.location.href = "seguimiento.html";
        }
    }, 1500);
}

function procesarCampanaGuardada() {
    const id = localStorage.getItem("campanaSeleccionada");
    if (!id) return;

    // SACAR campaña del array
    const index = campanas.findIndex(c => c.id == id);
    if (index > -1) {
        const camp = campanas.splice(index, 1)[0];
        // INSERTAR al inicio
        campanas.unshift(camp);
    }
    mostrarCampanaPorID(Number(id));

    // se borra SOLO cuando ya fue usada
    localStorage.removeItem("campanaSeleccionada");
}
