const pantallaPrincipalDonaciones = {
    donaciones: {
        imagen1: "img/recuadros/punno.png",
        mensaje: "¡Hasta hoy, hemos recibido!",
        total: 1000,
        imagen2: "img/recuadros/elementos.png"
    },
    secciones: [
        {
            imagen: "img/recuadros/CorazonRedondo.png",
            nombre: "Registro de Donantes",
            descripcion: "¡Salva vidas con un simple paso, regístrate y dona sangre!",
            beneficios: [
                "Fácil y rápido",
                "100% seguro",
                "Ayuda hasta 3 personas"
            ],
            boton: "Registrar"
        },
        {
            nombre: "Campañas y Centros cercanos",
            imagen: "img/recuadros/mapa.png",
            boton: "Ver mapa completo"
        },
        {
            nombre: "Alertas y Notificaciones",
            imagen: "img/recuadros/GotaSangre.png",
            descripcion: "Se necesita O- urgente",
            detalle: {
                lugar: "Hospital General",
                tiempo: "Hace 2 horas"
            }
        },
        {
            nombre: "Sección Educativa",
            descripcion: "Conozca más sobre donaciones de sangre y sus beneficios.",
            boton: "Más información"
        },
        {
            nombre: "Reconocimiento, insignias y Perfil",
            descripcion: "Explora tu perfil y descubre las insignias que has ganado.",
            boton: "Más información"
        },
        {
            nombre: "Estadísticas y Testimonios",
            imagen: "img/recuadros/ManoCorazon.png",
            descripcion: "Contáctanos mediante nuestros formularios para compartir tu testimonio.",
            boton: "Ver más"
        }
    ]
};

export default pantallaPrincipalDonaciones;