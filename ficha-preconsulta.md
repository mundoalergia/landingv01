# Ficha de preconsulta — Mundo Alergia
**Consulta médica online · 15 minutos**
**Versión 1.0 — Junio 2026**

---

## Objetivo del documento

Este formulario se completa **antes de la videollamada** y llega al médico como resumen estructurado. Su función es doble: que el especialista llegue a la consulta con contexto suficiente para no perder los primeros minutos en anamnesis básica, y que el paciente haya reflexionado sobre su problema antes de hablar.

Tiempo estimado de cumplimentación: **4-6 minutos.**

---

## Bloque 0 — Routing: tipo de consulta

> Esta es la primera pregunta. Define qué especialista se asigna y qué rama del formulario se activa a continuación.

### P0 — ¿Sobre qué necesitas consultar?

| Opción visible | Código | Especialista asignado | Rama activada |
|---|---|---|---|
| 🤧 Moqueo, estornudos, picor de ojos (rinitis / conjuntivitis) | `tipo:rinitis` | Alergólogo adultos | Rama A |
| 😮‍💨 Asma o dificultad para respirar | `tipo:asma` | Neumólogo-alergólogo | Rama B |
| 🍓 Reacción a un alimento o sospecha de intolerancia | `tipo:alimentaria` | Alergólogo / dietista-nutricionista | Rama C |
| 🤕 Picor, sarpullido o eccema en la piel | `tipo:piel` | Dermatólogo-alergólogo | Rama D |
| 💊 Reacción a un medicamento | `tipo:medicamento` | Alergólogo adultos | Rama E |
| 🐝 Reacción a picadura de insecto | `tipo:insecto` | Alergólogo adultos | Rama F |
| 👧 Es para un niño (menor de 14 años) | `tipo:pediatrico` | Alergólogo pediátrico | Rama G |
| 🤷 No sé bien qué tipo de especialista necesito | `tipo:orientacion` | Alergólogo generalista | Rama A (genérica) |

> **Nota para desarrollo:** Si se selecciona `tipo:pediatrico`, preguntar a continuación la edad exacta del niño antes de activar la Rama G. Las ramas pediátricas cubren rinitis, asma y piel pero con anamnesis adaptada.

---

## Bloque 1 — Datos comunes (todas las ramas)

Estas preguntas son iguales para todos los tipos de consulta. Se muestran siempre después del P0.

### P1.1 — ¿Para quién es la consulta?

- Para mí (`paciente:yo`)
- Para mi hijo/a u otro familiar (`paciente:tercero`) → preguntar nombre y edad del paciente real

### P1.2 — Edad del paciente

Campo numérico libre (años). Relevante para dosificación, diagnóstico diferencial y derivación.

### P1.3 — ¿Cuánto tiempo llevas con este problema?

| Opción | Código |
|---|---|
| Menos de 1 mes (reciente, posiblemente agudo) | `duracion:agudo` |
| Entre 1 y 6 meses | `duracion:subagudo` |
| Más de 6 meses (crónico) | `duracion:cronico` |
| Lleva años, pero ahora ha empeorado | `duracion:cronico_agudizado` |

### P1.4 — ¿Tienes alguna de estas condiciones diagnosticadas? *(selección múltiple)*

- Asma
- Rinitis alérgica
- Dermatitis atópica / eccema
- Urticaria crónica
- Alergia alimentaria diagnosticada
- Alergia a medicamentos diagnosticada
- Ninguna de las anteriores
- No lo sé

### P1.5 — ¿Estás tomando algún medicamento actualmente? *(selección múltiple)*

- Antihistamínico (ej. loratadina, cetirizina, bilastina)
- Corticoide nasal en spray (ej. Nasonex, Avamys)
- Inhalador de rescate (ej. Ventolin, salbutamol)
- Inhalador de mantenimiento (corticoide inhalado)
- Inmunoterapia (vacuna de alergia)
- Biológico (ej. Dupixent, Xolair, Fasenra)
- Otro medicamento (campo libre)
- No tomo nada

### P1.6 — ¿Hay antecedentes de alergia o asma en tu familia directa? *(padres, hermanos, hijos)*

- Sí
- No
- No lo sé

---

## Rama A — Rinitis alérgica / conjuntivitis

*Activada por: `tipo:rinitis` o `tipo:orientacion`*

### A1 — ¿Cuáles son tus síntomas principales? *(selección múltiple)*

- Moqueo abundante (rinorrea acuosa)
- Congestión / nariz tapada
- Estornudos en salva (varios seguidos)
- Picor de nariz
- Picor y lagrimeo de ojos
- Pérdida de olfato
- Tos irritativa

