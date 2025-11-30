const donarSangreInfo = {
    beneficios_donar_sangre: [
        "Salvas vidas",
        "Mejora la salud cardiovascular",
        "Facilitas procedimientos médicos y de emergencia",
        "Estimula la producción de nuevas células sanguíneas",
        "Fomenta una cultura de solidaridad",
        "Reduces el riesgo de enfermedades cardíacas",
    ],
    beneficios_donar_sangre_imagen: "img/educacion/Beneficios.png", 
    componentes_principales_sangre: [
        "Red Blood Cells (Glóbulos rojos)",
        "Plasma",
        "White Blood Cells & Platelets (Glóbulos blancos y plaquetas)"
    ],
    componentes_principales_sangre_imagen: "img/educacion/Beneficios.png",
    mitos_vs_realidad: [
        {
            mito: "Si tengo tatuajes o piercings no puedo donar",
            realidad: "Sí puedes donar, después de un período de espera (generalmente 6 a 12 meses)"
        },
        {
            mito: "Es muy doloroso y me voy a morir si pasa algo",
            realidad: "Solo se siente un pinchazo rápido. El proceso es seguro y guiado por profesionales"
        },
        {
            mito: "Donar sangre debilita o 'deja sin sangre' al donante",
            realidad: "El cuerpo recupera el volumen de sangre en unas horas y las células en pocos días. No causa debilidad duradera"
        }
    ],
    cuidados_al_donar_sangre: [
        "Hidrátate bien",
        "Come ligero",
        "Duerme bien",
        "Evita alcohol 24 horas antes",
        "Evita ejercicio intenso antes de donar"
    ],
    cuidados_al_donar_sangre_imagen: "img/educacion/Beneficios.png", 
};

const elementosSangreInfo = {
    titulo: "¿Qué fluye en tu sangre?",
    subtitulo: "arrastra y coloca los componentes",
    imagen: "img/educacion/vasosanguineo.png", // Imagen 2
    componentes: [
        {
            nombre: "Glóbulos rojos",
            imagen: "img/educacion/globulo rojo.png",
            descripcion: "Transportan oxígeno y dióxido de carbono."
        },
        {
            nombre: "Plasma",
            imagen: "img/educacion/Plasma.png",
            descripcion: "Líquido que transporta células, hormonas, nutrientes y desechos."
        },
        {
            nombre: "Glóbulos blancos y plaquetas",
            imagen: "img/educacion/globulos blancos.png",
            descripcion: "Defienden contra infecciones y ayudan a coagular la sangre."
        }
    ]
};

const mitosInfo = {
    imagen: "img/educacion/vs.png",
    mitos_vs_realidad: [
        {
            mito: "Si tengo tatuajes o piercings no puedo donar",
            realidad: "Sí puedes donar, después de un período de espera (generalmente seis a doce meses)"
        },
        {
            mito: "Es muy doloroso y me voy a morir si pasa algo",
            realidad: "Solo se siente un pinchazo rápido. El proceso es seguro y guiado por profesionales"
        },
        {
            mito: "Donar sangre debilita o 'deja sin sangre' al donante",
            realidad: "El cuerpo recupera el volumen de sangre en unas horas y las células en pocos días. No causa debilidad duradera"
        }
    ]
};

const cuidadosDonacionInfo = {
    titulo: "Cuidados al donar sangre",
    imagen: "img/educacion/cuidados.png", 
    cuidados: [
        {
            texto: "Hidrátate bien",
            icono: "img/educacion/botella.png"
        },
        {
            texto: "Come ligero",
            icono: "img/educacion/manzana.png"
        },
        {
            texto: "Duerme bien",
            icono: "img/educacion/luna.png"
        },
        {
            texto: "Evita alcohol veinticuatro horas antes",
            icono: "img/educacion/vino.png"
        },
        {
            texto: "Evita ejercicio intenso antes de donar",
            icono: "img/educacion/pesas.png"
        }
    ]
};

// Exportarmos objetos
export { donarSangreInfo, elementosSangreInfo, mitosInfo, cuidadosDonacionInfo};