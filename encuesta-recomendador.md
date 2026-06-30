# Sistema de recomendación por perfil — Mundo Alergia
**Versión 1.1 — Junio 2026**

---

## 1. Contexto clínico

El catálogo de Mundo Alergia cubre **357 productos activos** distribuidos en tres grandes dominios clínicos:

| Dominio | Categorías principales | Productos |
|---|---|---|
| **Entorno interior** | Purificación, control de ácaros, humedad, VOCs, limpieza | ~130 |
| **Asma y respiración** | Apoyo nocturno, cámaras espaciadoras, tos | ~20 |
| **Piel e irritación** | Cremas calmantes, sprays sin perfume | ~18 |
| **Cuidado nasal** | Irrigadores (sin categoría asignada aún) | 3+ |

Desde la perspectiva alergológica, el **alérgeno desencadenante** y el **órgano diana** (nariz, bronquios, piel, ojos) son los dos ejes que determinan qué producto es prioritario para cada persona. La encuesta debe capturar ambos en el menor número de preguntas posible.

---

## 2. La encuesta — diseño clínico

### Principio de diseño
Máximo **6 preguntas** con opciones visuales y exclusión mutua simple. Tiempo estimado: **90 segundos**. Sin terminología médica en las opciones. Cada pregunta tiene una o más dimensiones clínicas asociadas que alimentan el motor de matching.

---

### P1 — ¿Para quién buscas productos? *(perfil del paciente)*

> **Primera pregunta siempre.** Determina si se activan las versiones pediátricas o adultas del catálogo, y adapta el tono de las preguntas siguientes (ej. "¿Qué *le* molesta más?" si el paciente es un niño).

| Opción visible | Código interno | Implicación clínica |
|---|---|---|
| 👤 Para mí (soy adulto) | `perfil:adulto` | Productos adultos; preguntas en primera persona |
| 👧 Para mi hijo/a (menor de 12 años) | `perfil:pediatrico` | Activa variantes pediátricas; preguntas en tercera persona |
| 👨‍👩‍👧 Para toda la familia | `perfil:familiar` | Se recomiendan tanto versiones adultas como pediátricas |

> **Nota de diseño UX:** Si se elige `perfil:pediatrico` o `perfil:familiar`, las preguntas siguientes cambian "¿Qué te molesta?" → "¿Qué le molesta?" y adaptan los ejemplos. En el matching, `perfil:familiar` activa ambas variantes de catálogo.

---

### P2 — ¿Qué molesta más? *(síntoma principal)*

> Esta pregunta determina el **órgano diana** y el tipo de producto de primera línea.

| Opción visible | Código interno | Dimensión clínica |
|---|---|---|
| 🤧 Moqueo, estornudos o picor de nariz | `sintoma:nasal` | Rinitis alérgica |
| 😮‍💨 Cuesta respirar / hay asma diagnosticada | `sintoma:bronquial` | Asma / hiperreactividad |
| 😴 Duerme mal: ronquidos, despertares, tos de noche | `sintoma:nocturno` | Síndrome respiratorio nocturno |
| 🤕 Picor o irritación de piel | `sintoma:piel` | Dermatitis atópica / urticaria |
| 🏠 Sin síntomas claros, quiero limpiar el hogar | `sintoma:entorno` | Prevención activa |

---

### P3 — ¿Cuándo son peores los síntomas? *(patrón temporal → alérgeno)*

> Esta pregunta identifica el **tipo de alérgeno** con mayor probabilidad sin hacer análisis de sangre.

| Opción visible | Código interno | Alérgeno probable |
|---|---|---|
| 🌿 En primavera o cuando hay mucho viento | `alergeno:polen` | Pólenes (gramíneas, olivo, plátano) |
| 🏠 Todo el año, especialmente en casa | `alergeno:acaros` | Ácaros del polvo |
| 🐱 Cerca de animales | `alergeno:mascota` | Dander animal |
| 💧 En sitios húmedos o con moho | `alergeno:hongos` | Hongos / esporas |
| 🏙️ Con olores fuertes, pintura o productos de limpieza | `alergeno:voc` | VOCs / sensibilizantes químicos |
| 🤷 No está claro cuándo | `alergeno:desconocido` | Sin determinar |

---

### P4 — ¿Hay mascotas en casa? *(factor de carga alergénica)*