### A2 — ¿Cuándo ocurren los síntomas?

| Opción | Código clínico |
|---|---|
| Todo el año, sin variación estacional | Rinitis perenne → ácaros, mascotas, hongos |
| Solo en primavera / verano | Rinitis estacional → pólenes |
| Peor en invierno o con calefacción | Ácaros, sequedad ambiental |
| En casa más que en el exterior | Alérgenos de interior |
| En el exterior más que en casa | Alérgenos de exterior / pólenes |
| Solo en contacto con animales | Alérgeno animal |

### A3 — ¿Cómo afectan los síntomas a tu día a día?

- Leve: los noto pero no me limitan
- Moderado: me molestan y a veces me impiden concentrarme o dormir bien
- Grave: me afectan mucho, falto al trabajo/estudio o no duermo

### A4 — ¿Te han hecho alguna prueba alérgica anteriormente?

- Sí, pruebas cutáneas (prick test) → ¿cuál fue el resultado? *(campo libre)*
- Sí, analítica de IgE específica → ¿cuál fue el resultado? *(campo libre)*
- No me han hecho pruebas
- No recuerdo

### A5 — ¿Qué esperas de esta consulta? *(selección múltiple)*

- Saber qué me produce la alergia
- Revisar si mi tratamiento actual es el adecuado
- Explorar si la inmunoterapia (vacuna) puede ayudarme
- Orientación sobre cómo reducir los alérgenos en casa
- Segunda opinión

---

## Rama B — Asma y dificultad respiratoria

*Activada por: `tipo:asma`*

### B1 — ¿Cómo describes tu problema respiratorio? *(selección múltiple)*

- Silbidos o pitos en el pecho al respirar
- Sensación de opresión en el pecho
- Falta de aire al hacer esfuerzo (subir escaleras, caminar rápido)
- Falta de aire en reposo
- Tos seca persistente, especialmente de noche

### B2 — ¿Con qué frecuencia tienes síntomas?

- Raramente (menos de 2 días a la semana)
- Algunos días a la semana
- La mayoría de los días
- Todos los días / noche

### B3 — ¿Usas inhalador de rescate (Ventolin u otro)?

- Sí, menos de 2 veces por semana
- Sí, más de 2 veces por semana
- No tengo inhalador de rescate
- Tengo pero casi nunca lo uso

### B4 — ¿Has tenido alguna crisis grave de asma en el último año?

- Sí, con visita a urgencias o ingreso hospitalario
- Sí, pero la resolví en casa con más medicación
- No

### B5 — ¿Qué desencadena tus episodios? *(selección múltiple)*

- Ejercicio físico
- Humo de tabaco
- Olores fuertes (pintura, perfumes, productos de limpieza)
- Cambios de temperatura (frío, aire acondicionado)
- Pólenes o contacto con animales
- Infecciones respiratorias (catarros)
- Estrés o emociones intensas
- No identifico un desencadenante claro

### B6 — ¿Te han realizado una espirometría en los últimos 2 años?

- Sí, fue normal
- Sí, mostraba obstrucción
- No me han hecho espirometría
- No sé lo que es

---

## Rama C — Alergia / intolerancia alimentaria

*Activada por: `tipo:alimentaria`*

### C1 — ¿Qué tipo de reacción tuviste? *(selección múltiple)*

- Urticaria o ronchas en la piel
- Hinchazón de labios, lengua o garganta (angioedema)
- Vómitos o dolor abdominal intenso
- Diarrea o digestión muy pesada
- Dificultad para respirar
- Mareo o pérdida de conciencia (anafilaxia)
- Síntomas digestivos crónicos sin reacción aguda clara

### C2 — ¿Cuánto tiempo después de comer aparecen los síntomas?

- En menos de 1 hora (reacción inmediata → IgE mediada, posible alergia)
- Entre 1 y 4 horas
- Más de 4 horas o al día siguiente (reacción tardía → posible intolerancia o SGNC)
- No hay un patrón claro

### C3 — ¿A qué alimento/s sospechas que reaccionas? *(campo libre + sugerencias)*

Sugerencias: frutos secos, mariscos, gluten/trigo, lácteos, huevo, frutas (melocotón, kiwi), legumbres, aditivos (sulfitos), alcohol

### C4 — ¿Has evitado ese alimento desde la reacción?

- Sí, lo he eliminado completamente
- Lo he reducido pero no eliminado
- No lo he evitado (sigo tomándolo)

### C5 — ¿Has tenido alguna reacción grave (anafilaxia) que requiriera adrenalina o urgencias?

