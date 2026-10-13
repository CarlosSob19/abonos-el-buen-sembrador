---
name: Abonos El Buen Sembrador
description: Insumos agrícolas con biotecnología, hechos en Antioquia desde 2013; la página se lee como un perfil de suelo.
colors:
  forest: "#173f32"
  forest-deep: "#0f2c23"
  field: "#367b4b"
  leaf: "#e8f0e6"
  paper: "#fafaf6"
  sand: "#ede6d8"
  humus: "#2e2219"
  ink: "#26312c"
  ink-soft: "#4a5650"
  seed: "#e8892a"
  seed-deep: "#c96f14"
  seed-hover: "#f09a40"
  on-seed: "#1e140c"
  on-dark: "#f3eee3"
  on-dark-soft: "#cfc6b4"
  cream-highlight: "#fff8ec"
  rule: "#26312c26"
  rule-dark: "#f3eee326"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 1.2rem + 3.6vw, 4.75rem)"
    fontWeight: 340
    lineHeight: 0.98
    letterSpacing: "-0.038em"
  headline:
    fontFamily: "Bricolage Grotesque, Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.35rem + 2.5vw, 3.5rem)"
    fontWeight: 380
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Bricolage Grotesque, Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1.2rem + 1.1vw, 2.25rem)"
    fontWeight: 420
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  lead:
    fontFamily: "Hanken Grotesk, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.125rem, 1.02rem + 0.45vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Hanken Grotesk, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Hanken Grotesk, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.2
rounded:
  anchor: "4px"
  drawer: "28px"
  plate: "clamp(24px, 1rem + 2vw, 44px)"
  pill: "999px"
spacing:
  gutter: "clamp(1rem, 0.4rem + 3vw, 3rem)"
  section: "clamp(4.5rem, 3rem + 6vw, 9rem)"
  max: "1280px"
  header: "76px"
components:
  button-seed:
    backgroundColor: "{colors.seed}"
    textColor: "{colors.on-seed}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.4rem"
    height: "48px"
  button-seed-hover:
    backgroundColor: "{colors.seed-hover}"
  button-forest:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.4rem"
    height: "48px"
  button-forest-hover:
    backgroundColor: "{colors.field}"
  button-line:
    textColor: "{colors.forest}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.4rem"
    height: "48px"
  button-line-hover:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.paper}"
  button-ghost-light:
    textColor: "{colors.on-dark}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.4rem"
    height: "48px"
  button-ghost-light-hover:
    backgroundColor: "{colors.on-dark}"
    textColor: "{colors.forest}"
  chip:
    textColor: "{colors.forest}"
    rounded: "{rounded.pill}"
    padding: "0.4rem 1rem"
    height: "40px"
  chip-hover:
    backgroundColor: "{colors.leaf}"
  nav-link-active:
    backgroundColor: "{colors.leaf}"
    textColor: "{colors.forest}"
    rounded: "{rounded.pill}"
    padding: "0.55rem 0.8rem"
  product-plate:
    backgroundColor: "{colors.sand}"
    rounded: "{rounded.plate}"
    padding: "clamp(1.5rem, 4vw, 3.5rem)"
  needs-panel:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.plate}"
    padding: "clamp(1.75rem, 4vw, 3rem)"
  mobile-menu:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.on-dark}"
---

# Design System: Abonos El Buen Sembrador

## Overview

**Creative North Star: "El perfil del suelo"**

La página se recorre de arriba hacia abajo como un corte de tierra: cielo claro y plántula en la superficie (papel cálido y verde bosque), arena donde el agricultor decide (necesidades del cultivo), humus oscuro donde vive la ciencia (proceso de compostaje) y bosque profundo al cierre (contacto y pie). El color no decora tarjetas: ocupa regiones completas, y cada cambio de región es un cambio de estrato.

Es un sistema editorial y sereno, de densidad media, hecho con pocas piezas: láminas fotográficas de esquinas grandes, filetes finos en lugar de cajas, una display ligera y apretada, y un solo gesto propio tomado del logotipo: la semilla naranja que la mano siembra. Esa semilla es el único lugar donde el naranja aparece fuera de la acción principal. Rechaza explícitamente la plantilla agro de banner verde sobre una cuadrícula de tarjetas de producto idénticas.

El movimiento es breve y con intención: las semillas caen y se asientan en la foto del héroe al cargar, los bloques se revelan una vez al entrar en pantalla, y todo se reduce a fundidos de opacidad cuando el usuario pide menos movimiento.

**Key Characteristics:**
- Regiones de color completas (papel, arena, humus, bosque) en lugar de tarjetas.
- Láminas fotográficas con radio grande y fluido (24 a 44 px).
- Filetes finos de 1 px como estructura; casi sin sombras.
- Display Bricolage Grotesque ligera (330 a 420) con interletrado negativo.
- La semilla del logotipo como viñeta, marcador de estado y motivo animado.
- Naranja semilla reservado para semillas y la acción principal.

