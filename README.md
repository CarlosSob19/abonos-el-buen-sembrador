# Abonos El Buen Sembrador — rediseño de la página de inicio

Sitio estático (HTML + CSS + JavaScript sin dependencias) que rediseña https://www.abonoselbuensembrador.com/.

## Uso

```bash
npm run dev        # desarrollo: http://localhost:5173
npm test           # 22 pruebas estáticas (node:test)
npm run test:e2e   # 6 pruebas en teléfonos emulados (iPhone SE, Galaxy S8, iPhone 15)
npm run build      # paquete de publicación en dist/
npm run preview    # sirve dist/ como en producción: http://localhost:5174
npm run og         # regenera la imagen para compartir y los íconos (con npm run dev activo)
```

Requiere Node 20+ y Edge o Chrome instalado (para las pruebas e2e y `npm run og`).

## Publicar

1. `npm run build` genera `dist/`: HTML, un solo CSS y los JS minificados con huella en el nombre, imágenes, `sitemap.xml`, `robots.txt`, manifiesto, página 404 y las cabeceras.
2. Suba **la carpeta `dist/`** a uno de estos servicios (todos comprimen y dan HTTPS solos):
   - **Netlify** o **Cloudflare Pages**: arrastre `dist/`, o conecte el repositorio con el comando `npm run build` y la carpeta `dist`. Leen `_headers` y `_redirects`.
   - **Vercel**: mismo comando y carpeta; lee `vercel.json`.
3. Las cabeceras ya incluyen la política de seguridad de contenido (con `frame-ancestors`), HSTS, `nosniff`, `Referrer-Policy`, `Permissions-Policy` y caché inmutable para CSS, JS y fuentes.
4. Antes de apuntar el dominio, decida dónde queda la tienda Kolau y active las líneas de `dist/_redirects` (ver `docs/datos-pendientes.md`, punto 5).
5. Registre el sitio en **Google Search Console** y envíe `https://www.abonoselbuensembrador.com/sitemap.xml`.

### Medición de conversiones (opcional)

`main.js` ya registra estos eventos: `whatsapp_click`, `telefono_click`, `tienda_click`, `necesidad_elegida`, `video_play` y `cotizacion_enviada`. Se activan solos al instalar una de estas herramientas; sin ellas no se envía nada a nadie.

- **Plausible** (sin cookies, no requiere aviso): añada en `index.html` el script `https://plausible.io/js/script.tagged-events.js` con `data-domain="abonoselbuensembrador.com"`, y agregue `https://plausible.io` a `script-src` y `connect-src` de la CSP.
- **Google Tag Manager / GA4**: los eventos van a `window.dataLayer`. GA4 usa cookies, así que en ese caso sí hace falta un aviso de cookies.

## Estructura

- `index.html` — página única: hero, nosotros, productos, su cultivo, cultivos, proceso, en el campo, preguntas frecuentes, cotización por volumen, contacto.
- `404.html`, `robots.txt`, `sitemap.xml`, `site.webmanifest`, `favicon.ico` — archivos de publicación.
- `tools/` — `build.mjs` (paquete de publicación), `make-assets.mjs` y `og.html` (imagen para compartir e íconos).
- `tests/` — `site.test.mjs` (estáticas) y `mobile.e2e.mjs` (teléfonos emulados).
- `assets/css/styles.css` — sistema visual (tokens en `:root`).
- `assets/js/main.js` — header, menú móvil, pestañas accesibles, videos con fachada, revelado al hacer scroll.
- `assets/img/` — imágenes originales optimizadas (ver `docs/inventario-imagenes.md`).
- `assets/fonts/` — Bricolage Grotesque y Hanken Grotesk autoalojadas (OFL).
- `PRODUCT.md`, `DESIGN.md`, `.impeccable/` — contexto de producto y sistema de diseño.
- `_research/` — HTML y recursos descargados del sitio original (no se publica).

## Integración con la tienda

La tienda, el carrito y el pago siguen en la plataforma actual (Kolau). Los botones «Comprar en la tienda» enlazan a las fichas reales (`/vb1l`, `/abono-organico-compostado`, `/om40`) y a las categorías. Si este diseño se publica en el mismo dominio, hay que mantener esas rutas activas en la plataforma o redirigirlas.

## Experiencia de scroll (v2)

Gramática «Estratos» (scroll-craft): la página baja por un perfil de suelo. Motor: `assets/vendor/scrollcraft/` (sin modificar). Brief y curva emocional: `scrollcraft/builds/el-buen-sembrador/BRIEF.md`. Verificación visual: `node <skill>/scripts/shoot.mjs` con `bypassCSP` (la CSP del sitio bloquea los estilos que inyecta el arnés).

### Hero por capas

`hero-fondo` (tierra con el sujeto retirado y relleno) y `hero-sujeto` (manos y plántula con alfa) se derivan de la foto original `hero-siembra.jpg` con SAM (facebook/sam-vit-large) en la GPU local. Comparten geometría y punto de apoyo, por eso escalan a ritmos distintos sin que las manos floten. El relleno del fondo es borroso: solo asoma unos píxeles alrededor del sujeto durante el movimiento.

## Pendiente / limitaciones

- **Datos del negocio:** ver [docs/datos-pendientes.md](docs/datos-pendientes.md): fotos de producto, registro ICA, precios por volumen y de 4 y 20 L, envíos, medios de pago y datos legales.
- **Rendimiento móvil (Lighthouse, 4G simulado):** 79 (escritorio: 100). Accesibilidad, buenas prácticas y SEO: 100 en ambos. El motor scrollcraft mantiene un bucle de animación activo aunque la página no tenga videos; corregirlo implica cambiar el motor de la skill, no este proyecto.

- El arnés mide un «peor píxel» de 1.5:1 bajo el titular del hero en escritorio (granos claros de tierra y borde de una hoja); el contraste medio es 11:1.

- Precios copiados del sitio el 13-10-2026; si cambian en la tienda, actualícelos en `index.html`.
- No hay dirección, correo ni redes públicas en el sitio original, así que no se incluyeron.
- Para producción conviene enviar la CSP como cabecera HTTP (añadiendo `frame-ancestors`) en lugar de solo `<meta>`.