- Sí
- No
- No sé si fue anafilaxia

### C6 — ¿Qué esperas de esta consulta?

- Confirmar si tengo alergia o intolerancia
- Saber si puedo volver a tomar el alimento y en qué cantidad
- Orientación sobre dieta de eliminación
- Saber si necesito llevar adrenalina autoinyectable (EpiPen)

---

## Rama D — Alergia cutánea / dermatitis / urticaria

*Activada por: `tipo:piel`*

### D1 — ¿Cómo son las lesiones? *(selección múltiple)*

- Ronchas que pican y desaparecen en horas (habones / urticaria)
- Enrojecimiento y picor en zonas concretas (dermatitis de contacto)
- Piel seca, escamosa y con grietas (eccema / dermatitis atópica)
- Granos o vesículas pequeñas
- Hinchazón sin picor (angioedema)

### D2 — ¿Dónde aparecen principalmente?

- Cara (párpados, labios, mejillas)
- Cuello y escote
- Manos y muñecas
- Brazos y piernas
- Tronco
- Zonas de pliegue (codos, rodillas, cuello)
- En cualquier parte del cuerpo

### D3 — ¿Desde hace cuánto tiempo tienes estas lesiones?

- Episodio único reciente (menos de 6 semanas → urticaria aguda)
- Se repite de forma intermitente
- Tengo brotes frecuentes desde hace más de 6 semanas (→ urticaria crónica)
- Lo tengo de manera casi continua

### D4 — ¿Has identificado algún desencadenante? *(selección múltiple)*

- Algún alimento
- Medicamento (especialmente ibuprofeno, aspirina, antibióticos)
- Contacto con una planta, metal o producto cosmético
- Calor, frío, presión o ejercicio
- Estrés
- No identifico ninguno

### D5 — ¿Has probado algún tratamiento? ¿Ha funcionado?

*(campo libre)*

---

## Rama E — Reacción a medicamento

*Activada por: `tipo:medicamento`*

### E1 — ¿A qué medicamento reaccionaste?

*(campo libre — nombre del medicamento o grupo: AINE, penicilina, contraste, etc.)*

### E2 — ¿Qué síntomas tuviste? *(selección múltiple)*

- Urticaria / ronchas
- Hinchazón (angioedema)
- Dificultad para respirar
- Caída de tensión / mareo grave
- Erupción cutánea generalizada (varios días después)
- Otro: *(campo libre)*

### E3 — ¿Cuánto tiempo después de tomar el medicamento apareció la reacción?

- En menos de 1 hora (reacción inmediata)
- Entre 1 y 6 horas
- Más de 6 horas / días después (reacción tardía)

### E4 — ¿Has vuelto a tomar ese medicamento desde la reacción?

- No, lo evito
- Sí, sin problemas
- Sí, con reacción de nuevo

### E5 — ¿Necesitas ese medicamento (o uno del mismo grupo) para un tratamiento próximo?

- Sí (cirugía, tratamiento dental, etc.) → urgencia clínica alta
- No, pero quiero saber si puedo tomarlo en el futuro
- No lo sé

---

## Rama F — Reacción a picadura de insecto

*Activada por: `tipo:insecto`*

### F1 — ¿Qué insecto te picó?

- Abeja
- Avispa
- Hormiga
- No lo sé con certeza

### F2 — ¿Cómo fue la reacción?

- Local grande: hinchazón de más de 10 cm alrededor de la picadura
- General leve: urticaria, picor generalizado
- General moderada: vómitos, hinchazón de cara o garganta
- General grave: dificultad respiratoria, caída de tensión, pérdida de conciencia

### F3 — ¿Cuánto tiempo después de la picadura?

- Menos de 15 minutos
- Entre 15 y 60 minutos
- Más de 1 hora

### F4 — ¿Llevas adrenalina autoinyectable (EpiPen)?

- Sí
- No, pero me la han recetado y no la tengo aún
- No me la han recetado

### F5 — ¿Cuántas veces has tenido una reacción a picadura?

- Solo una vez
- Dos o más veces

---

## Rama G — Consulta pediátrica (menor de 14 años)

*Activada por: `tipo:pediatrico`*

> Las preguntas se formulan en segunda persona dirigidas al adulto acompañante.

### G0 — Datos del niño/a

- Nombre (opcional)
- Edad exacta: *(campo numérico)*
- Sexo: niño / niña / prefiero no indicar

### G1 — ¿Cuál es el motivo principal de consulta? *(selección múltiple)*

