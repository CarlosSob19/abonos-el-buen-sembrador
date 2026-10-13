---
name: Abonos El Buen Sembrador
description: Insumos agrícolas con biotecnología, hechos en Antioquia desde 2013; la página se recorre como un perfil de suelo.
colors:
  forest: "#173f32"
  forest-deep: "#0f2c23"
  field: "#367b4b"
  field-ink: "#2b6a3d"
  leaf: "#e8f0e6"
  paper: "#fafaf6"
  sand: "#ede6d8"
  sand-2: "#e3d8c3"
  humus: "#2e2219"
  stratum-0: "#33261b"
  stratum-1: "#6b5038"
  stratum-2: "#57412e"
  stratum-3: "#433223"
  stratum-4: "#2b2016"
  ink: "#26312c"
  ink-soft: "#4a5650"
  seed: "#e8892a"
  seed-deep: "#c96f14"
  seed-hover: "#f09a40"
  on-seed: "#1e140c"
  on-dark: "#f3eee3"
  on-dark-soft: "#d6cdbb"
  highlight: "#fff8ec"
  sprout: "#9fd3a8"
  error: "#a5321c"
  rule: "#26312c24"
  rule-dark: "#f3eee326"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 1.3rem + 3.6vw, 5.4rem)"
    fontWeight: 330
    lineHeight: 0.96
    letterSpacing: "-0.04em"
  display-close:
    fontFamily: "Bricolage Grotesque, Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2.8rem, 1.4rem + 5.2vw, 6.4rem)"
    fontWeight: 320
    lineHeight: 0.96
    letterSpacing: "-0.042em"
  headline:
    fontFamily: "Bricolage Grotesque, Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.3rem + 2.6vw, 3.6rem)"
    fontWeight: 380
    lineHeight: 1.03
    letterSpacing: "-0.032em"
  title:
    fontFamily: "Bricolage Grotesque, Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1.15rem + 1.2vw, 2.3rem)"
    fontWeight: 420
    lineHeight: 1.06
    letterSpacing: "-0.028em"
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
  plate: "clamp(22px, 1rem + 2vw, 44px)"
  drawer: "28px"
  tag: "18px"
  field: "14px"
  pill: "999px"
spacing:
  gutter: "clamp(1rem, 0.4rem + 3vw, 3rem)"
  section: "clamp(5rem, 3rem + 7vw, 10rem)"
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
  button-ghost-light:
    textColor: "{colors.on-dark}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.4rem"
    height: "48px"
  button-ghost-light-hover:
    backgroundColor: "{colors.on-dark}"
    textColor: "{colors.forest}"
  button-glass:
    backgroundColor: "rgb(250 250 246 / 0.14)"
    textColor: "{colors.highlight}"
    rounded: "{rounded.pill}"
    padding: "0.9rem 1.8rem"
    height: "56px"
  button-glass-hover:
    backgroundColor: "rgb(250 250 246 / 0.26)"
  chip:
    textColor: "{colors.forest}"
    rounded: "{rounded.pill}"
    padding: "0.4rem 1rem"
    height: "44px"
  chip-hover:
    backgroundColor: "{colors.leaf}"
  header-material:
    backgroundColor: "rgb(250 250 246 / 0.72)"
    textColor: "{colors.ink}"
    height: "{spacing.header}"
  header-material-dark:
    backgroundColor: "rgb(22 17 12 / 0.5)"
    textColor: "{colors.highlight}"
  nav-link-active:
    backgroundColor: "rgb(54 123 75 / 0.12)"
    textColor: "{colors.forest}"
    rounded: "{rounded.pill}"
    padding: "0.55rem 0.85rem"
  mobile-menu:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.drawer}"
  product-media:
    backgroundColor: "{colors.sand}"
    rounded: "{rounded.plate}"
    padding: "clamp(1.25rem, 3vw, 2.75rem)"
  needs-panel:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.plate}"
    padding: "clamp(1.25rem, 3vw, 2rem)"
  quote-form:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.plate}"
    padding: "clamp(1.5rem, 3.5vw, 2.75rem)"
  input-field:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "0.75rem 0.95rem"
    height: "50px"
  field-error:
    textColor: "{colors.error}"
  faq-summary:
    textColor: "{colors.forest}"
    height: "64px"
  faq-summary-hover:
    textColor: "{colors.field-ink}"
  contact-carry:
    textColor: "{colors.on-dark-soft}"
    rounded: "{rounded.tag}"
    padding: "0.7rem 1rem"
