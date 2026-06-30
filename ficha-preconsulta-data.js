// ─────────────────────────────────────────────────────────────────────────────
// MUNDO ALERGIA — Datos de la ficha de preconsulta médica
// Edita este archivo para añadir preguntas, ramas o especialistas.
// El HTML lee este objeto; la lógica de navegación es automática.
//
// ESTRUCTURA DE next:
//   "id_pregunta"    → va siempre a esa pregunta
//   "_end"           → termina la encuesta y muestra resultado
//   { _type:"conditional", _based_on:"q_id", valor_opcion:"q_destino", _default:"q_id" }
//                    → elige el destino según la respuesta a otra pregunta
// ─────────────────────────────────────────────────────────────────────────────

const PRECONSULTA_DATA = {

  id: "preconsulta",
  title: "Cuéntanos un poco antes de la consulta",
  start: "q_perfil",

  questions: {

    // ── PASO 1: ¿PARA QUIÉN? (pregunta independiente, siempre la primera) ────

    q_perfil: {
      id: "q_perfil",
      title: "¿Para quién es esta consulta?",
      hint: "Las preguntas y el especialista asignado variarán según tu respuesta",
      type: "single",
      options: [
        { id: "yo",       emoji: "🙋", label: "Para mí (adulto/a)",                         code: "perfil:yo" },
        { id: "nino",     emoji: "👧", label: "Para un niño o niña (menor de 14 años)",     code: "perfil:nino" },
        { id: "familiar", emoji: "👥", label: "Para un familiar adulto que no puede rellenarlo", code: "perfil:familiar" }
      ],
      next: {
        _type: "conditional",
        _based_on: "q_perfil",
        "yo":       "q_tipo",
        "familiar": "q_tipo",
        "nino":     "rg_edad",
        _default:   "q_tipo"
      }
    },

    // ── PASO 2 (adultos): ¿QUÉ TIPO DE CONSULTA? ─────────────────────────────

    q_tipo: {
      id: "q_tipo",
      title: "¿Sobre qué quieres consultar?",
      title_3p: "¿Cuál es el motivo de consulta del/la paciente?",
      hint: "Esto nos permite asignarte el especialista más adecuado",
      type: "single",
      options: [
        { id: "rinitis",     emoji: "🤧",  label: "Moqueo, estornudos o picor de ojos (rinitis / conjuntivitis)", code: "tipo:rinitis" },
        { id: "asma",        emoji: "😮‍💨", label: "Asma o dificultad para respirar",                             code: "tipo:asma" },
        { id: "alimentaria", emoji: "🍓",  label: "Reacción a un alimento o sospecha de intolerancia",           code: "tipo:alimentaria" },
        { id: "piel",        emoji: "🤕",  label: "Picor, sarpullido o eccema en la piel",                       code: "tipo:piel" },
        { id: "medicamento", emoji: "💊",  label: "Reacción a un medicamento",                                   code: "tipo:medicamento" },
        { id: "insecto",     emoji: "🐝",  label: "Reacción a picadura de insecto",                              code: "tipo:insecto" },
        { id: "orientacion", emoji: "🤷",  label: "No sé bien qué tipo de especialista necesito",                code: "tipo:orientacion" }
      ],
      next: "b1_duracion"
    },

    // ── BLOQUE COMÚN B1 ───────────────────────────────────────────────────────

    b1_duracion: {
      id: "b1_duracion",
      title: "¿Cuánto tiempo llevas con este problema?",
      title_3p: "¿Cuánto tiempo lleva el paciente con este problema?",
      hint: null,
      type: "single",
      options: [
        { id: "agudo",            emoji: "⚡", label: "Menos de 1 mes (reciente)",                      code: "duracion:agudo" },
        { id: "subagudo",         emoji: "📅", label: "Entre 1 y 6 meses",                              code: "duracion:subagudo" },
        { id: "cronico",          emoji: "🗓️", label: "Más de 6 meses",                                 code: "duracion:cronico" },
        { id: "cronico_agudizado",emoji: "📈", label: "Llevo años con esto, pero ahora ha empeorado",   code: "duracion:cronico_agudizado" }
      ],
      next: "b1_condiciones"
    },

    b1_condiciones: {
      id: "b1_condiciones",
      title: "¿Tienes alguna de estas condiciones ya diagnosticadas?",
      title_3p: "¿Tiene alguna de estas condiciones ya diagnosticadas?",
      hint: "Puedes marcar varias",
      type: "multi",
      options: [
        { id: "asma",           emoji: "😮‍💨", label: "Asma",                                code: "dx:asma" },
        { id: "rinitis",        emoji: "🤧",  label: "Rinitis alérgica",                    code: "dx:rinitis" },
        { id: "dermatitis",     emoji: "🤕",  label: "Dermatitis atópica / eccema",         code: "dx:dermatitis" },
        { id: "urticaria",      emoji: "🔴",  label: "Urticaria crónica",                   code: "dx:urticaria" },
        { id: "al_alimentaria", emoji: "🍓",  label: "Alergia alimentaria",                 code: "dx:al_alimentaria" },
        { id: "al_medicamento", emoji: "💊",  label: "Alergia a medicamento",               code: "dx:al_medicamento" },
        { id: "ninguna",        emoji: "✗",   label: "Ninguna / no sé",                     code: "dx:ninguna", exclusive: true }
      ],
      next: "b1_medicacion"
    },

    b1_medicacion: {
      id: "b1_medicacion",
      title: "¿Estás tomando algún medicamento actualmente?",
      title_3p: "¿Está tomando algún medicamento actualmente?",
      hint: "Puedes marcar varios",
      type: "multi",
      options: [
        { id: "antihistaminico", emoji: "💊", label: "Antihistamínico (loratadina, cetirizina, bilastina…)", code: "med:antihistaminico" },
        { id: "corticoide_nasal",emoji: "💨", label: "Spray nasal con corticoide (Nasonex, Avamys…)",       code: "med:corticoide_nasal" },
        { id: "inhalador_rescate",emoji:"💨", label: "Inhalador de rescate (Ventolin, salbutamol…)",        code: "med:inhalador_rescate" },
        { id: "inhalador_mant",  emoji: "💨", label: "Inhalador de mantenimiento (corticoide inhalado)",    code: "med:inhalador_mant" },
        { id: "inmunoterapia",   emoji: "💉", label: "Vacuna de alergia (inmunoterapia)",                   code: "med:inmunoterapia" },
        { id: "biologico",       emoji: "🧬", label: "Biológico (Dupixent, Xolair, Fasenra…)",              code: "med:biologico" },
        { id: "nada",            emoji: "✗",  label: "No tomo nada",                                        code: "med:nada", exclusive: true }
      ],
      next: "b1_antecedentes"
    },

    b1_antecedentes: {
      id: "b1_antecedentes",
      title: "¿Hay antecedentes de alergia o asma en tu familia directa?",
      title_3p: "¿Hay antecedentes de alergia o asma en la familia directa del paciente?",
      hint: "Padres, hermanos o hijos",
      type: "single",
      options: [
        { id: "si",   emoji: "✓",  label: "Sí",        code: "familiar:si" },
        { id: "no",   emoji: "✗",  label: "No",         code: "familiar:no" },
        { id: "nose", emoji: "🤷", label: "No lo sé",   code: "familiar:nose" }
      ],
      next: {
        _type: "conditional",
        _based_on: "q_tipo",
        "rinitis":     "ra_sintomas",
        "asma":        "rb_sintomas",
        "alimentaria": "rc_reaccion",
        "piel":        "rd_lesiones",
        "medicamento": "re_medicamento",
        "insecto":     "rf_insecto",
        _default:      "ra_sintomas"
      }
    },

    // ── RAMA A — Rinitis / conjuntivitis / orientación ─────────────────────

    ra_sintomas: {
      id: "ra_sintomas",
      title: "¿Cuáles son tus síntomas? (marca todos los que tengas)",
      type: "multi",
      options: [
        { id: "moqueo",     emoji: "💧", label: "Moqueo abundante",                     code: "s:moqueo" },
        { id: "congestion", emoji: "🔒", label: "Nariz tapada / congestionada",          code: "s:congestion" },
        { id: "estornudos", emoji: "🤧", label: "Estornudos en salva",                   code: "s:estornudos" },
        { id: "picor_nariz",emoji: "👃", label: "Picor de nariz",                        code: "s:picor_nariz" },
        { id: "ojos",       emoji: "👁️", label: "Picor y lagrimeo de ojos",              code: "s:ojos" },
        { id: "olfato",     emoji: "🌸", label: "Pérdida de olfato",                     code: "s:olfato" },
        { id: "tos",        emoji: "😮‍💨", label: "Tos irritativa",                       code: "s:tos" }
      ],
      next: "ra_cuando"
    },

    ra_cuando: {
      id: "ra_cuando",
      title: "¿Cuándo son peores los síntomas?",
      type: "single",
      options: [
        { id: "todo_año",  emoji: "🗓️", label: "Todo el año, sin diferencia de estación",        code: "patron:perenne" },
        { id: "primavera", emoji: "🌸", label: "Solo en primavera / verano (pólenes)",            code: "patron:estacional" },
        { id: "invierno",  emoji: "❄️", label: "Peor en invierno o con calefacción encendida",    code: "patron:invierno" },
        { id: "en_casa",   emoji: "🏠", label: "Más en casa que en el exterior",                  code: "patron:interior" },
        { id: "animales",  emoji: "🐾", label: "Solo en contacto con animales",                   code: "patron:animales" }
      ],
      next: "ra_gravedad"
    },

    ra_gravedad: {
      id: "ra_gravedad",
      title: "¿Cómo afectan los síntomas a tu día a día?",
      type: "single",
      options: [
        { id: "leve",     emoji: "🟢", label: "Leve — los noto pero no me limitan",                              code: "gravedad:leve" },
        { id: "moderado", emoji: "🟡", label: "Moderado — me molestan y afectan al sueño o la concentración",    code: "gravedad:moderado" },
        { id: "grave",    emoji: "🔴", label: "Grave — me impiden hacer vida normal o no duermo bien",           code: "gravedad:grave" }
      ],
      next: "ra_pruebas"
    },

    ra_pruebas: {
      id: "ra_pruebas",
      title: "¿Te han hecho alguna prueba alérgica?",
      type: "single",
      options: [
        { id: "prick",       emoji: "📋", label: "Sí, pruebas cutáneas (prick test)",           code: "prueba:prick" },
        { id: "ige",         emoji: "🩸", label: "Sí, analítica de IgE específica en sangre",   code: "prueba:ige" },
        { id: "ambas",       emoji: "✓",  label: "Sí, las dos",                                  code: "prueba:ambas" },
        { id: "no",          emoji: "✗",  label: "No me han hecho pruebas",                      code: "prueba:no" },
        { id: "no_recuerdo", emoji: "🤷", label: "No recuerdo",                                  code: "prueba:no_recuerdo" }
      ],
      next: "final_nota"
    },

    // ── RAMA B — Asma ────────────────────────────────────────────────────────

    rb_sintomas: {
      id: "rb_sintomas",
      title: "¿Cómo describes tu problema respiratorio? (marca los que tengas)",
      type: "multi",
      options: [
        { id: "silbidos",   emoji: "🎵", label: "Silbidos o pitos en el pecho al respirar",       code: "s:silbidos" },
        { id: "opresion",   emoji: "🤛", label: "Sensación de opresión en el pecho",               code: "s:opresion" },
        { id: "disnea_ef",  emoji: "🏃", label: "Falta de aire al hacer esfuerzo",                 code: "s:disnea_esfuerzo" },
        { id: "disnea_rep", emoji: "🪑", label: "Falta de aire en reposo",                         code: "s:disnea_reposo" },
        { id: "tos_noche",  emoji: "🌙", label: "Tos seca persistente, especialmente de noche",    code: "s:tos_nocturna" }
      ],
      next: "rb_frecuencia"
    },

    rb_frecuencia: {
      id: "rb_frecuencia",
      title: "¿Con qué frecuencia tienes síntomas?",
      type: "single",
      options: [
        { id: "raro",       emoji: "📅", label: "Raramente (menos de 2 días a la semana)",   code: "frec:intermitente" },
        { id: "alguno",     emoji: "📆", label: "Algunos días a la semana",                  code: "frec:leve_persistente" },
        { id: "mayoria",    emoji: "🗓️", label: "La mayoría de los días",                    code: "frec:moderado" },
        { id: "todos",      emoji: "⏰", label: "Todos los días, incluso de noche",           code: "frec:grave" }
      ],
      next: "rb_inhalador"
    },

    rb_inhalador: {
      id: "rb_inhalador",
      title: "¿Usas inhalador de rescate (Ventolin u otro)?",
      type: "single",
      options: [
        { id: "menos2",   emoji: "✓",  label: "Sí, menos de 2 veces por semana",       code: "inhal:controlado" },
        { id: "mas2",     emoji: "⚠️", label: "Sí, más de 2 veces por semana",         code: "inhal:no_controlado" },
        { id: "no_tengo", emoji: "✗",  label: "No tengo inhalador de rescate",         code: "inhal:ninguno" },
        { id: "no_uso",   emoji: "📦", label: "Tengo pero casi nunca lo uso",           code: "inhal:raro" }
      ],
      next: "rb_crisis"
    },

    rb_crisis: {
      id: "rb_crisis",
      title: "¿Has tenido alguna crisis grave de asma en el último año?",
      type: "single",
      options: [
        { id: "urgencias", emoji: "🚨", label: "Sí, con visita a urgencias o ingreso",       code: "crisis:grave" },
        { id: "casa",      emoji: "⚠️", label: "Sí, pero la resolví en casa con más medicación", code: "crisis:moderada" },
        { id: "no",        emoji: "✓",  label: "No",                                           code: "crisis:no" }
      ],
      next: "rb_desencadenantes"
    },

    rb_desencadenantes: {
      id: "rb_desencadenantes",
      title: "¿Qué desencadena los episodios? (marca los que conozcas)",
      type: "multi",
      options: [
        { id: "ejercicio",  emoji: "🏃", label: "Ejercicio físico",                               code: "d:ejercicio" },
        { id: "tabaco",     emoji: "🚬", label: "Humo de tabaco",                                  code: "d:tabaco" },
        { id: "olores",     emoji: "💨", label: "Olores fuertes (pintura, perfumes, limpieza)",   code: "d:olores" },
        { id: "frio",       emoji: "❄️", label: "Frío o aire acondicionado",                       code: "d:frio" },
        { id: "alergenos",  emoji: "🌿", label: "Pólenes o contacto con animales",                 code: "d:alergenos" },
        { id: "infeccion",  emoji: "🦠", label: "Catarros o infecciones respiratorias",            code: "d:infeccion" },
        { id: "estres",     emoji: "😰", label: "Estrés o emociones intensas",                    code: "d:estres" },
        { id: "none",       emoji: "🤷", label: "No identifico un desencadenante claro",           code: "d:desconocido", exclusive: true }
      ],
      next: "final_nota"
    },

    // ── RAMA C — Alimentaria ─────────────────────────────────────────────────

    rc_reaccion: {
      id: "rc_reaccion",
      title: "¿Qué tipo de reacción tuviste? (marca las que correspondan)",
      type: "multi",
      options: [
        { id: "urticaria",   emoji: "🔴", label: "Urticaria o ronchas en la piel",                    code: "r:urticaria" },
        { id: "angioedema",  emoji: "💋", label: "Hinchazón de labios, lengua o garganta",             code: "r:angioedema" },
        { id: "digestivo",   emoji: "🤢", label: "Vómitos o dolor abdominal intenso",                  code: "r:digestivo" },
        { id: "digestivo2",  emoji: "🚽", label: "Diarrea crónica o digestión muy pesada",             code: "r:cronico_digestivo" },
        { id: "respiratorio",emoji: "😮‍💨", label: "Dificultad para respirar",                          code: "r:respiratorio" },
        { id: "anafilaxia",  emoji: "🚨", label: "Mareo grave, caída de tensión o pérdida de conciencia", code: "r:anafilaxia" }
      ],
      next: "rc_tiempo"
    },

    rc_tiempo: {
      id: "rc_tiempo",
      title: "¿Cuánto tiempo después de comer aparecen los síntomas?",
      hint: "Esto ayuda a distinguir alergia (inmediata) de intolerancia (tardía)",
      type: "single",
      options: [
        { id: "inmediata",  emoji: "⚡", label: "Menos de 1 hora (reacción rápida)",            code: "tiempo:inmediato" },
        { id: "1_4h",       emoji: "⏱️", label: "Entre 1 y 4 horas",                             code: "tiempo:1_4h" },
        { id: "tardia",     emoji: "🕐", label: "Más de 4 horas o al día siguiente",             code: "tiempo:tardio" },
        { id: "variable",   emoji: "🤷", label: "No hay un patrón claro",                        code: "tiempo:variable" }
      ],
      next: "rc_alimento"
    },

    rc_alimento: {
      id: "rc_alimento",
      title: "¿A qué alimento sospechas que reaccionas?",
      hint: "Escribe el alimento o alimentos que crees que te sientan mal",
      type: "textarea",
      placeholder: "Ej: frutos secos, marisco, gluten, lácteos…",
      next: "rc_anafilaxia"
    },

    rc_anafilaxia: {
      id: "rc_anafilaxia",
      title: "¿Has tenido alguna reacción grave que requiriera adrenalina o visita a urgencias?",
      type: "single",
      options: [
        { id: "si",    emoji: "🚨", label: "Sí",         code: "ana:si" },
        { id: "no",    emoji: "✓",  label: "No",          code: "ana:no" },
        { id: "nose",  emoji: "🤷", label: "No lo sé",    code: "ana:nose" }
      ],
      alerta: {
        condicion: { opcion: "si" },
        mensaje: "Este tipo de reacción puede ser grave. Si tienes síntomas en este momento, llama al 112."
      },
      next: "final_nota"
    },

    // ── RAMA D — Piel ────────────────────────────────────────────────────────

    rd_lesiones: {
      id: "rd_lesiones",
      title: "¿Cómo son las lesiones? (marca las que correspondan)",
      type: "multi",
      options: [
        { id: "habones",    emoji: "🔴", label: "Ronchas que pican y desaparecen en horas (urticaria)",        code: "l:habones" },
        { id: "contacto",   emoji: "🤕", label: "Enrojecimiento y picor en zonas concretas (posible contacto)", code: "l:contacto" },
        { id: "eccema",     emoji: "🩹", label: "Piel seca, escamosa y con grietas (eccema / dermatitis)",     code: "l:eccema" },
        { id: "vesiculas",  emoji: "💧", label: "Granos o vesículas pequeñas",                                 code: "l:vesiculas" },
        { id: "angioedema", emoji: "💋", label: "Hinchazón sin picor (angioedema)",                            code: "l:angioedema" }
      ],
      next: "rd_donde"
    },

    rd_donde: {
      id: "rd_donde",
      title: "¿Dónde aparecen principalmente las lesiones?",
      type: "multi",
      options: [
        { id: "cara",     emoji: "😊", label: "Cara (párpados, labios, mejillas)",    code: "zona:cara" },
        { id: "manos",    emoji: "🤲", label: "Manos y muñecas",                      code: "zona:manos" },
        { id: "brazos",   emoji: "💪", label: "Brazos y piernas",                     code: "zona:extremidades" },
        { id: "tronco",   emoji: "👕", label: "Tronco / espalda",                     code: "zona:tronco" },
        { id: "pliegues", emoji: "🔄", label: "Pliegues (codos, rodillas, cuello)",   code: "zona:pliegues" },
        { id: "cualquier",emoji: "🔴", label: "En cualquier parte del cuerpo",        code: "zona:generalizado" }
      ],
      next: "rd_desencadenantes"
    },

    rd_desencadenantes: {
      id: "rd_desencadenantes",
      title: "¿Has identificado algún desencadenante?",
      type: "multi",
      options: [
        { id: "alimento",   emoji: "🍓", label: "Algún alimento",                                  code: "d:alimento" },
        { id: "medicamento",emoji: "💊", label: "Medicamento (ibuprofeno, aspirina, antibiótico…)", code: "d:medicamento" },
        { id: "contacto",   emoji: "🌿", label: "Contacto con planta, metal o cosmético",          code: "d:contacto" },
        { id: "fisico",     emoji: "🌡️", label: "Calor, frío, presión o ejercicio",                code: "d:fisico" },
        { id: "estres",     emoji: "😰", label: "Estrés",                                          code: "d:estres" },
        { id: "ninguno",    emoji: "🤷", label: "No identifico ninguno",                           code: "d:ninguno", exclusive: true }
      ],
      next: "final_nota"
    },

    // ── RAMA E — Medicamento ─────────────────────────────────────────────────

    re_medicamento: {
      id: "re_medicamento",
      title: "¿A qué medicamento reaccionaste?",
      hint: "Nombre del fármaco o grupo (ej: ibuprofeno, amoxicilina, contraste radiológico…)",
      type: "textarea",
      placeholder: "Escribe el nombre del medicamento",
      next: "re_sintomas"
    },

    re_sintomas: {
      id: "re_sintomas",
      title: "¿Qué síntomas tuviste con ese medicamento?",
      type: "multi",
      options: [
        { id: "urticaria",   emoji: "🔴", label: "Urticaria / ronchas",                          code: "s:urticaria" },
        { id: "angioedema",  emoji: "💋", label: "Hinchazón (labios, cara, garganta)",            code: "s:angioedema" },
        { id: "respiratorio",emoji: "😮‍💨", label: "Dificultad para respirar",                     code: "s:respiratorio" },
        { id: "anafilaxia",  emoji: "🚨", label: "Caída de tensión o pérdida de conciencia",      code: "s:anafilaxia" },
        { id: "tardio",      emoji: "📅", label: "Erupción cutánea varios días después",          code: "s:tardio" }
      ],
      next: "re_urgencia"
    },

    re_urgencia: {
      id: "re_urgencia",
      title: "¿Necesitas ese medicamento (o del mismo grupo) próximamente?",
      hint: "Ej: cirugía, tratamiento dental, quimioterapia…",
      type: "single",
      options: [
        { id: "si",  emoji: "🚨", label: "Sí, tengo un procedimiento próximo",              code: "urgencia:si" },
        { id: "no",  emoji: "✓",  label: "No, pero quiero saber si podría tomarlo",         code: "urgencia:no" },
        { id: "nose",emoji: "🤷", label: "No lo sé",                                         code: "urgencia:nose" }
      ],
      alerta: {
        condicion: { opcion: "si" },
        mensaje: "Marcamos esta consulta como urgente para priorizarla con el especialista."
      },
      next: "final_nota"
    },

    // ── RAMA F — Picadura de insecto ─────────────────────────────────────────

    rf_insecto: {
      id: "rf_insecto",
      title: "¿Qué insecto te picó?",
      type: "single",
      options: [
        { id: "abeja",   emoji: "🐝", label: "Abeja",                code: "insecto:abeja" },
        { id: "avispa",  emoji: "🪲", label: "Avispa",               code: "insecto:avispa" },
        { id: "hormiga", emoji: "🐜", label: "Hormiga",              code: "insecto:hormiga" },
        { id: "nose",    emoji: "🤷", label: "No lo sé con certeza", code: "insecto:desconocido" }
      ],
      next: "rf_reaccion"
    },

    rf_reaccion: {
      id: "rf_reaccion",
      title: "¿Cómo fue la reacción a la picadura?",
      type: "single",
      options: [
        { id: "local",    emoji: "🟡", label: "Local grande: hinchazón de más de 10 cm",              code: "reac:local_grande" },
        { id: "leve",     emoji: "🟠", label: "General leve: urticaria, picor en todo el cuerpo",     code: "reac:general_leve" },
        { id: "moderada", emoji: "🔴", label: "General moderada: vómitos, hinchazón de cara o garganta", code: "reac:general_moderada" },
        { id: "grave",    emoji: "🚨", label: "Grave: dificultad para respirar, pérdida de conciencia", code: "reac:anafilaxia" }
      ],
      alerta: {
        condicion: { opcion: "grave" },
        mensaje: "Una reacción anafiláctica a picadura es grave. Si tienes síntomas ahora, llama al 112."
      },
      next: "rf_adrenalina"
    },

    rf_adrenalina: {
      id: "rf_adrenalina",
      title: "¿Llevas adrenalina autoinyectable (EpiPen u otro)?",
      type: "single",
      options: [
        { id: "si",         emoji: "✓",  label: "Sí, la llevo conmigo",                          code: "epi:si" },
        { id: "recetada",   emoji: "⚠️", label: "Me la han recetado pero aún no la tengo",       code: "epi:recetada" },
        { id: "no",         emoji: "✗",  label: "No me la han recetado",                          code: "epi:no" }
      ],
      next: "final_nota"
    },

    // ── RAMA G — Pediátrica ───────────────────────────────────────────────────

    rg_edad: {
      id: "rg_edad",
      title: "¿Cuántos años tiene?",
      hint: "La edad es clave para el enfoque diagnóstico y las pruebas que se pueden realizar",
      type: "single",
      options: [
        { id: "menor_1", emoji: "👶", label: "Menos de 1 año (lactante)",       code: "edad:menor_1" },
        { id: "1_3",     emoji: "🧒", label: "1 a 3 años",                      code: "edad:1_3" },
        { id: "3_6",     emoji: "🧒", label: "3 a 6 años",                      code: "edad:3_6" },
        { id: "6_12",    emoji: "👦", label: "6 a 12 años",                     code: "edad:6_12" },
        { id: "12_14",   emoji: "🧑", label: "12 a 14 años (preadolescente)",   code: "edad:12_14" }
      ],
      alerta: {
        condicion: { opcion: "menor_1" },
        mensaje: "Los bebés menores de 1 año deben ser valorados primero por su pediatra de cabecera. Podemos orientaros, pero el diagnóstico alergológico formal suele iniciarse a partir del año."
      },
      next: "rg_motivo"
    },

    rg_motivo: {
      id: "rg_motivo",
      title: "¿Cuál es el motivo principal de consulta? (marca los que apliquen)",
      hint: "Para el niño o niña",
      type: "multi",
      options: [
        { id: "moqueo",    emoji: "🤧",  label: "Moqueo y estornudos frecuentes",                    code: "m:rinitis" },
        { id: "ojos",      emoji: "👁️",  label: "Picor de ojos o conjuntivitis recurrente",          code: "m:conjuntivitis" },
        { id: "respirar",  emoji: "😮‍💨", label: "Pitidos en el pecho o dificultad para respirar",   code: "m:asma" },
        { id: "piel_nino", emoji: "🤕",  label: "Eccema o dermatitis (picor, enrojecimiento, sequedad)", code: "m:piel" },
        { id: "alimento",  emoji: "🍓",  label: "Reacción a algún alimento",                         code: "m:alimentaria" },
        { id: "ronquidos", emoji: "😴",  label: "Ronquidos o respiración ruidosa al dormir",         code: "m:nocturno" },
        { id: "tos",       emoji: "💨",  label: "Tos persistente, especialmente de noche",            code: "m:tos" }
      ],
      next: "rg_inicio"
    },

    rg_inicio: {
      id: "rg_inicio",
      title: "¿Desde qué edad tiene síntomas?",
      hint: "La edad de inicio es importante para evaluar el pronóstico y la marcha atópica",
      type: "single",
      options: [
        { id: "lactante",  emoji: "👶", label: "Desde el primer año de vida",          code: "inicio:lactante" },
        { id: "1_3",       emoji: "🧒", label: "Entre 1 y 3 años",                    code: "inicio:1_3" },
        { id: "3_6",       emoji: "🧒", label: "Entre 3 y 6 años",                    code: "inicio:3_6" },
        { id: "mas_6",     emoji: "👦", label: "Después de los 6 años",               code: "inicio:mas_6" }
      ],
      next: "rg_eccema"
    },

    rg_eccema: {
      id: "rg_eccema",
      title: "¿Ha tenido o tiene eccema / dermatitis atópica?",
      hint: "La secuencia eccema → rinitis → asma es muy frecuente en niños alérgicos",
      type: "single",
      options: [
        { id: "si_actual",  emoji: "🔴", label: "Sí, actualmente",            code: "eccema:actual" },
        { id: "si_antes",   emoji: "🟡", label: "Sí, pero ha mejorado",       code: "eccema:previo" },
        { id: "no",         emoji: "✓",  label: "No",                          code: "eccema:no" }
      ],
      next: "rg_bronquitis"
    },

    rg_bronquitis: {
      id: "rg_bronquitis",
      title: "¿Ha tenido bronquitis o bronquiolitis repetidas antes de los 3 años?",
      hint: "Más de 2 episodios en los primeros años de vida es un predictor importante de asma",
      type: "single",
      options: [
        { id: "si_varios", emoji: "⚠️", label: "Sí, más de 2 episodios",   code: "bronq:si_varios" },
        { id: "si_uno",    emoji: "📋", label: "Sí, uno solo",              code: "bronq:si_uno" },
        { id: "no",        emoji: "✓",  label: "No",                         code: "bronq:no" }
      ],
      next: "final_nota"
    },

    // ── BLOQUE FINAL ──────────────────────────────────────────────────────────

    final_nota: {
      id: "final_nota",
      title: "¿Hay algo más que el especialista deba saber antes de la consulta?",
      hint: "Campo libre (opcional). Máximo 300 caracteres.",
      type: "textarea",
      placeholder: "Cualquier detalle relevante: alergias conocidas, medicamentos que tomas, cirugías anteriores…",
      maxlength: 300,
      required: false,
      next: "_end"
    }
  },

  // ── ESPECIALISTAS POR TIPO DE CONSULTA ────────────────────────────────────
  // Usados en la pantalla de resultado del MVP.

  especialistas: {
    rinitis: {
      titulo:      "Alergólogo/a",
      especialidad:"rinitis alérgica, conjuntivitis y sensibilización a alérgenos",
      emoji:       "🤧",
      descripcion: "especialista en enfermedades mediadas por el sistema inmune que afectan a la nariz, los ojos y las vías respiratorias"
    },
    asma: {
      titulo:      "Alergólogo/a especializado en asma",
      especialidad:"asma, hiperreactividad bronquial y vías respiratorias",
      emoji:       "😮‍💨",
      descripcion: "especialista en el diagnóstico y control del asma y otras enfermedades bronquiales de origen alérgico"
    },
    alimentaria: {
      titulo:      "Alergólogo/a — Intolerancia alimentaria",
      especialidad:"alergias e intolerancias alimentarias",
      emoji:       "🍓",
      descripcion: "especialista en reacciones adversas a alimentos, ya sean mediadas por IgE (alergia) o no (intolerancia)"
    },
    piel: {
      titulo:      "Dermatólogo/a-Alergólogo/a",
      especialidad:"dermatitis, urticaria y eccema de origen alérgico",
      emoji:       "🤕",
      descripcion: "especialista en enfermedades cutáneas relacionadas con el sistema inmune y la alergia de contacto"
    },
    medicamento: {
      titulo:      "Alergólogo/a — Alergia a medicamentos",
      especialidad:"hipersensibilidad a fármacos y desensibilización",
      emoji:       "💊",
      descripcion: "especialista en el diagnóstico de reacciones alérgicas a medicamentos y protocolos de tolerancia cuando es necesario"
    },
    insecto: {
      titulo:      "Alergólogo/a — Veneno de himenópteros",
      especialidad:"alergia a picaduras de abeja, avispa y hormiga",
      emoji:       "🐝",
      descripcion: "especialista en reacciones sistémicas a picaduras de insecto e inmunoterapia con veneno"
    },
    pediatrico: {
      titulo:      "Alergólogo/a pediátrico/a",
      especialidad:"alergias en la infancia: rinitis, asma, eccema y alimentaria",
      emoji:       "👧",
      descripcion: "especialista en el diagnóstico y seguimiento de enfermedades alérgicas en niños y adolescentes"
    },
    orientacion: {
      titulo:      "Alergólogo/a",
      especialidad:"orientación y diagnóstico inicial",
      emoji:       "🤷",
      descripcion: "especialista que te ayudará a identificar el origen de tus síntomas y a trazar el plan de estudio más adecuado"
    }
  }

};
