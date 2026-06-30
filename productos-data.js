// ─────────────────────────────────────────────────────────────────────────────
// MUNDO ALERGIA — Catálogo de productos (MVP estático)
//
// MIGRACIÓN SHOPIFY / NEXT.JS
// ─────────────────────────────────────────────────────────────────────────────
// Este archivo es el equivalente estático de la Storefront API de Shopify.
//
// En producción, este objeto se obtiene así:
//   const { data } = await shopifyClient.request(COLLECTION_QUERY, {
//     variables: { handle: "nasal-respiratorio" }
//   });
//
// Mapeo de conceptos:
//   categoria.slug         → collection.handle  (URL: /collections/[handle])
//   subcategoria.slug      → product.productType  o  tag en Shopify
//   producto.id            → product.handle
//   producto.precio        → product.priceRange.minVariantPrice.amount
//   producto.precio_club   → variant con tag "club" o metafield custom
//   producto.imagen        → product.images.edges[0].node.url
//   producto.disponible    → product.availableForSale
//   producto.specs         → product.metafields (namespace: "specs")
//
// En Next.js (App Router):
//   → app/collections/[handle]/page.jsx
//   → getStaticPaths genera los handles de todas las colecciones
//   → getStaticProps (o fetch en server component) obtiene productos de Shopify
//
// ─────────────────────────────────────────────────────────────────────────────