---

# Design System: Abonos El Buen Sembrador

## Overview

**Creative North Star: "El perfil del suelo"**

La página se recorre de arriba hacia abajo como un corte de tierra, con la gramática **Estratos**: cada sección es un estrato con su propio suelo de color y cortes duros entre uno y otro, sin degradados. En la superficie, una escena fotográfica por capas (manos que siembran) fijada mientras caen semillas; luego papel, hoja y arena donde el agricultor conoce y decide; el pico en los estratos de humus, donde el propio suelo cambia capa a capa mientras se baja; y un cierre en verde bosque donde la semilla germina junto a la acción final. Un medidor de profundidad en el borde derecho dice en qué estrato se está, y su marcador es la semilla del logotipo que cae con la lectura.

Es un sistema editorial y sereno, de densidad media, hecho con pocas piezas: láminas fotográficas de esquinas grandes, filetes finos en lugar de cajas, una display ligera y apretada, materiales translúcidos solo donde el contenido pasa por debajo, y un único gesto propio: la semilla naranja que la mano siembra. Rechaza la plantilla agro de banner verde sobre una cuadrícula de tarjetas de producto idénticas: los productos viajan en un carril horizontal y cada uno llega completo.

El movimiento está atado al recorrido: escenas fijadas que avanzan con el scroll (héroe, productos, proceso, cierre), barridos de imagen que corren completos al entrar, y cambios de estado breves. Todo tiene versión para movimiento reducido, transparencia reducida y contraste alto.

**Key Characteristics:**
- Un suelo de color por sección, con cortes duros (papel, hoja, arena, arena 2, estratos de humus, bosque, bosque profundo).
- Héroe por capas: lámina de tierra, sujeto recortado con alfa, semillas en tres profundidades, velo local bajo el texto, salida a lámina redondeada.
- Medidor de profundidad con la semilla que cae como firma de navegación.
- Encabezado de material translúcido con tres tonos (claro, oscuro, transparente).
- Láminas con radio grande y fluido (22 a 44 px); filetes de 1 px como estructura.
- Display Bricolage Grotesque ligera (320 a 420) con interletrado negativo.
- Naranja semilla reservado para semillas y la acción principal.

## Colors

Paleta de tierra: verdes de bosque y campo, blancos cálidos, arenas, una rampa de humus que se oscurece con la profundidad, y un único acento naranja tomado de la mano del logotipo.

### Primary
- **Verde Bosque** (forest): color de marca. Títulos de sección, botón de compra, menú móvil, suelo del cierre, página 404, selección de texto, ícono del select.
- **Bosque Profundo** (forest-deep): suelo del pie de página; el estrato más hondo. Fondo del botón de cristal con contraste alto.
- **Verde Campo** (field): verde vivo para rellenos y texto grande. Hover del botón bosque, filete del chip en hover, palabra destacada de la declaración de "Nosotros", borde y halo de foco de campos, `accent-color`, cursor y barra de desplazamiento.
- **Verde Campo Legible** (field-ink): la versión de texto pequeño del verde campo sobre fondos claros (5:1 o más). Categoría de producto y hover de las preguntas frecuentes.

### Secondary
- **Naranja Semilla** (seed): solo semillas (motivo del héroe, marcador del medidor, marcador de necesidades, viñetas, semilla del brote) y la acción principal (botón semilla, reproducción de video, WhatsApp flotante). Foco sobre fondos oscuros. Su texto encima siempre es **Tierra Tostada** (on-seed).
- **Naranja Tostado** (seed-deep): anillo de foco sobre fondos claros.
- **Naranja Encendido** (seed-hover): hover del botón semilla.