| Opción | Código |
|---|---|
| Sí, y los síntomas son principalmente suyos | `perfil:pediatrico_principal` |
| Sí, pero los síntomas son principalmente míos | `perfil:pediatrico_secundario` |
| No | `perfil:adulto` |

---

### P4 — ¿Tienes mascotas en casa? *(factor de carga alergénica)*

> Modifica la prioridad de purificadores HEPA y protectores de tejidos.

| Opción | Código |
|---|---|
| Sí, gato | `mascota:gato` |
| Sí, perro | `mascota:perro` |
| Sí, ambos | `mascota:ambos` |
| No, pero las visito o vienen a casa | `mascota:contacto` |
| No | `mascota:no` |

---

### P5 — ¿Ya usas alguno de estos? *(gap analysis)*

> Permite evitar recomendar lo que ya tienen y detectar complementos obvios.

| Opción | Código | Implicación |
|---|---|---|
| Inhalador o spray broncodilatador | `usa:inhalador` | → Recomendar cámara espaciadora |
| Purificador de aire | `usa:purificador` | → Recomendar filtros de recambio y monitor |
| Irrigador nasal | `usa:irrigador` | → Recomendar upgrade o complementos |
| Nada de lo anterior | `usa:nada` | Recomendaciones desde cero |

*(Selección múltiple permitida)*

---

### P6 — ¿Cómo notas el ambiente de tu hogar? *(humedad → deshumidificador / humidificador)*

> Solo se muestra si `alergeno:acaros` o `alergeno:hongos` están activos (lógica condicional).

| Opción | Código |
|---|---|
| Suele haber humedad, condensación en ventanas | `humedad:alta` |
| El ambiente es muy seco, sobre todo en invierno | `humedad:baja` |
| Normal, no lo he notado | `humedad:normal` |
| No lo sé | `humedad:desconocido` |

---

## 3. Sistema de etiquetado del catálogo

Cada subcategoría del catálogo recibe un conjunto de **etiquetas clínicas** (`triggers`) que el motor de matching confronta con el perfil resultante de la encuesta. El sistema trabaja por **score de afinidad** (0–10), no por exclusión binaria.

### 3.1 Tabla de etiquetado por subcategoría

| Subcategoría | Triggers síntoma | Triggers alérgeno | Triggers perfil | Score base |
|---|---|---|---|---|
| **Purificadores de aire** | nasal, bronquial, entorno | acaros, mascota, hongos, voc, desconocido | adulto, pediatrico, familiar | 8 |
| **Aspiradores con filtro HEPA** | entorno | acaros, mascota | adulto, familiar | 7 |
| **Filtros HEPA y recambios** | entorno | acaros, mascota, hongos | adulto, familiar | 6 |
| **Fundas antiácaros colchón/almohada** | nocturno, nasal, entorno | acaros | adulto, pediatrico, familiar | 9 |
| **Protectores de sofá y textiles** | entorno | acaros, mascota | adulto, familiar | 6 |
| **Robots aspiradores alérgicos** | entorno | acaros, mascota | adulto, familiar | 6 |
| **Sprays antiácaros neutralizadores** | entorno | acaros | adulto, pediatrico, familiar | 7 |
| **Accesorios limpieza antiácaros** | entorno | acaros | adulto, familiar | 5 |
| **Deshumidificadores** | entorno, nasal | acaros, hongos | adulto, familiar | 8 |
| **Humidificadores** | nasal, bronquial | voc, desconocido | adulto, pediatrico, familiar | 5 |
| **Higrómetros (medidores humedad)** | entorno | desconocido | adulto, familiar | 4 |
| **Medidores calidad del aire** | entorno, bronquial | voc, desconocido | adulto, familiar | 5 |
| **Estaciones ambientales domésticas** | entorno | desconocido | adulto, familiar | 4 |
| **Sensores inteligentes de alérgenos** | entorno | desconocido | adulto, familiar | 4 |
| **Absorbedores de olores** | nasal, bronquial | voc | adulto | 6 |
| **Purificadores específicos VOCs** | bronquial, nasal | voc | adulto | 8 |
| **Sistemas ventilación con filtración** | bronquial, entorno | voc, acaros, hongos | adulto | 7 |
| **Vaporetas / limpieza vapor** | entorno | acaros | adulto | 6 |
| **Ionizadores** | entorno | desconocido | adulto | 3 |
| **Carbón activo / filtros especiales** | entorno | voc | adulto | 5 |
| **Tiras nasales adultos** | nocturno, nasal | acaros, desconocido | adulto | 7 |
| **Tiras nasales pediátricas** | nocturno, nasal | acaros, desconocido | pediatrico_principal | 8 |
| **Dilatadores nasales internos** | nocturno | desconocido | adulto | 5 |
| **Dispositivos avance mandibular** | nocturno | desconocido | adulto | 5 |
| **Cintas sujeción mandibular** | nocturno | desconocido | adulto | 4 |
| **Bandas sellado labial (mouth tape)** | nocturno | desconocido | adulto | 4 |
| **Soluciones tos nocturna** | nocturno, bronquial | acaros, desconocido | adulto, pediatrico | 6 |
| **Cámaras espaciadoras adultos** | bronquial | desconocido | adulto + usa:inhalador | 10 |
| **Cámaras espaciadoras pediátricas** | bronquial | desconocido | pediatrico + usa:inhalador | 10 |
| **Crema calmante para el picor** | piel | desconocido | adulto, pediatrico | 8 |
| **Spray calmante sin perfume** | piel, nasal | desconocido | adulto, pediatrico | 7 |
| **Irrigadores nasales** | nasal | acaros, polen, desconocido | adulto, pediatrico | 8 |
| **Difusores soluciones respiratorias** | bronquial, nasal | desconocido | adulto | 4 |