## Colors

Paleta de tierra: verdes de bosque y campo, blancos cálidos, arena y humus, con un único acento naranja tomado de la mano del logotipo.

### Primary
- **Verde Bosque** (forest): color de marca. Títulos display, botón de compra, menú móvil, banda de contacto, selección de texto. Ocupa regiones enteras, no solo detalles.
- **Bosque Profundo** (forest-deep): fondo del pie de página; el estrato más hondo.
- **Verde Campo** (field): verde vivo de apoyo. Hover del botón bosque, categoría de producto, palabra destacada en la declaración de "Nosotros", `accent-color` de formularios y barra de desplazamiento.

### Secondary
- **Naranja Semilla** (seed): el naranja de la mano que siembra. Solo en semillas (puntos, viñetas, marcador de pestaña activa), botón de acción principal, botón de reproducción del video y botón flotante de WhatsApp. Su texto encima siempre es **Tierra Tostada** (on-seed), nunca blanco.
- **Naranja Tostado** (seed-deep): anillo de foco sobre fondos claros (contraste suficiente que el naranja base no da).
- **Naranja Encendido** (seed-hover): hover del botón semilla.

### Tertiary
- **Humus** (humus): fondo de la banda de proceso, base de la foto del héroe mientras carga.
- **Estratos** (rampa del componente Estratos, de arriba abajo #5b4532, #4b3828, #3d2d20, #32251a): cuatro capas de tierra que se oscurecen con la profundidad. Son exclusivas de ese componente.

### Neutral
- **Papel Cálido** (paper): fondo general, panel de necesidades, pastillas de cultivo y leyendas sobre foto, marco de la foto incrustada.
- **Arena** (sand): superficie de decisión. Banda de necesidades y fondo de las láminas de producto.
- **Hoja** (leaf): verde pálido para estados activos y hover suaves (navegación, chips) y la lámina de producto alta.
- **Tinta** (ink): texto corrido principal.
- **Tinta Suave** (ink-soft): párrafos secundarios, leyendas, notas, pestañas inactivas.
- **Crema sobre oscuro** (on-dark), **Crema apagada** (on-dark-soft) y **Crema luz** (cream-highlight): texto sobre bosque y humus; la crema luz es solo para títulos sobre oscuro.
- **Filete** (rule) y **Filete oscuro** (rule-dark): líneas de 1 px al 15 % de tinta o crema.

### Named Rules
**La Regla de la Semilla.** El naranja aparece solo como semilla o como la acción principal de una región. Nunca como fondo de sección, color de texto ni decoración de borde.

**La Regla del Estrato.** El color cambia por regiones completas que bajan en profundidad: papel, arena, humus, bosque, bosque profundo. Una región oscura no se pone encima de una clara más abajo en la página sin razón narrativa.

## Typography

**Display Font:** Bricolage Grotesque (variable 200 a 800, con Hanken Grotesk y system-ui de respaldo)
**Body Font:** Hanken Grotesk (variable 100 a 900, con redonda e itálica; respaldo system-ui, Segoe UI)

**Character:** Una grotesca con carácter, usada ligera y apretada para los titulares, sobre una grotesca de texto limpia y legible al sol. El contraste viene del peso y el tamaño, no de mezclar serif y sans.

### Hierarchy
- **Display** (340, fluida 2.4 a 4.75 rem, interlineado 0.98): solo el titular del héroe. El cierre de contacto usa una variante aún mayor y más ligera (330, hasta 6 rem, -0.04em) como bookend.
- **Headline** (380, fluida 2 a 3.5 rem, 1.04): título de cada sección, con `text-wrap: balance`.
- **Title** (400 a 420, fluida 1.5 a 2.25 rem, 1.08 a 1.12): nombre de producto, producto recomendado, subtítulos de cultivos y tradición. Las capas de estratos y las pestañas usan una variante menor (1.15 a 1.6 rem).
- **Lead** (400, fluida 1.125 a 1.375 rem, 1.5): entradilla del héroe y del contacto, máximo 36 a 46 caracteres por línea.
- **Body** (400, 1.0625 rem, 1.6): texto corrido, máximo 52 a 64 ch.
- **Label** (600, 0.9375 rem): botones, chips, categoría de producto, datos del héroe. Precios en display 450 a 1.75 rem con cifras tabulares.

### Named Rules
**La Regla de la Display Ligera.** Los titulares van entre 330 y 420 de peso con interletrado negativo (-0.015em a -0.04em). Nunca negrita en la display; el peso fuerte (600 a 650) es del texto de acción y los datos.

**La Regla de la Caja Natural.** Sin mayúsculas sostenidas ni versalitas espaciadas: todos los rótulos van en caja de oración.

## Layout

Página única editorial con un contenedor de 1280 px y margen lateral fluido (gutter, 1 a 3 rem). Las secciones respiran con un ritmo vertical fluido (section, 4.5 a 9 rem). Las rejillas son asimétricas de dos columnas en proporción 7/5, 5/7 o 6/6; las filas de producto alternan lado (foto a izquierda o derecha) en vez de formar una cuadrícula. Las bandas de color (necesidades, proceso, contacto, pie) van a sangre completa con el contenido centrado dentro del máximo.

Encabezado pegajoso de 76 px (68 px por debajo de 900 px). Puntos de quiebre observados: 1080 px (la navegación pasa al botón de menú), 900 px (todas las rejillas a una columna, aparece el WhatsApp flotante), 520 px (botones de acción a ancho completo). Las fotos de historia sangran hacia el borde izquierdo de la ventana.

## Elevation & Depth

El sistema es plano: la profundidad la dan los estratos de color y los filetes de 1 px, no las sombras. Las superficies (láminas, paneles, bandas) nunca llevan sombra. Hay una sombra suave únicamente para objetos que flotan sobre otro: las semillas sobre la foto, la foto incrustada sobre la lámina de producto y el botón flotante de WhatsApp sobre el contenido.

### Shadow Vocabulary
- **Semilla** (`box-shadow: 0 2px 6px rgb(30 20 12 / 0.25)`): asienta cada semilla sobre la fotografía.
- **Foto incrustada** (`box-shadow: 0 18px 40px -18px rgb(38 49 44 / 0.45)`): la foto de uso que se monta sobre la esquina de una lámina de producto, con marco de papel de 6 px.
- **Flotante** (`box-shadow: 0 10px 28px -10px rgb(30 20 12 / 0.55)`): solo el botón de WhatsApp fijo en móvil.

### Named Rules
**La Regla de la Tierra Plana.** Las superficies son planas. La sombra solo existe cuando un objeto está literalmente encima de otro.

## Shapes

Dos familias de forma: la **lámina** y la **pastilla**. Las láminas (fotos, producto, panel, video, estratos) tienen radio grande y fluido (plate, 24 a 44 px). Todo lo accionable pequeño (botones, chips, enlaces de navegación, pastillas de cultivo, leyendas sobre foto, WhatsApp flotante) es pastilla completa. Los controles de icono (menú, teléfono en móvil) son círculos de 48 px con filete.

La lámina del héroe tiene una esquina casi recta (anchor, 4 px) abajo a la izquierda, como si se apoyara en el suelo; en móvil vuelve al radio uniforme. La banda de necesidades redondea solo sus esquinas superiores, y el menú móvil solo las inferiores (drawer, 28 px).

La **semilla** es la forma firma: un óvalo levemente irregular (`border-radius: 46% 54% 50% 50% / 58% 58% 42% 42%`, alto = 0.82 del ancho), sacado de la mano del logotipo.

## Components

### Buttons
Pastillas firmes y cálidas, de 48 px de alto mínimo.
- **Shape:** pastilla completa (pill), filete de 1 px transparente por defecto.
- **Semilla (principal):** naranja semilla con texto tierra tostada, peso 600. Una por región: WhatsApp, "Conoce nuestros productos".
- **Bosque:** verde bosque con texto papel; la compra en tienda de cada producto. Hover a verde campo.
- **Línea:** filete bosque al 45 % y texto bosque; se rellena de bosque al hover.
- **Fantasma claro:** para fondos oscuros; filete crema al 15 %, se rellena de crema al hover.
- **Tamaños:** pequeño 42 px (encabezado), base 48 px, grande 56 px (contacto).
- **Hover / Focus / Active:** hover solo con puntero fino, transición de color 200 ms; al presionar escala a 0.97 en 160 ms. Foco: contorno de 2 px naranja tostado con 3 px de separación (naranja semilla sobre fondos oscuros).

### Link con flecha
Enlace secundario junto a un botón ("Pedir por WhatsApp", "Ver el producto"): texto bosque 600 subrayado al 35 %, con un chevrón dibujado con bordes que avanza 3 px al hover. Altura táctil de 44 px.

### Chips
- **Style:** pastilla de 40 px, filete tinta al 15 %, texto bosque 600 a 0.9375 rem; enlazan a categorías de la tienda.
- **State:** hover rellena de hoja con filete verde campo. Las pastillas de cultivo son estáticas: fondo papel sobre arena, sin borde.

### Cards / Containers
No hay tarjetas. Los contenedores son láminas:
- **Corner Style:** radio de lámina (plate).
- **Background:** arena para producto, hoja para el producto alto, papel para el panel de necesidades, humus para la base del héroe.
- **Shadow Strategy:** ninguna (ver Elevation & Depth).
- **Border:** ninguno; la separación la da el cambio de tono o un filete por encima.
- **Internal Padding:** fluido, 1.5 a 3.5 rem.

### Navigation
- **Escritorio:** enlaces en pastilla, Hanken 550 a 0.9875 rem en tinta; hover y sección activa con fondo hoja y texto bosque. El logotipo se reduce a 0.84 y aparece un filete inferior al hacer scroll.
- **Móvil (por debajo de 1080 px):** botón circular de 48 px con tres barras que se cruzan en X. El menú es un cajón verde bosque bajo el encabezado, esquinas inferiores de 28 px, enlaces en display 380 a 1.75 rem separados por filetes oscuros, con los botones de contacto al pie. Entra con 8 px de desplazamiento y fundido (300 ms, curva drawer).

### Producto (firma)
Fila de dos columnas que alterna lado: lámina de arena cuadrada con el empaque fundido por `multiply`, y a su lado categoría (verde campo), nombre (title), resumen, especificaciones con viñeta semilla, una franja de datos sobre filete (presentación, precio en display con cifras tabulares) y las acciones (botón bosque + link con flecha). La variante con foto incrustada monta una foto de uso con marco papel y sombra de objeto sobre la esquina inferior derecha.

### Pestañas de necesidades (firma)
Lista vertical de pestañas en display 400 separadas por filetes, cada una con una semilla dibujada a la izquierda: hueca en tinta suave cuando está inactiva, rellena de naranja y escalada a 1.25 cuando está seleccionada. El panel de papel entra con 6 px de subida en 250 ms.

### Estratos (firma)
Lista de cuatro capas apiladas dentro de una sola lámina sobre la banda humus, cada una más oscura que la anterior. Título crema luz a la izquierda y texto crema apagada a la derecha; solo la primera capa lleva semilla.

### Video (fachada)
Lámina 16:9 sobre bosque con la miniatura al 80 % de opacidad, botón circular naranja de 76 px con triángulo tierra tostada y rótulo papel abajo. Hover: la imagen escala a 1.03 y el botón a 1.06. Al hacer clic se reemplaza por el iframe y recibe el foco.

### Semillas (motivo)
Siete semillas de 9 a 16 px que caen 48 px girando y se asientan en diagonal sobre la foto del héroe (1100 ms, ease-out, escalonadas 70 ms tras 350 ms). En la banda de contacto, cinco semillas mayores (12 a 28 px) quedan quietas a la derecha. Siempre `aria-hidden` y sin eventos de puntero.

### Pie de página
Bosque profundo, texto crema apagada; encabezados de columna en Hanken 650 a 0.875 rem en crema luz. El logotipo va sobre una placa de papel de 18 px de radio para conservar sus colores. Legal tras un filete oscuro.

### Movimiento
Tres curvas: ease-out `cubic-bezier(0.23, 1, 0.32, 1)` para casi todo, in-out `cubic-bezier(0.77, 0, 0.175, 1)` y drawer `cubic-bezier(0.32, 0.72, 0, 1)` para el menú móvil. Revelado al scroll una sola vez (18 px y fundido, 700 ms, escalonado de 60 ms hasta cuatro hermanos), y solo para lo que está bajo el pliegue: el contenido es visible sin JavaScript. Con `prefers-reduced-motion`: sin scroll suave, las semillas solo aparecen por fundido, los revelados solo cambian opacidad, el panel y el menú no se desplazan y se anulan las escalas de hover y presión.

## Do's and Don'ts

### Do:
- **Do** dar a cada región un estrato de color completo (papel, arena, humus, bosque) en lugar de encerrar contenido en tarjetas.
- **Do** usar la semilla (óvalo irregular naranja) como viñeta de lista, marcador de estado activo y motivo decorativo.
- **Do** mantener los titulares en Bricolage Grotesque entre 330 y 420 de peso con interletrado negativo.
- **Do** usar radio de lámina (24 a 44 px) para fotos y superficies, y pastilla completa para todo lo accionable pequeño.
- **Do** separar con filetes de 1 px al 15 % de tinta (o de crema sobre oscuro).
- **Do** poner texto tierra tostada (#1e140c) sobre naranja semilla y usar naranja tostado para el foco sobre fondos claros.
- **Do** limitar hover a puntero fino y ofrecer alternativa de solo opacidad con movimiento reducido.

### Don't:
- **Don't** usar naranja como fondo de sección, color de texto o borde decorativo; es solo semilla y acción principal.
- **Don't** construir una cuadrícula de tarjetas de producto idénticas bajo un banner verde.
- **Don't** poner sombra a láminas, paneles o bandas; la sombra suave es solo para objetos encima de otro (semillas, foto incrustada, botón flotante).
- **Don't** usar la display en negrita ni rótulos en mayúsculas espaciadas.
- **Don't** poner texto blanco sobre el naranja semilla.