### Tertiary
- **Humus** (humus): fondo de la escena del héroe mientras carga la foto y de los marcos de foto de cultivos.
- **Estratos** (stratum-0 a stratum-4): los suelos del proceso. stratum-0 es la base de la sección; stratum-1 a stratum-4 se oscurecen con la profundidad y suben uno tras otro como capas nuevas. Los mismos tonos (con extremos #8a6a4b y #1d150e) rellenan la muestra de suelo.
- **Brote** (sprout): trazo del tallo y las hojas del brote del cierre; las hojas se rellenan con el mismo verde al 35 %.

### Neutral
- **Papel Cálido** (paper): suelo general (héroe, nosotros, en el campo), panel de necesidades, formulario de cotización, placa del logotipo.
- **Hoja** (leaf): suelo de productos y de preguntas frecuentes; hover de chips; marco de la foto incrustada.
- **Arena** (sand): superficie de decisión. Suelo de necesidades y de cotización, láminas de producto y de imagen recomendada.
- **Arena 2** (sand-2): suelo de cultivos, un estrato más hondo que la arena.
- **Tinta** (ink) y **Tinta Suave** (ink-soft): texto corrido y texto secundario (leyendas, notas, pestañas inactivas, respuestas).
- **Crema sobre oscuro** (on-dark), **Crema apagada** (on-dark-soft) y **Crema luz** (highlight): texto sobre suelos oscuros y sobre la foto; la crema luz es para titulares y el encabezado en tono oscuro.
- **Error** (error): tierra roja para el borde del campo inválido y su mensaje (5:1 o más sobre papel).
- **Filete** (rule) y **Filete oscuro** (rule-dark): líneas de 1 px a ~14 % de tinta o 15 % de crema.

### Named Rules
**La Regla de la Semilla.** El naranja aparece solo como semilla o como la acción principal de una región. Nunca como fondo de sección, color de texto ni decoración de borde.

**La Regla del Estrato.** Cada sección es dueña de un suelo completo y lo cambia con un corte duro, sin degradados entre suelos. Los suelos oscuros se reservan para la escena del héroe, el pico del proceso, el cierre y el pie.

**La Regla del Verde Legible.** El verde campo es para rellenos, acentos y texto grande; el texto pequeño verde sobre fondo claro usa verde campo legible.

## Typography

**Display Font:** Bricolage Grotesque (variable 200 a 800, con Hanken Grotesk y system-ui de respaldo)
**Body Font:** Hanken Grotesk (variable 100 a 900, con redonda e itálica; respaldo system-ui, Segoe UI)

**Character:** Una grotesca con carácter, usada ligera y apretada para los titulares, sobre una grotesca de texto limpia y legible al sol. El contraste viene del peso y el tamaño, no de mezclar serif y sans.

### Hierarchy
- **Display** (330, fluida 2.6 a 5.4 rem, 0.96, -0.04em): titular del héroe, con sombra de texto suave sobre la foto. El segundo enunciado del héroe y los titulares de cada capa del proceso (340, hasta 4.8 rem) son variantes de la misma voz; el titular de la 404 también.
- **Display de cierre** (320, fluida 2.8 a 6.4 rem, 0.96, -0.042em): solo "Hablemos de su cultivo", el bookend del recorrido.
- **Headline** (380, fluida 2 a 3.6 rem, 1.03, -0.032em): título de cada sección, con `text-wrap: balance`. El título del proceso baja a 360 sobre oscuro.
- **Title** (400 a 420, fluida 1.5 a 2.3 rem, 1.06 a 1.12): nombre de producto, producto recomendado, tradición. Variantes menores en pestañas de necesidades (400, 1.15 a 1.45 rem), preguntas frecuentes (420, 1.1 a 1.35 rem) y menú móvil (380, 1.75 rem).
- **Lead** (400, fluida 1.125 a 1.375 rem, 1.5): entradillas del héroe, del cierre y de las capas del proceso, 34 a 44 ch.
- **Body** (400, 1.0625 rem, 1.6): texto corrido, 50 a 60 ch.
- **Label** (600, 0.9375 rem): botones, chips, rótulos de campo, categoría de producto. Datos en 650; precios en display 450 a 1.75 rem con cifras tabulares; los rótulos del medidor en 600 a 0.8125 rem.

### Named Rules
**La Regla de la Display Ligera.** Los titulares van entre 320 y 420 de peso con interletrado negativo (-0.015em a -0.042em). Nunca negrita en la display; el peso fuerte (600 a 650) es del texto de acción, los rótulos y los datos.

**La Regla de la Caja Natural.** Sin mayúsculas sostenidas ni versalitas espaciadas, y sin antetítulos sobre los titulares: todos los rótulos van en caja de oración.

## Layout

Página única editorial con contenedor de 1280 px y margen lateral fluido (gutter, 1 a 3 rem). Las secciones respiran con un ritmo vertical fluido (section, 5 a 10 rem). Las rejillas son asimétricas de dos columnas en proporción 7/5, 5/7, 5/6 o 6/6; en preguntas frecuentes y cotización la columna de introducción queda fija (sticky) mientras la otra avanza. Los suelos van a sangre completa con el contenido dentro del máximo.

Cuatro escenas se fijan a la pantalla (100 svh) mientras el scroll las hace avanzar: el héroe, el carril de productos (desplazamiento horizontal), el proceso y el cierre. El resto fluye. El carril vuelve a lista vertical cuando no cabe (lo decide el script), y en pantallas bajas de escritorio (alto 720 px o menos) las láminas de producto se acortan y se ocultan las especificaciones.

Encabezado fijo de 76 px (66 px por debajo de 900 px), respetando las áreas seguras. Puntos de quiebre observados: 1180 px (se oculta el medidor), 1140 px (la navegación pasa al botón de menú), 900 px (todas las rejillas a una columna, el teléfono del encabezado se vuelve círculo, aparece el WhatsApp flotante, la muestra de suelo se vuelve horizontal), 520 px (acciones a ancho completo). La foto de "En el campo" sangra al borde izquierdo de la ventana.

## Elevation & Depth

El sistema es mayormente plano: la profundidad la dan los cambios de suelo, los filetes y las capas de la escena del héroe. Las secciones y las láminas de foto nunca llevan sombra. Hay una sola elevación suave para las dos superficies de respuesta (el panel de necesidades y el formulario de cotización), y sombras de objeto para lo que está literalmente encima de otra cosa. La profundidad del héroe es real: tierra, semillas lejanas, sujeto, semillas medias y cercanas (desenfocadas) se mueven a ritmos distintos con el scroll y con el puntero.

### Shadow Vocabulary
- **Semilla** (`box-shadow: 0 2px 6px rgb(18 14 10 / 0.35)`; en el medidor `rgb(30 20 12 / 0.3)`): asienta cada semilla sobre lo que tiene debajo.
- **Lámina de respuesta** (`box-shadow: 0 1px 0 rgb(38 49 44 / 0.04), 0 24px 48px -32px rgb(38 49 44 / 0.35)`; el formulario usa `0 30px 60px -40px rgb(38 49 44 / 0.4)`): panel de necesidades y formulario de cotización.
- **Foto incrustada** (`box-shadow: 0 18px 40px -18px rgb(38 49 44 / 0.45)`): foto de uso montada sobre la esquina de una lámina de producto.
- **Flotante** (`box-shadow: 0 10px 28px -10px rgb(30 20 12 / 0.55)`): WhatsApp flotante y botón de reproducción.
- **Placa de logotipo** (`box-shadow: 0 6px 18px -10px rgb(30 20 12 / 0.45)`): placa de papel del logotipo sobre el material del encabezado.
- **Cajón** (`box-shadow: 0 24px 48px -24px rgb(15 20 16 / 0.5)`): menú móvil sobre el contenido.
- **Sombra de texto** (`text-shadow: 0 2px 28px rgb(14 11 8 / 0.55)`): solo texto sobre la foto del héroe.

### Named Rules
**La Regla del Levantamiento Único.** Las superficies son planas. Solo las láminas donde el visitante recibe una respuesta llevan la elevación suave; la sombra de objeto es para lo que está encima de otra cosa.

**La Regla del Material.** La translucidez (desenfoque de 10 a 20 px) es solo para lo que tiene contenido o foto debajo: el encabezado, el botón de cristal del héroe y las leyendas sobre foto. Con transparencia reducida se vuelven sólidos.

**La Regla del Velo Local.** Sobre la foto, el oscurecimiento va donde está el texto (velo radial bajo el titular, más un oscurecimiento general por las esquinas), no como capa uniforme sobre toda la escena.

## Shapes

Dos familias de forma: la **lámina** y la **pastilla**. Las láminas (fotos, láminas de producto, panel de necesidades, formulario, video, salida del héroe) tienen radio grande y fluido (plate, 22 a 44 px); las láminas internas (imagen recomendada, foto incrustada) usan el 70 % de ese radio. Todo lo accionable pequeño (botones, chips, enlaces de navegación, pastillas de cultivo, leyendas sobre foto, WhatsApp flotante) es pastilla completa, y la muestra de suelo del proceso también. Los controles de icono (menú, teléfono en móvil) son círculos de 48 px con filete al 30 %.

Radios intermedios con función propia: campos de formulario (field, 14 px), el recuadro de la necesidad elegida y la placa del logotipo en el pie (tag, 18 px), el cajón del menú móvil solo en sus esquinas inferiores (drawer, 28 px). La foto de "En el campo" redondea solo su lado derecho porque sangra por el izquierdo.

La **semilla** es la forma firma: un óvalo levemente irregular (`border-radius: 46% 54% 50% 50% / 58% 58% 42% 42%`, alto = 0.82 del ancho), sacado de la mano del logotipo. Los puntos del medidor, en cambio, son círculos huecos de 9 px.

## Components

### Buttons
Pastillas firmes y cálidas, de 48 px de alto mínimo.
- **Shape:** pastilla completa, filete de 1 px transparente por defecto.
- **Semilla (principal):** naranja semilla con texto tierra tostada, peso 600. Una por región: "Conoce nuestros productos", WhatsApp, enviar cotización.
- **Bosque:** verde bosque con texto papel; compra en tienda. Hover a verde campo.
- **Fantasma claro:** sobre suelos oscuros; filete crema al 32 %, se rellena de crema al hover.
- **Cristal:** solo sobre la foto del héroe; papel al 14 % con filete blanco al 32 % y desenfoque de 14 px, texto crema luz. Sólido con transparencia reducida; bosque profundo con filete crema con contraste alto.
- **Tamaños:** pequeño 42 px (encabezado), base 48 px, grande 56 px (héroe, cierre, 404).
- **Hover / Focus / Active:** hover solo con puntero fino, transición de color 200 ms; al presionar escala a 0.97. Foco: contorno de 2 px naranja tostado con 3 px de separación; naranja semilla en héroe, proceso, cierre, pie y encabezado oscuro. Deshabilitado: opacidad 0.55.

### Link con flecha
Enlace secundario junto a un botón: texto bosque 600 subrayado al 35 %, chevrón dibujado con bordes que avanza 3 px al hover. Altura táctil de 44 px.

### Chips
- **Style:** pastilla de 44 px, filete, texto bosque 600 a 0.9375 rem; enlazan a categorías de la tienda.
- **State:** hover rellena de hoja con filete verde campo. Las pastillas de cultivo son estáticas: papel al 75 % sobre arena 2, sin borde, peso 550.

### Cards / Containers
No hay tarjetas. Los contenedores son láminas:
- **Corner Style:** radio de lámina (plate).
- **Background:** arena para producto (papel cuando el suelo es hoja), papel para el panel de necesidades y el formulario.
- **Shadow Strategy:** ninguna, salvo la lámina de respuesta (ver Elevation & Depth).
- **Border:** ninguno; separa el cambio de tono o un filete.
- **Internal Padding:** fluido, 1.25 a 2.75 rem.

### Inputs / Fields
- **Style:** fondo blanco, filete tinta al 22 %, radio de 14 px, 50 px de alto, texto de 16 px (evita el zoom de iOS). Rótulo encima en 600 a 0.9375 rem; "(opcional)" en peso 400 tinta suave. El select dibuja su flecha con dos degradados en bosque.
- **Focus:** borde verde campo y halo de 3 px verde campo al 22 %, sin contorno.
- **Error:** borde y mensaje (600, 0.875 rem) en color error.
- **Opciones:** casillas de 20 px con `accent-color` verde campo en filas de 44 px, peso 450.
- **Envío:** botón semilla grande alineado a la izquierda (ancho completo en móvil) con una línea de estado en tinta suave debajo.

### Navigation
- **Encabezado:** material translúcido fijo (papel al 72 % con desenfoque de 20 px y saturación 180 %) y un desvanecido de 18 px en su borde inferior donde el contenido pasa por debajo. Tres tonos según lo que tiene debajo: **transparente** sobre la foto del héroe (sin material, texto crema luz), **oscuro** sobre proceso, cierre y pie (tierra al 50 %, texto crema luz) y **claro** en el resto; transición de 300 ms. El logotipo va en una placa de papel de 14 px de radio.
- **Enlaces:** pastillas Hanken 560 a 0.975 rem; activo y hover con verde campo al 12 % (blanco al 16 % en tonos oscuro y transparente).
- **Móvil (por debajo de 1140 px):** botón circular de 48 px con tres barras que se cruzan en X. El menú es un cajón bosque que sale del encabezado, esquinas inferiores de 28 px, enlaces en display 380 a 1.75 rem separados por filetes oscuros, botones de contacto al pie. Entra con 12 px de desplazamiento y fundido (300 ms, curva drawer).

### Medidor de profundidad (firma)
Lista vertical de los estratos de la página fija en el borde derecho (solo por encima de 1180 px), sobre un hilo de 1 px al 28 %. Cada estrato es un círculo hueco de 9 px; el actual se llena de opacidad y escala a 1.15. Los nombres aparecen al pasar el puntero o al enfocar. La semilla naranja baja por el hilo interpolando entre estratos y gira con la distancia recorrida. Cambia a crema luz sobre suelos oscuros, se aparta en el carril de productos y la semilla desaparece al llegar al cierre, donde germina.

### Escena del héroe (firma)
Escena fijada de 100 svh con lámina de tierra (hero-fondo) y sujeto recortado con alfa (hero-sujeto) que comparten punto de apoyo (donde las manos tocan la tierra) y escalan a ritmos distintos (1.1 a 1.02 y 1.1 a 0.97) sin que las manos floten. Semillas en tres planos: lejanas de 8 px casi quietas, medias de 13 px, cercanas de 26 px desenfocadas 2.5 px y rápidas. Un velo radial local queda entre el sujeto y el texto. A mitad del recorrido el titular cede el lugar a un segundo enunciado. En el último 40 % la escena se recorta hacia una lámina redondeada (inset de 9 svh y gutter, radio hasta 44 px). Con puntero fino, las capas se desplazan con el puntero según su profundidad. En móvil la escena ocupa la mitad superior con desvanecido inferior y el texto va abajo.

### Carril de productos (firma)
Escena fijada que desplaza horizontalmente: introducción con chips de categoría, tres productos y un cierre. Cada producto es una fila de dos columnas: lámina de arena con el empaque fundido por `multiply` y, al lado, categoría (verde campo legible), nombre, resumen, especificaciones con viñeta semilla, datos sobre filete (presentación, precio con cifras tabulares) y acciones. La variante con foto incrustada monta una foto de uso con marco hoja de 6 px. Al entrar en pantalla cada producto se asienta: imagen y texto suben 32 y 22 px desde opacidad 0.55, el texto un poco después.

### Selector de necesidades (firma)
Pestañas en display 400 separadas por filetes, con una semilla hueca a la izquierda. Una sola semilla naranja (escala 1.3) viaja a la pestaña elegida (380 ms, curva in-out). El panel de papel muestra la lámina del producto recomendado (empaque sobre arena o foto) y su razón, y entra con 6 px de subida y desenfoque de 4 px (260 ms). La necesidad elegida queda anotada debajo y viaja al mensaje de WhatsApp del cierre, donde aparece en un recuadro crema translúcido de 18 px de radio.

### Proceso: estratos (firma, pico)
Escena fijada de tres columnas: introducción, muestra de suelo y capa activa. Cada capa nueva cubre el suelo con un barrido de abajo hacia arriba (750 ms, curva drawer) en el tono del estrato siguiente. La muestra de suelo es una pastilla vertical de 22 px que se llena con la rampa de estratos a medida que se baja, con marcas cada 25 %. La capa activa (titular display 340 y lead) sube 56 px al entrar, deriva ±18 px mientras dura y, al ceder, sigue bajando: se entierra. La foto inicial se retira cuando aparece la primera capa. En móvil la muestra es una barra horizontal de 14 px.

### Germinación (firma)
El cierre fijado en verde bosque: display de cierre, lead, necesidad anotada y botones semilla grande y fantasma claro. A la derecha, un brote SVG que se dibuja con el scroll: línea de tierra crema al 35 %, semilla naranja, tallo primero y hojas después, trazo verde brote. En móvil el brote queda pequeño (58 px) junto al titular.

### Preguntas frecuentes
Acordeón nativo (details/summary) sobre suelo hoja, separado por filetes. Pregunta en display 420 bosque, 64 px de alto mínimo; a la derecha un más dibujado con dos trazos de 1.8 px que gira 135° al abrir (300 ms). La respuesta se despliega con altura animada (320 ms) en tinta suave, 60 ch. Hover a verde campo legible.

### Video (fachada)
Lámina 16:9 sobre bosque con miniatura al 82 %, degradado inferior y botón circular naranja de 76 px con triángulo tierra tostada; rótulo papel abajo. Hover: imagen a 1.03 y botón a 1.06. Al hacer clic se reemplaza por el iframe.

### Barridos de imagen
Las fotos que no se ven al cargar se abren con un recorte de arriba hacia abajo (o desde la izquierda) en 1100 ms con curva drawer, mientras la imagen baja de escala 1.08 a 1 en 1400 ms. Corren completos al entrar, nunca a medias con el scroll. Las fotos de cultivos derivan dentro de sus marcos (parallax).

### Pie de página
Bosque profundo, texto crema apagada; encabezados de columna en Hanken 650 a 0.875 rem en crema luz. El logotipo va sobre una placa de papel de 18 px. Legal tras un filete oscuro.

### Página 404
Suelo bosque a pantalla completa, contenido de 40 rem: logotipo, titular display 330 crema luz ("Aquí no germinó nada"), lead crema apagada, botón semilla grande y fantasma claro grande, y una línea de ayuda con enlace a WhatsApp.

### Movimiento
Tres curvas: ease-out `cubic-bezier(0.23, 1, 0.32, 1)` para casi todo, in-out `cubic-bezier(0.77, 0, 0.175, 1)` para el marcador de necesidades y drawer `cubic-bezier(0.32, 0.72, 0, 1)` para menú, barridos y suelos del proceso. Las semillas del héroe caen 60 px girando (1200 ms, escalonadas 70 ms tras 500 ms); tierra y sujeto entran con un leve zoom (1800 y 1600 ms). El contenido es visible sin JavaScript.
- **Movimiento reducido:** sin scroll suave ni recorte de salida; capas del héroe sin escala ni desplazamiento, entradas solo por fundido; suelos del proceso sin barrido y capas solo por opacidad; sin deriva, sin desplazamiento de marcador, panel ni menú; sin escalas de presión; brote dibujado completo; acordeón sin animación; sin profundidad por puntero.
- **Transparencia reducida:** encabezado y leyendas sobre papel sólido; botón de cristal sólido oscuro.
- **Contraste alto:** encabezado sólido con filete tinta; botón de cristal en bosque profundo con filete crema luz.

## Do's and Don'ts

### Do:
- **Do** dar a cada sección un suelo de color completo y cambiarlo con un corte duro, sin degradados entre suelos.
- **Do** usar la semilla (óvalo irregular naranja) como viñeta, marcador de estado y motivo animado, y como marcador del medidor de profundidad.
- **Do** mantener los titulares en Bricolage Grotesque entre 320 y 420 de peso con interletrado negativo.
- **Do** usar radio de lámina (22 a 44 px) para fotos y superficies, y pastilla completa para todo lo accionable pequeño.
- **Do** separar con filetes de 1 px de tinta (o de crema sobre oscuro).
- **Do** usar verde campo legible (#2b6a3d) para texto verde pequeño sobre fondos claros, y el color error (#a5321c) para campos inválidos.
- **Do** poner texto tierra tostada (#1e140c) sobre naranja semilla y usar naranja tostado para el foco sobre fondos claros.
- **Do** oscurecer la foto solo donde va el texto, con un velo local entre el sujeto y el titular.
- **Do** dar a todo material translúcido una versión sólida con transparencia reducida y contraste alto.
- **Do** limitar hover y profundidad por puntero a puntero fino, y ofrecer alternativa de solo opacidad con movimiento reducido.

### Don't:
- **Don't** usar naranja como fondo de sección, color de texto o borde decorativo; es solo semilla y acción principal.
- **Don't** construir una cuadrícula de tarjetas de producto idénticas bajo un banner verde.
- **Don't** poner sombra a secciones ni a láminas de foto; la elevación suave es solo para las láminas de respuesta y la sombra de objeto para lo que está encima de otra cosa.
- **Don't** usar la display en negrita, rótulos en mayúsculas espaciadas ni antetítulos sobre los titulares.
- **Don't** poner texto blanco sobre el naranja semilla.
- **Don't** usar degradados entre suelos ni oscurecer la foto del héroe con una capa uniforme.