const PRODUCTOS_DATA = {

  // ── CATEGORÍAS ─────────────────────────────────────────────────────────────
  // slug: coincide con el parámetro ?cat= de la URL
  // En Shopify: collection.handle

  categorias: {
    "nasal-respiratorio": {
      slug:        "nasal-respiratorio",
      titulo:      "Cuidado nasal y respiratorio",
      descripcion: "Irrigadores nasales, cámaras espaciadoras y ayudas para la respiración nocturna. Todo lo que tu sistema respiratorio necesita cada día.",
      eyebrow:     "01 — Categoría",
      imagen:      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=80",
      subcategorias: ["irrigadores-nasales", "camaras-espaciadoras-adultos", "camaras-espaciadoras-pediatricas", "tiras-nasales", "dilatadores-nasales"]
    },
    "noche-segura": {
      slug:        "noche-segura",
      titulo:      "Noche segura",
      descripcion: "Fundas antiácaros, sprays neutralizadores y soluciones para la tos nocturna. Para que las 8 horas de sueño no sean las de mayor exposición.",
      eyebrow:     "02 — Categoría",
      imagen:      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
      subcategorias: ["fundas-antiacaros", "sprays-antiacaros", "soluciones-tos-nocturna", "dispositivos-respiracion-nocturna"]
    },
    "hogar-sin-alergeno": {
      slug:        "hogar-sin-alergeno",
      titulo:      "Hogar sin alérgeno",
      descripcion: "Purificadores HEPA, aspiradores certificados, deshumidificadores y monitores de calidad del aire. Tu casa como aliada, no como enemiga.",
      eyebrow:     "03 — Categoría",
      imagen:      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80",
      subcategorias: ["purificadores-hepa", "aspiradores-hepa", "deshumidificadores", "medidores-calidad-aire"]
    }
  },

  // ── SUBCATEGORÍAS ──────────────────────────────────────────────────────────
  // En Shopify: product.productType  o  collection anidada
  // En Next.js: filtro por productType en la query de Storefront API

  subcategorias: {
    "irrigadores-nasales":               { titulo: "Irrigadores nasales",              categoria: "nasal-respiratorio" },
    "camaras-espaciadoras-adultos":      { titulo: "Cámaras espaciadoras adultos",     categoria: "nasal-respiratorio" },
    "camaras-espaciadoras-pediatricas":  { titulo: "Cámaras esp. pediátricas",        categoria: "nasal-respiratorio" },
    "tiras-nasales":                     { titulo: "Tiras nasales",                    categoria: "nasal-respiratorio" },
    "dilatadores-nasales":               { titulo: "Dilatadores nasales",              categoria: "nasal-respiratorio" },
    "fundas-antiacaros":                 { titulo: "Fundas antiácaros",               categoria: "noche-segura" },
    "sprays-antiacaros":                 { titulo: "Sprays antiácaros",               categoria: "noche-segura" },
    "soluciones-tos-nocturna":           { titulo: "Soluciones tos nocturna",          categoria: "noche-segura" },
    "dispositivos-respiracion-nocturna": { titulo: "Respiración nocturna",             categoria: "noche-segura" },
    "purificadores-hepa":                { titulo: "Purificadores HEPA",               categoria: "hogar-sin-alergeno" },
    "aspiradores-hepa":                  { titulo: "Aspiradores HEPA",                 categoria: "hogar-sin-alergeno" },
    "deshumidificadores":                { titulo: "Deshumidificadores",               categoria: "hogar-sin-alergeno" },
    "medidores-calidad-aire":            { titulo: "Medidores calidad del aire",       categoria: "hogar-sin-alergeno" }
  },

  // ── PRODUCTOS ──────────────────────────────────────────────────────────────
  // En Shopify: product node de Storefront API
  // En Next.js: renderizado con <ProductCard> component

  productos: [

    // ━━ NASAL Y RESPIRATORIO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    {
      id:            "neilmed-sinus-rinse",
      nombre:        "NeilMed Sinus Rinse Kit",
      marca:         "NeilMed",
      descripcion:   "Kit completo de lavado nasal con botella flexible de 240 ml y 50 sobres de solución isotónica. El sistema más recomendado por alergólogos para rinitis alérgica.",
      categoria:     "nasal-respiratorio",
      subcategoria:  "irrigadores-nasales",
      precio:        14.90,
      precio_club:   12.90,
      disponible:    false,
      destacado:     true,
      imagen:        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80",
      specs: {
        "Volumen":         "240 ml",
        "Solución":        "Isotónica",
        "Sobres incluidos":"50",
        "Indicado para":   "Rinitis, sinusitis, posoperatorio nasal"
      },
      etiquetas: ["rinitis", "acaros", "polen", "adultos", "pediatrico"]
    },
    {
      id:            "rhinodouche-500",
      nombre:        "Rhinodouche Irrigador Nasal 500 ml",
      marca:         "Rhinodouche",
      descripcion:   "Irrigador nasal de gran capacidad con flujo continuo y suave. Depósito de 500 ml para lavados más completos. Apto para adultos y niños mayores de 6 años.",
      categoria:     "nasal-respiratorio",
      subcategoria:  "irrigadores-nasales",
      precio:        18.50,
      precio_club:   15.90,
      disponible:    false,
      destacado:     false,
      imagen:        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80",
      specs: {
        "Volumen":       "500 ml",
        "Flujo":         "Continuo ajustable",
        "Edad mínima":   "6 años",
        "Material":      "Sin BPA"
      },
      etiquetas: ["rinitis", "acaros", "polo", "adultos"]
    },
    {
      id:            "aerochamber-plus-adultos",
      nombre:        "AeroChamber Plus Flow-Vu Adultos",
      marca:         "Trudell Medical",
      descripcion:   "Cámara espaciadora de referencia para inhaladores MDI. Válvula Flow-Vu para verificar visualmente que la inhalación es correcta. Compatible con la mayoría de inhaladores del mercado.",
      categoria:     "nasal-respiratorio",
      subcategoria:  "camaras-espaciadoras-adultos",
      precio:        24.90,
      precio_club:   21.90,
      disponible:    false,
      destacado:     true,
      imagen:        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",
      specs: {
        "Compatibilidad":  "MDI estándar",
        "Válvula":         "Flow-Vu (indicador visual)",
        "Volumen cámara":  "149 ml",
        "Certificación":   "CE Clase IIa"
      },
      etiquetas: ["asma", "adultos", "inhalador"]
    },
    {
      id:            "aerochamber-plus-pediatrico",
      nombre:        "AeroChamber Plus Flow-Vu Pediátrico con Mascarilla",
      marca:         "Trudell Medical",
      descripcion:   "Versión pediátrica con mascarilla de silicona suave para niños de 1 a 5 años. Garantiza que el medicamento llega al pulmón aunque el niño no sepa inhalar correctamente.",
      categoria:     "nasal-respiratorio",
      subcategoria:  "camaras-espaciadoras-pediatricas",
      precio:        26.90,
      precio_club:   23.90,
      disponible:    false,
      destacado:     false,
      imagen:        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",
      specs: {
        "Edad":           "1–5 años",
        "Mascarilla":     "Silicona suave",
        "Compatibilidad": "MDI estándar",
        "Certificación":  "CE Clase IIa"
      },
      etiquetas: ["asma", "pediatrico", "inhalador"]
    },
    {
      id:            "breathe-right-extra",
      nombre:        "Breathe Right Extra Tiras Nasales (x30)",
      marca:         "Breathe Right",
      descripcion:   "Tiras nasales de fuerza extra para adultos. Ensanchan mecánicamente el pasaje nasal mejorando la respiración nocturna sin medicación. Ideales en época de pólenes o cuando hay congestión.",
      categoria:     "nasal-respiratorio",
      subcategoria:  "tiras-nasales",
      precio:        12.50,
      precio_club:   10.90,
      disponible:    false,
      destacado:     false,
      imagen:        "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=80",
      specs: {
        "Unidades":     "30",
        "Fuerza":       "Extra",
        "Uso":          "Nocturno",
        "Sin medicación":"Sí"
      },
      etiquetas: ["nasal", "nocturno", "adultos", "acaros", "polo"]
    },
    {
      id:            "mute-dilatador",
      nombre:        "Mute Dilatador Nasal Interno",
      marca:         "Rhinomed",
      descripcion:   "Dilatador nasal interno de silicona suave. Se coloca dentro de la nariz y la mantiene abierta durante el sueño. Alternativa a las tiras nasales para quienes tienen la piel sensible.",
      categoria:     "nasal-respiratorio",
      subcategoria:  "dilatadores-nasales",
      precio:        22.90,
      precio_club:   19.90,
      disponible:    false,
      destacado:     false,
      imagen:        "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=80",
      specs: {
        "Material":        "Silicona médica",
        "Tallas":          "S / M / L",
        "Reutilizable":    "Sí",
        "Duración aprox.": "30 noches"
      },
      etiquetas: ["nasal", "nocturno", "adultos"]
    },

    // ━━ NOCHE SEGURA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    {
      id:            "allergika-funda-colchon-90",
      nombre:        "Funda Antiácaros Colchón 90 × 200 cm",
      marca:         "Allergika",
      descripcion:   "Funda antiácaros de tejido microporo de alta densidad. Certificación ECARF y Oeko-Tex 100. Barrera física que impide el contacto con los ácaros mientras duermes. Lavable a 60 °C.",
      categoria:     "noche-segura",
      subcategoria:  "fundas-antiacaros",
      precio:        45.90,
      precio_club:   39.90,
      disponible:    false,
      destacado:     true,
      imagen:        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
      specs: {
        "Medidas":         "90 × 200 cm",
        "Cierre":          "Cremallera protegida",
        "Lavado":          "Hasta 60 °C",
        "Certificaciones": "ECARF, Oeko-Tex 100"
      },
      etiquetas: ["acaros", "nocturno", "adultos", "pediatrico"]
    },
    {
      id:            "allergika-funda-colchon-135",
      nombre:        "Funda Antiácaros Colchón 135 × 190 cm",
      marca:         "Allergika",
      descripcion:   "La misma barrera antiácaros de tejido microporo, en talla matrimonial. Combínala con las fundas de almohada para una protección completa del dormitorio.",
      categoria:     "noche-segura",
      subcategoria:  "fundas-antiacaros",
      precio:        58.90,
      precio_club:   50.90,
      disponible:    false,
      destacado:     false,
      imagen:        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
      specs: {
        "Medidas":         "135 × 190 cm",
        "Cierre":          "Cremallera protegida",
        "Lavado":          "Hasta 60 °C",
        "Certificaciones": "ECARF, Oeko-Tex 100"
      },
      etiquetas: ["acaros", "nocturno", "adultos"]
    },
    {
      id:            "allergika-funda-almohada",
      nombre:        "Funda Antiácaros Almohada 50 × 70 cm",
      marca:         "Allergika",
      descripcion:   "Funda de almohada con barrera antiácaros. Esencial como complemento a la funda de colchón: la almohada es el punto de mayor exposición durante el sueño.",
      categoria:     "noche-segura",
      subcategoria:  "fundas-antiacaros",
      precio:        19.90,
      precio_club:   16.90,
      disponible:    false,
      destacado:     false,
      imagen:        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
      specs: {
        "Medidas":         "50 × 70 cm",
        "Cierre":          "Cremallera",
        "Lavado":          "Hasta 60 °C",
        "Certificaciones": "ECARF"
      },
      etiquetas: ["acaros", "nocturno", "adultos", "pediatrico"]
    },
    {
      id:            "acaril-spray-250",
      nombre:        "Acaril Spray Antiácaros 250 ml",
      marca:         "Acaril",
      descripcion:   "Spray acaricida para textiles que no se pueden lavar a alta temperatura: sofás, moqueta, cortinas, colchón de muelles. Acción inmediata y residual de hasta 3 meses.",
      categoria:     "noche-segura",
      subcategoria:  "sprays-antiacaros",
      precio:        16.90,
      precio_club:   14.50,
      disponible:    false,
      destacado:     true,
      imagen:        "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80",
      specs: {
        "Volumen":         "250 ml",
        "Acción residual": "Hasta 3 meses",
        "Superficie":      "Textiles no lavables",
        "Sin perfume":     "Sí"
      },
      etiquetas: ["acaros", "entorno", "adultos", "pediatrico"]
    },
    {
      id:            "puressentiel-spray-acaricida",
      nombre:        "Puressentiel Spray Acaricida Textil 150 ml",
      marca:         "Puressentiel",
      descripcion:   "Spray antiácaros de fórmula natural a base de aceites esenciales. Sin pesticidas. Apto para habitaciones infantiles. Eficaz sobre tejidos, colchones y almohadas.",
      categoria:     "noche-segura",
      subcategoria:  "sprays-antiacaros",
      precio:        18.90,
      precio_club:   16.50,
      disponible:    false,
      destacado:     false,
      imagen:        "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80",
      specs: {
        "Volumen":     "150 ml",
        "Fórmula":     "Aceites esenciales, sin pesticidas",
        "Indicado":    "Habitaciones infantiles",
        "Sin perfume": "No (aroma suave)"
      },
      etiquetas: ["acaros", "entorno", "pediatrico"]
    },
    {
      id:            "phytosun-tos-nocturna",
      nombre:        "Phytosun Arôms Solución Tos Nocturna 15 ml",
      marca:         "Phytosun",
      descripcion:   "Mezcla de aceites esenciales para difusor diseñada para calmar la tos seca nocturna. Ayuda a mantener las vías respiratorias despejadas durante el sueño.",
      categoria:     "noche-segura",
      subcategoria:  "soluciones-tos-nocturna",
      precio:        12.90,
      precio_club:   10.90,
      disponible:    false,
      destacado:     false,
      imagen:        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80",
      specs: {
        "Volumen":    "15 ml",
        "Uso":        "Difusor ultrasónico",
        "Indicado":   "Tos seca nocturna",
        "Edad mínima":"3 años"
      },
      etiquetas: ["nocturno", "asma", "adultos"]
    },

    // ━━ HOGAR SIN ALÉRGENO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    {
      id:            "xiaomi-purifier-4",
      nombre:        "Xiaomi Smart Air Purifier 4",
      marca:         "Xiaomi",
      descripcion:   "Purificador con filtro H13 HEPA + carbón activo. CADR 400 m³/h. Adecuado para habitaciones de hasta 48 m². Control por app y sensor de partículas PM2.5 en tiempo real.",
      categoria:     "hogar-sin-alergeno",
      subcategoria:  "purificadores-hepa",
      precio:        129.90,
      precio_club:   114.90,
      disponible:    false,
      destacado:     true,
      imagen:        "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
      specs: {
        "Filtro":         "H13 HEPA + carbón activo",
        "CADR":           "400 m³/h",
        "Cobertura":      "Hasta 48 m²",
        "Certificación":  "AHAM, CE",
        "Conectividad":   "Wi-Fi + app"
      },
      etiquetas: ["acaros", "mascota", "polo", "voc", "adultos", "pediatrico"]
    },
    {
      id:            "winix-zero-pro",
      nombre:        "Winix Zero Pro",
      marca:         "Winix",
      descripcion:   "Purificador de aire con filtro H14 HEPA y tecnología PlasmaWave. CADR 281 m³/h. Recomendado para alérgicos severos o con mascotas. Certificado Allergy UK.",
      categoria:     "hogar-sin-alergeno",
      subcategoria:  "purificadores-hepa",
      precio:        349.90,
      precio_club:   309.90,
      disponible:    false,
      destacado:     false,
      imagen:        "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
      specs: {
        "Filtro":        "H14 HEPA + carbón activo",
        "CADR":          "281 m³/h",
        "Cobertura":     "Hasta 99 m²",
        "Certificación": "Allergy UK, CE"
      },
      etiquetas: ["acaros", "mascota", "voc", "adultos"]
    },
    {
      id:            "miele-classic-c1",
      nombre:        "Miele Classic C1 EcoLine",
      marca:         "Miele",
      descripcion:   "Aspirador de trineo con filtro AirClean F/J/E y filtro de escape HEPA 13 incluido. Emisión casi nula de partículas al ambiente. Especialmente indicado para alérgicos.",
      categoria:     "hogar-sin-alergeno",
      subcategoria:  "aspiradores-hepa",
      precio:        249.90,
      precio_club:   224.90,
      disponible:    false,
      destacado:     true,
      imagen:        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      specs: {
        "Filtro escape":   "HEPA 13",
        "Potencia":        "890 W",
        "Capacidad bolsa": "4,5 L",
        "Certificación":   "Allergy UK"
      },
      etiquetas: ["acaros", "mascota", "entorno", "adultos"]
    },
    {
      id:            "airthings-wave-mini",
      nombre:        "Airthings Wave Mini",
      marca:         "Airthings",
      descripcion:   "Monitor de calidad del aire para el hogar. Mide CO₂, temperatura, humedad y TVOCs. Alerta en tiempo real vía app cuando los niveles son desfavorables para alérgicos.",
      categoria:     "hogar-sin-alergeno",
      subcategoria:  "medidores-calidad-aire",
      precio:        79.90,
      precio_club:   69.90,
      disponible:    false,
      destacado:     false,
      imagen:        "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&q=80",
      specs: {
        "Sensores":       "CO₂, TVOCs, Tª, HR",
        "Conectividad":   "Bluetooth + app",
        "Batería":        "2 pilas AA (~16 meses)",
        "Cobertura":      "Un ambiente"
      },
      etiquetas: ["voc", "entorno", "adultos"]
    },
    {
      id:            "inventor-aria-10",
      nombre:        "Inventor Aria 10 L/día",
      marca:         "Inventor",
      descripcion:   "Deshumidificador de 10 litros/día para estancias de hasta 30 m². Reduce la humedad relativa para inhibir la proliferación de ácaros y hongos. Con humidistato integrado.",
      categoria:     "hogar-sin-alergeno",
      subcategoria:  "deshumidificadores",
      precio:        189.90,
      precio_club:   169.90,
      disponible:    false,
      destacado:     false,
      imagen:        "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
      specs: {
        "Capacidad":      "10 L/día",
        "Cobertura":      "Hasta 30 m²",
        "Depósito":       "2,5 L",
        "Humidistato":    "Integrado"
      },
      etiquetas: ["acaros", "hongos", "entorno", "adultos"]
    },
    {
      id:            "philips-ac0820",
      nombre:        "Philips AC0820/10 Purificador Compacto",
      marca:         "Philips",
      descripcion:   "Purificador de formato compacto con filtro HEPA integrado. Ideal para el dormitorio o despacho. CADR 190 m³/h. Modo automático que ajusta la velocidad según la calidad del aire.",
      categoria:     "hogar-sin-alergeno",
      subcategoria:  "purificadores-hepa",
      precio:        89.90,
      precio_club:   79.90,
      disponible:    false,
      destacado:     false,
      imagen:        "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
      specs: {
        "Filtro":        "HEPA integrado",
        "CADR":          "190 m³/h",
        "Cobertura":     "Hasta 23 m²",
        "Modo auto":     "Sí (sensor PM2.5)"
      },
      etiquetas: ["acaros", "mascota", "polo", "adultos", "pediatrico"]
    }

  ] // fin productos

}; // fin PRODUCTOS_DATA