---

### 3.2 Modificadores contextuales

Los triggers base se ajustan con los siguientes modificadores multiplicativos:

| Condición detectada | Subcategoría afectada | Modificador |
|---|---|---|
| `mascota:gato` o `mascota:perro` | Purificadores de aire | ×1.4 |
| `mascota:ambos` | Purificadores de aire | ×1.6 |
| `mascota:cualquiera` | Aspiradores HEPA, Protectores sofá | ×1.3 |
| `humedad:alta` | Deshumidificadores | ×1.6 |
| `humedad:alta` | Humidificadores | ×0.2 (excluir) |
| `humedad:baja` | Humidificadores | ×1.4 |
| `humedad:baja` | Deshumidificadores | ×0.2 (excluir) |
| `usa:inhalador` | Cámaras espaciadoras | ×2.0 (prioritario absoluto) |
| `usa:purificador` | Filtros HEPA y recambios | ×1.8 |
| `usa:purificador` | Purificadores de aire | ×0.4 (ya tienen) |
| `usa:irrigador` | Irrigadores nasales | ×0.5 (ya tienen) |
| `alergeno:voc` | Ionizadores | ×0.3 (contraindicado — generan ozono) |
| `perfil:pediatrico_principal` | Tiras nasales pediátricas | ×1.5 |
| `perfil:pediatrico_principal` | Cámaras espaciadoras pediátricas | ×1.5 |

> **Nota clínica sobre ionizadores:** Los ionizadores generan ozono como subproducto, lo que puede agravar la hiperreactividad bronquial. Si el perfil incluye `sintoma:bronquial` o `alergeno:voc`, el score de ionizadores se reduce a 0 y se excluyen de la recomendación.

---

## 4. Motor de matching — algoritmo de scoring

### 4.1 Cálculo del score por subcategoría

```
score_final(S) = score_base(S)
              × match_sintoma(S, respuestas)
              × match_alergeno(S, respuestas)
              × match_perfil(S, respuestas)
              × Π modificadores_activos(S)
```

Donde:
- **match_sintoma** = 1.0 si algún trigger de síntoma coincide; 0.5 si ninguno coincide pero el score base es ≥ 7; 0.0 si score base < 5 y no hay coincidencia
- **match_alergeno** = 1.0 si coincide; 0.8 si el alérgeno es `desconocido` (no penalizar la incertidumbre); 0.6 si no coincide pero el trigger cubre `desconocido`
- **match_perfil** = 1.0 si perfil coincide; 0.0 si es un producto pediátrico para perfil adulto o viceversa (exclusión dura)

### 4.2 Umbral de presentación

Solo se muestran subcategorías con **score_final ≥ 4.0**. El resultado se presenta en tres bloques:

