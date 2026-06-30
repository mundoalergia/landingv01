// ─────────────────────────────────────────────────────────────────────────────
// MUNDO ALERGIA — Datos del recomendador de productos
// Edita este archivo para añadir/modificar preguntas, opciones o categorías.
// El HTML de la encuesta lee este objeto automáticamente.
// ─────────────────────────────────────────────────────────────────────────────

const RECOMENDADOR_DATA = {

  id: "recomendador",
  title: "Encuentra tus productos",
  start: "q_perfil",

  // ── PREGUNTAS ──────────────────────────────────────────────────────────────
  // Cada pregunta tiene:
  //   id          identificador único
  //   title       texto principal
  //   title_3p    variante en 3ª persona (cuando se busca para otro)
  //   hint        subtexto de ayuda (opcional)
  //   type        "single" | "multi" | "textarea"
  //   options[]   lista de opciones
  //   next        id de la siguiente pregunta, o "_end", o objeto condicional
  //
  // next condicional: { _type:"conditional", _based_on:"id_pregunta", opcion_id:"id_siguiente", _default:"id" }

  questions: {

    q_perfil: {
      id: "q_perfil",
      title: "¿Para quién buscas productos?",
      hint: "Así te mostramos las opciones más adecuadas",
      type: "single",
      options: [
        { id: "adulto",     emoji: "👤",   label: "Para mí (adulto)",              code: "perfil:adulto" },
        { id: "pediatrico", emoji: "👧",   label: "Para mi hijo/a (menor de 12 años)", code: "perfil:pediatrico" },
        { id: "familiar",   emoji: "👨‍👩‍👧", label: "Para toda la familia",          code: "perfil:familiar" }
      ],
      next: "q_sintoma"
    },

    q_sintoma: {
      id: "q_sintoma",
      title: "¿Qué molesta más?",
      title_3p: "¿Qué le molesta más?",
      hint: "Elige el síntoma principal",
      type: "single",
      options: [
        { id: "nasal",     emoji: "🤧",  label: "Moqueo, estornudos o picor de nariz",               label_3p: "Moqueo, estornudos o picor de nariz",              code: "sintoma:nasal" },
        { id: "bronquial", emoji: "😮‍💨", label: "Me cuesta respirar o tengo asma",                   label_3p: "Le cuesta respirar o tiene asma diagnosticada",   code: "sintoma:bronquial" },
        { id: "nocturno",  emoji: "😴",  label: "Duermo mal: ronco, me despierto o toso de noche",   label_3p: "Duerme mal: ronquidos, despertares o tos nocturna", code: "sintoma:nocturno" },
        { id: "piel",      emoji: "🤕",  label: "Me pica o irrita la piel",                          label_3p: "Le pica o irrita la piel",                         code: "sintoma:piel" },
        { id: "entorno",   emoji: "🏠",  label: "Quiero limpiar el hogar de alérgenos (sin síntomas claros)", label_3p: "Sin síntomas claros, quiero limpiar el hogar",  code: "sintoma:entorno" }
      ],
      next: "q_alergeno"
    },

    q_alergeno: {
      id: "q_alergeno",
      title: "¿Cuándo son peores los síntomas?",
      title_3p: "¿Cuándo son peores sus síntomas?",
      hint: "Nos ayuda a identificar el posible alérgeno sin análisis de sangre",
      type: "single",
      options: [
        { id: "polen",       emoji: "🌿",  label: "En primavera o cuando hay mucho viento",              code: "alergeno:polen" },
        { id: "acaros",      emoji: "🛏️",  label: "Todo el año, especialmente en casa",                  code: "alergeno:acaros" },
        { id: "mascota",     emoji: "🐾",  label: "Cerca de animales",                                   code: "alergeno:mascota" },
        { id: "hongos",      emoji: "💧",  label: "En sitios húmedos o con moho",                        code: "alergeno:hongos" },
        { id: "voc",         emoji: "🏙️",  label: "Con olores fuertes, pintura o productos de limpieza", code: "alergeno:voc" },
        { id: "desconocido", emoji: "🤷",  label: "No lo tengo claro",                                   code: "alergeno:desconocido" }
      ],
      next: "q_mascota"
    },

    q_mascota: {
      id: "q_mascota",
      title: "¿Hay mascotas en casa?",
      hint: "Los animales son uno de los alérgenos interiores más frecuentes",
      type: "single",
      options: [
        { id: "gato",     emoji: "🐱", label: "Sí, gato",                          code: "mascota:gato" },
        { id: "perro",    emoji: "🐶", label: "Sí, perro",                         code: "mascota:perro" },
        { id: "ambos",    emoji: "🐾", label: "Sí, gato y perro",                  code: "mascota:ambos" },
        { id: "contacto", emoji: "🏠", label: "No, pero los visito con frecuencia", code: "mascota:contacto" },
        { id: "no",       emoji: "✗",  label: "No tengo mascotas",                  code: "mascota:no" }
      ],
      next: "q_usa"
    },

    q_usa: {
      id: "q_usa",
      title: "¿Ya usas alguno de estos?",
      hint: "Así evitamos recomendarte lo que ya tienes. Puedes marcar varios.",
      type: "multi",
      options: [
        { id: "inhalador",   emoji: "💨", label: "Inhalador o broncodilatador", code: "usa:inhalador" },
        { id: "purificador", emoji: "🌀", label: "Purificador de aire",         code: "usa:purificador" },
        { id: "irrigador",   emoji: "🚿", label: "Irrigador nasal",             code: "usa:irrigador" },
        { id: "nada",        emoji: "✗",  label: "Nada de lo anterior",         code: "usa:nada", exclusive: true }
      ],
      next: {
        _type: "conditional",
        _based_on: "q_alergeno",
        "acaros":  "q_humedad",
        "hongos":  "q_humedad",
        _default:  "_end"
      }
    },

    q_humedad: {
      id: "q_humedad",
      title: "¿Cómo notas el ambiente de tu hogar?",
      hint: "Solo preguntamos esto cuando el alérgeno probable son ácaros u hongos",
      type: "single",
      options: [
        { id: "alta",        emoji: "💧", label: "Hay humedad o condensación en las ventanas",   code: "humedad:alta" },
        { id: "baja",        emoji: "🌵", label: "El ambiente es muy seco, sobre todo en invierno", code: "humedad:baja" },
        { id: "normal",      emoji: "👌", label: "Normal, no lo he notado especialmente",        code: "humedad:normal" },
        { id: "desconocido", emoji: "🤷", label: "No lo sé",                                     code: "humedad:desconocido" }
      ],
      next: "_end"
    }
  },

  // ── SUBCATEGORÍAS CON SCORING ──────────────────────────────────────────────
  // score_base         0–10
  // triggers_sintoma   ids de q_sintoma que activan esta categoría
  // triggers_alergeno  ids de q_alergeno que activan esta categoría ("*" = todos)
  // triggers_perfil    ids de q_perfil que activan esta categoría
  // modificadores[]    { condicion: "clave:valor", factor: número }
  //   factor > 1  potencia la recomendación
  //   factor < 1  la debilita o excluye (0 = exclusión)

  subcategories: [
    {
      id: "purificadores",
      nombre: "Purificadores de aire",
      descripcion: "Filtran partículas, pólenes, dander de mascota y esporas del aire interior",
      score_base: 8,
      triggers_sintoma:  ["nasal", "bronquial", "entorno"],
      triggers_alergeno: ["acaros", "mascota", "hongos", "voc", "desconocido"],
      triggers_perfil:   ["adulto", "pediatrico", "familiar"],
      modificadores: [
        { condicion: "mascota:gato",    factor: 1.4 },
        { condicion: "mascota:perro",   factor: 1.4 },
        { condicion: "mascota:ambos",   factor: 1.6 },
        { condicion: "usa:purificador", factor: 0.4 }
      ]
    },
    {
      id: "purificadores-voc",
      nombre: "Purificadores específicos para VOCs",
      descripcion: "Con carbón activo y filtros especiales para compuestos químicos volátiles",
      score_base: 8,
      triggers_sintoma:  ["bronquial", "nasal", "entorno"],
      triggers_alergeno: ["voc"],
      triggers_perfil:   ["adulto", "familiar"],
      modificadores: [
        { condicion: "usa:purificador", factor: 0.5 }
      ]
    },
    {
      id: "aspiradores-hepa",
      nombre: "Aspiradores con filtro HEPA",
      descripcion: "Aspiran sin liberar partículas al ambiente, especialmente indicados para alérgicos",
      score_base: 7,
      triggers_sintoma:  ["entorno"],
      triggers_alergeno: ["acaros", "mascota"],
      triggers_perfil:   ["adulto", "familiar"],
      modificadores: [
        { condicion: "mascota:gato",    factor: 1.3 },
        { condicion: "mascota:perro",   factor: 1.3 },
        { condicion: "mascota:ambos",   factor: 1.4 }
      ]
    },
    {
      id: "filtros-hepa-recambios",
      nombre: "Filtros HEPA y recambios",
      descripcion: "Si ya tienes purificador, los filtros en buen estado son imprescindibles",
      score_base: 6,
      triggers_sintoma:  ["entorno"],
      triggers_alergeno: ["acaros", "mascota", "hongos"],
      triggers_perfil:   ["adulto", "familiar"],
      modificadores: [
        { condicion: "usa:purificador", factor: 1.8 }
      ]
    },
    {
      id: "fundas-antiacaros",
      nombre: "Fundas antiácaros para colchón y almohada",
      descripcion: "Barrera física que impide el contacto con los ácaros mientras duermes",
      score_base: 9,
      triggers_sintoma:  ["nocturno", "nasal", "entorno"],
      triggers_alergeno: ["acaros"],
      triggers_perfil:   ["adulto", "pediatrico", "familiar"],
      modificadores: []
    },
    {
      id: "sprays-antiacaros",
      nombre: "Sprays antiácaros y neutralizadores",
      descripcion: "Para tratar textiles que no se pueden lavar a alta temperatura",
      score_base: 7,
      triggers_sintoma:  ["entorno", "nasal"],
      triggers_alergeno: ["acaros"],
      triggers_perfil:   ["adulto", "pediatrico", "familiar"],
      modificadores: []
    },
    {
      id: "vaporetas",
      nombre: "Vaporetas / limpieza a vapor",
      descripcion: "El vapor a alta temperatura elimina ácaros sin productos químicos",
      score_base: 6,
      triggers_sintoma:  ["entorno"],
      triggers_alergeno: ["acaros"],
      triggers_perfil:   ["adulto", "familiar"],
      modificadores: []
    },
    {
      id: "deshumidificadores",
      nombre: "Deshumidificadores",
      descripcion: "Reducen la humedad que favorece la proliferación de ácaros y hongos",
      score_base: 8,
      triggers_sintoma:  ["entorno", "nasal"],
      triggers_alergeno: ["acaros", "hongos"],
      triggers_perfil:   ["adulto", "familiar"],
      modificadores: [
        { condicion: "humedad:alta",   factor: 1.6 },
        { condicion: "humedad:baja",   factor: 0.2 },
        { condicion: "humedad:normal", factor: 0.6 }
      ]
    },
    {
      id: "humidificadores",
      nombre: "Humidificadores",
      descripcion: "Para ambientes muy secos que irritan mucosas nasales y bronquiales",
      score_base: 5,
      triggers_sintoma:  ["nasal", "bronquial"],
      triggers_alergeno: ["voc", "desconocido"],
      triggers_perfil:   ["adulto", "pediatrico", "familiar"],
      modificadores: [
        { condicion: "humedad:baja",  factor: 1.4 },
        { condicion: "humedad:alta",  factor: 0.2 }
      ]
    },
    {
      id: "medidores-calidad-aire",
      nombre: "Medidores de calidad del aire",
      descripcion: "Monitorizan PM2.5, CO₂ y VOCs para saber qué respiras en cada momento",
      score_base: 5,
      triggers_sintoma:  ["entorno", "bronquial"],
      triggers_alergeno: ["voc", "desconocido"],
      triggers_perfil:   ["adulto", "familiar"],
      modificadores: []
    },
    {
      id: "camaras-espaciadoras",
      nombre: "Cámaras espaciadoras para inhalador",
      descripcion: "Mejoran la llegada del medicamento al bronquio. Imprescindibles con inhalador",
      score_base: 6,
      triggers_sintoma:  ["bronquial"],
      triggers_alergeno: ["*"],
      triggers_perfil:   ["adulto", "familiar"],
      modificadores: [
        { condicion: "usa:inhalador", factor: 2.0 }
      ]
    },
    {
      id: "camaras-espaciadoras-pediatricas",
      nombre: "Cámaras espaciadoras pediátricas (con mascarilla)",
      descripcion: "Versión con mascarilla adaptada para niños y lactantes",
      score_base: 6,
      triggers_sintoma:  ["bronquial"],
      triggers_alergeno: ["*"],
      triggers_perfil:   ["pediatrico", "familiar"],
      modificadores: [
        { condicion: "usa:inhalador",       factor: 2.0 },
        { condicion: "perfil:pediatrico",   factor: 1.5 }
      ]
    },
    {
      id: "irrigadores-nasales",
      nombre: "Irrigadores nasales",
      descripcion: "Lavado nasal con suero salino: uno de los gestos más efectivos en rinitis",
      score_base: 8,
      triggers_sintoma:  ["nasal"],
      triggers_alergeno: ["acaros", "polen", "hongos", "mascota", "desconocido"],
      triggers_perfil:   ["adulto", "pediatrico", "familiar"],
      modificadores: [
        { condicion: "usa:irrigador", factor: 0.5 }
      ]
    },
    {
      id: "tiras-nasales",
      nombre: "Tiras nasales dilatadoras",
      descripcion: "Mejoran la respiración nasal nocturna sin medicación",
      score_base: 7,
      triggers_sintoma:  ["nocturno", "nasal"],
      triggers_alergeno: ["acaros", "hongos", "desconocido"],
      triggers_perfil:   ["adulto", "familiar"],
      modificadores: []
    },
    {
      id: "tiras-nasales-pediatricas",
      nombre: "Tiras nasales pediátricas",
      descripcion: "Versión adaptada para niños con congestión nasal nocturna",
      score_base: 7,
      triggers_sintoma:  ["nocturno", "nasal"],
      triggers_alergeno: ["acaros", "hongos", "desconocido"],
      triggers_perfil:   ["pediatrico", "familiar"],
      modificadores: [
        { condicion: "perfil:pediatrico", factor: 1.5 }
      ]
    },
    {
      id: "cremas-calmantes",
      nombre: "Cremas calmantes para el picor",
      descripcion: "Alivio tópico sin perfume para piel sensible o con dermatitis",
      score_base: 8,
      triggers_sintoma:  ["piel"],
      triggers_alergeno: ["*"],
      triggers_perfil:   ["adulto", "pediatrico", "familiar"],
      modificadores: []
    },
    {
      id: "sprays-calmantes",
      nombre: "Sprays calmantes sin perfume",
      descripcion: "Aplicación rápida para zonas extensas o de difícil acceso",
      score_base: 7,
      triggers_sintoma:  ["piel", "nasal"],
      triggers_alergeno: ["*"],
      triggers_perfil:   ["adulto", "pediatrico", "familiar"],
      modificadores: []
    },
    {
      id: "absorbedores-olores",
      nombre: "Absorbedores de olores y carbón activo",
      descripcion: "Capturan VOCs y olores sin añadir fragancias al ambiente",
      score_base: 6,
      triggers_sintoma:  ["nasal", "bronquial"],
      triggers_alergeno: ["voc"],
      triggers_perfil:   ["adulto", "familiar"],
      modificadores: []
    },
    {
      id: "protectores-sofa",
      nombre: "Protectores de sofá y textiles",
      descripcion: "Fundas lavables que reducen la acumulación de alérgenos en tapizados",
      score_base: 6,
      triggers_sintoma:  ["entorno"],
      triggers_alergeno: ["acaros", "mascota"],
      triggers_perfil:   ["adulto", "familiar"],
      modificadores: [
        { condicion: "mascota:gato",  factor: 1.3 },
        { condicion: "mascota:perro", factor: 1.3 },
        { condicion: "mascota:ambos", factor: 1.4 }
      ]
    }
  ],

  // ── CONTRAINDICACIONES (exclusiones duras aplicadas antes del scoring) ─────
  // Si todas las condiciones del array "si" se cumplen, la subcategoría "excluir"
  // se fuerza a score 0 y no aparece en el resultado.
  contraindicaciones: [
    {
      descripcion: "Ionizadores contraindicados en asma (generan ozono broncoconstrictor)",
      si: [{ pregunta: "q_sintoma", valor: "bronquial" }],
      excluir: ["ionizadores"]
    },
    {
      descripcion: "Humidificadores contraindiciados cuando hay humedad alta (favorece ácaros y hongos)",
      si: [{ pregunta: "q_humedad", valor: "alta" }],
      excluir: ["humidificadores"]
    },
    {
      descripcion: "Deshumidificadores contraindiciados cuando el ambiente es muy seco",
      si: [{ pregunta: "q_humedad", valor: "baja" }],
      excluir: ["deshumidificadores"]
    }
  ]

};
