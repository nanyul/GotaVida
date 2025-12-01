// Datos de seguimiento - Insignias y sistema de donaciones
const insignias = [
    {
        id: 1,
        nombre: "Primera Donación",
        icono: "img/seguimiento/insignia1.png",
        descripcion: "Completaste tu primera donación",
        requisito: 1
    },
    {
        id: 2,
        nombre: "Donante Comprometido",
        icono: "img/seguimiento/insignia2.png",
        descripcion: "Alcanzaste 3 donaciones",
        requisito: 3
    },
    {
        id: 3,
        nombre: "Héroe de Vida",
        icono: "img/seguimiento/insignia3.png",
        descripcion: "Completaste 10 donaciones",
        requisito: 10
    }
];

// Función para obtener donaciones del usuario
function obtenerDonaciones() {
    const cedula = localStorage.getItem("usuarioActivo");
    if (!cedula) return [];
    
    const donaciones = JSON.parse(localStorage.getItem("donaciones_" + cedula)) || [];
    return donaciones;
}

// Función para agregar donación
function agregarDonacion(nombreCampana, ubicacion) {
    const cedula = localStorage.getItem("usuarioActivo");
    if (!cedula) {
        console.error("No hay usuario activo");
        return false;
    }
    
    const donaciones = obtenerDonaciones();
    const fecha = new Date().toLocaleDateString('es-ES');
    
    donaciones.push({
        fecha: fecha,
        campana: nombreCampana,
        ubicacion: ubicacion,
        id: Date.now()
    });
    
    localStorage.setItem("donaciones_" + cedula, JSON.stringify(donaciones));
    return true;
}

// Función para obtener insignias ganadas
function obtenerInsigniasGanadas() {
    const totalDonaciones = obtenerDonaciones().length;
    return insignias.filter(insignia => totalDonaciones >= insignia.requisito);
}

export { insignias, obtenerDonaciones, agregarDonacion, obtenerInsigniasGanadas };