| Bloque | Criterio | Máx. subcategorías |
|---|---|---|
| **Prioritario** (imprescindible) | score ≥ 8.0 | 3 |
| **Complementario** (muy recomendable) | score 6.0–7.9 | 4 |
| **Para explorar** (opcional) | score 4.0–5.9 | 3 |

---

## 5. Perfiles de ejemplo y resultados esperados

### Perfil A — Asmática adulta con gato

**Respuestas:** `sintoma:bronquial`, `alergeno:mascota`, `perfil:adulto`, `mascota:gato`, `usa:inhalador`, `humedad:normal`

| Bloque | Subcategoría | Score |
|---|---|---|
| ⭐ Prioritario | Cámaras espaciadoras adultos | 10.0 (×2.0 por usa:inhalador) |
| ⭐ Prioritario | Purificadores de aire | 8×1.0×1.0×1.4 = **11.2** → cap 10 |
| ⭐ Prioritario | Purificadores específicos VOCs | 8.0 |
| ✅ Complementario | Aspiradores con filtro HEPA | 7×1.3 = 9.1 |
| ✅ Complementario | Protectores de sofá y textiles | 6×1.3 = 7.8 |
| ✅ Complementario | Sistemas ventilación filtración | 7.0 |
| 🔵 Para explorar | Absorbedores de olores | 6.0 |

---

### Perfil B — Niño de 7 años con rinitis por ácaros, sin inhalador

**Respuestas:** `sintoma:nasal`, `alergeno:acaros`, `perfil:pediatrico_principal`, `mascota:no`, `usa:nada`, `humedad:alta`

| Bloque | Subcategoría | Score |
|---|---|---|
| ⭐ Prioritario | Fundas antiácaros colchón/almohada | 9.0 |
| ⭐ Prioritario | Deshumidificadores | 8×1.6 = **12.8** → cap 10 |
| ⭐ Prioritario | Irrigadores nasales | 8.0 |
| ✅ Complementario | Purificadores de aire | 8.0 |
| ✅ Complementario | Sprays antiácaros neutralizadores | 7.0 |
| ✅ Complementario | Tiras nasales pediátricas | 7×1.5 = 10.5 → cap 10 |
| 🔵 Para explorar | Accesorios limpieza antiácaros | 5.0 |
| 🔵 Para explorar | Vaporetas / limpieza vapor | 6.0 |

---

### Perfil C — Adulto con dermatitis, sin identificar alérgeno

**Respuestas:** `sintoma:piel`, `alergeno:desconocido`, `perfil:adulto`, `mascota:no`, `usa:nada`, *(P6 no aplica)*

| Bloque | Subcategoría | Score |
|---|---|---|
| ⭐ Prioritario | Crema calmante para el picor | 8×1.0×0.8 = 6.4 |
| ⭐ Prioritario | Spray calmante sin perfume | 7×1.0×0.8 = 5.6 |
| ✅ Complementario | Purificadores de aire | 8×0.5×0.8 = 3.2 → bajo umbral |
| 🔵 Para explorar | Medidores calidad del aire | 5×0.8 = 4.0 |

> Este perfil tiene pocas coincidencias directas. La UX debe ofrecer aquí el CTA a consulta con especialista con especial énfasis.

---

### Perfil D — Adulto que ya tiene purificador, quiere optimizar entorno

**Respuestas:** `sintoma:entorno`, `alergeno:acaros`, `perfil:adulto`, `mascota:no`, `usa:purificador`, `humedad:normal`

| Bloque | Subcategoría | Score |
|---|---|---|
| ⭐ Prioritario | Filtros HEPA y recambios | 6×1.8 = **10.8** → cap 10 |
| ⭐ Prioritario | Fundas antiácaros colchón/almohada | 9.0 |
| ⭐ Prioritario | Aspiradores con filtro HEPA | 7.0 |
| ✅ Complementario | Accesorios limpieza antiácaros | 5.0 |
| ✅ Complementario | Sprays antiácaros neutralizadores | 7.0 |
| ✅ Complementario | Vaporetas / limpieza vapor | 6.0 |
| 🔵 Para explorar | Medidores calidad del aire | 5.0 |
| 🔵 Para explorar | Robots aspiradores alérgicos | 6.0 |

---