- Moqueo y estornudos frecuentes
- Picor de ojos / conjuntivitis recurrente
- Pitidos en el pecho o dificultad para respirar
- Piel con eccema o dermatitis (picor, enrojecimiento, sequedad)
- Reacción a algún alimento
- Ronquidos o respiración ruidosa al dormir
- Tos persistente, especialmente de noche

### G2 — ¿Desde qué edad tiene síntomas?

- Desde el primer año de vida
- Entre 1 y 3 años
- Entre 3 y 6 años
- Después de los 6 años

> **Nota clínica:** La edad de inicio es relevante para evaluar la marcha atópica (eccema → rinitis → asma) y la probabilidad de persistencia en la edad adulta.

### G3 — ¿Ha tenido o tiene eccema / dermatitis atópica?

- Sí, actualmente
- Sí, pero ha mejorado
- No

### G4 — ¿Ha tenido bronquitis o bronquiolitis repetidas antes de los 3 años?

- Sí, más de 2 episodios
- Sí, uno solo
- No

### G5 — ¿Asiste a guardería o colegio? ¿Los síntomas mejoran en vacaciones?

- Sí asiste, y mejora claramente en vacaciones (→ sugiere alérgeno ambiental o infecciones)
- Sí asiste, y los síntomas son iguales siempre
- No asiste todavía

### G6 — ¿Tiene mascotas en casa?

- Sí, gato
- Sí, perro
- Sí, otros
- No

### G7 — ¿Qué medicación toma actualmente? *(selección múltiple)*

- Antihistamínico pediátrico
- Corticoide nasal
- Inhalador de rescate
- Inhalador de mantenimiento
- Crema de corticoide para la piel
- Inmunoterapia (vacuna)
- Ninguno

### G8 — ¿Qué espera de esta consulta?

- Confirmar si tiene alergia
- Revisar si el tratamiento actual es el adecuado
- Saber si puede crecer sin estos problemas (pronóstico)
- Orientación para el colegio / guardería
- Segunda opinión

---

## Bloque final — Para todas las ramas

### PF1 — ¿Hay algo más que quieras que el especialista sepa antes de la consulta?

*(Campo de texto libre — máximo 300 caracteres)*

### PF2 — ¿Tienes algún informe médico, analítica o prueba que quieras compartir?

- Sí → instrucciones para subir archivo (PDF, imagen)
- No

---

## Resumen clínico para el médico

Lo que llega al especialista antes de la videollamada es una **ficha de una página** con este formato:

```
PACIENTE: [nombre opcional] · [edad] años · [sexo]
TIPO DE CONSULTA: [opción P0]
DURACIÓN DEL PROBLEMA: [opción P1.3]

MOTIVO PRINCIPAL:
[síntomas marcados en la rama correspondiente]

HISTORIAL:
· Diagnósticos previos: [P1.4]
· Medicación actual: [P1.5]
· Antecedentes familiares: [P1.6]
· Pruebas realizadas: [A4 / otras]

ESPECÍFICO DE LA CONSULTA:
[respuestas de la rama activa, condensadas]

EXPECTATIVA DEL PACIENTE:
[última pregunta de la rama]

NOTA LIBRE DEL PACIENTE:
[PF1]

ARCHIVOS ADJUNTOS: [Sí / No]
```

---

## Notas de implementación

**Lógica de ramificación:** el formulario es lineal hasta P0. A partir de ahí, se activa solo la rama correspondiente. El Bloque 1 (P1.1–P1.6) y el Bloque final (PF1–PF2) son comunes a todas las ramas.

**Tiempo objetivo por rama:** el Bloque 0 + Bloque 1 + una rama + Bloque final no debería superar las 20-25 preguntas ni los 6 minutos de cumplimentación.

**Validaciones críticas:**
- Si `tipo:insecto` + reacción grave + sin adrenalina → mostrar aviso: *"Este tipo de reacción puede ser grave. Si tienes síntomas en este momento, llama al 112."*
- Si `tipo:medicamento` + E5 = "Sí, tengo cirugía próxima" → marcar como **urgente** en la ficha del médico.
- Si `tipo:pediatrico` + edad < 2 años → añadir nota en ficha: *"Lactante. Considerar diagnóstico diferencial con APLV (alergia proteína leche de vaca)."*

**Integración con el formulario de cita:** Los datos de esta ficha deben asociarse al slot de agenda del médico correspondiente. El especialista accede a la ficha desde el panel de gestión de citas antes o durante la videollamada.

**Privacidad:** Todos los datos son de salud (categoría especial RGPD). Requieren consentimiento explícito antes de P0 y cifrado en reposo y en tránsito.