## 6. Notas clínicas para la curación del catálogo

### 6.1 Contraindicaciones a implementar como exclusiones duras

- **Ionizadores + asma / bronquial**: excluir siempre. El ozono generado por ionización es broncoconstrictor.
- **Humidificadores + humedad:alta**: excluir siempre. Aumenta proliferación de hongos y ácaros.
- **Deshumidificadores + humedad:baja**: excluir siempre.
- **Difusores de aceites esenciales + bronquial**: excluir o marcar con advertencia. Los aceites esenciales son irritantes en vías aéreas sensibles.

### 6.2 Productos sin categoría asignada — acción requerida

Los 3 irrigadores nasales sin categoría (`Irigaston Set`, `NeilMed Sinus Rinse`, `Rhinodouche`) deben incorporarse a una nueva subcategoría **"Irrigadores nasales y lavado nasal"** dentro de la categoría **"Cuidado nasal y respiratorio"** para que el recomendador pueda activarlos.

### 6.3 Preguntas de segundo nivel (futuro)

Una vez el usuario acepta un perfil, se le pueden hacer 2-3 preguntas específicas de subcategoría usando los **criterios de valoración** ya definidos en la hoja `05` del Excel:

- Para purificadores: *"¿Para qué tamaño de habitación?"* → filtra por CADR
- Para aspiradores: *"¿Tienes alfombras o moqueta?"* → prioriza modelos con accesorio específico
- Para cámaras espaciadoras: *"¿Qué inhalador usas?"* → filtra por compatibilidad (criterio nº1 definido en la hoja 05)

---

## 7. Integración UX en la landing

### 7.1 Punto de entrada en la landing actual

El botón **"No sé qué necesito → ¿Cuál me conviene?"** ya está implementado en el hero y en las cards de categoría. Ambos deben llevar a la misma URL: `/perfilado` (o `#perfilado` en el prototipo estático).

### 7.2 Flujo de pantallas

```
Pregunta 1 (síntoma)
  → Pregunta 2 (patrón temporal / alérgeno)
    → Pregunta 3 (niños)
      → Pregunta 4 (mascotas)
        → Pregunta 5 (qué ya tienes)
          → [condicional] Pregunta 6 (humedad) — solo si P2 = ácaros / hongos
            → Resultado: 3 bloques de recomendación
              → CTA: "Unirme al Club para ver precios" + "Hablar con un especialista"
```

### 7.3 Presentación del resultado

Cada subcategoría recomendada se muestra como una **tarjeta** con:
- Nombre de la subcategoría
- Por qué te lo recomendamos *(texto generado a partir de las respuestas, no genérico)*
- Número de productos disponibles
- Botón "Ver productos" → enlaza al listado de esa subcategoría en Shopify

El bloque **Prioritario** se muestra siempre expandido. Los bloques **Complementario** y **Para explorar** pueden estar colapsados por defecto en móvil.

### 7.4 CTA de consulta médica

Si el score máximo de todas las subcategorías es < 5.0 (perfil poco definido), o si `sintoma:bronquial` está activo y `usa:inhalador` = false, se muestra un CTA prominente:

> *"Tu perfil sugiere que puede ser útil hablar con un especialista antes de elegir. Reserva una videollamada de 15 minutos."*

---

## 8. Estructura de datos para implementación

```json
// Ejemplo de respuesta de encuesta serializada
{
  "sintoma": "bronquial",
  "alergeno": "mascota",
  "perfil": "adulto",
  "mascota": "gato",
  "usa": ["inhalador"],
  "humedad": "normal"
}

// Ejemplo de entrada de subcategoría en el catálogo
{
  "id": "camaras-espaciadoras-adultos",
  "nombre": "Cámaras espaciadoras para adultos",
  "score_base": 10,
  "triggers_sintoma": ["bronquial"],
  "triggers_alergeno": ["*"],
  "triggers_perfil": ["adulto"],
  "modificadores": [
    { "condicion": "usa:inhalador", "factor": 2.0 },
    { "condicion": "perfil:pediatrico_principal", "factor": 0.0 }
  ],
  "url_shopify": "/collections/camaras-espaciadoras-adultos",
  "contraindicaciones": []
}
```

---

*Documento generado para uso interno de Mundo Alergia. Revisión clínica recomendada antes de publicación.*
