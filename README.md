# Abonos El Buen Sembrador — rediseño de la página de inicio

Sitio estático (HTML + CSS + JavaScript sin dependencias) que rediseña https://www.abonoselbuensembrador.com/.

## Uso

```bash
npm run dev    # http://localhost:5173
npm test       # 15 pruebas de aceptación (node:test)
```

Requiere Node 20+. No hay paso de compilación: para publicar, sube `index.html` y la carpeta `assets/`.

## Estructura

- `index.html` — página única: hero, nosotros, productos, selector por necesidad, proceso, historia, contacto.
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

- El arnés mide un «peor píxel» de 1.5:1 bajo el titular del hero en escritorio (granos claros de tierra y borde de una hoja); el contraste medio es 11:1.

- Precios copiados del sitio el 13-10-2026; si cambian en la tienda, actualícelos en `index.html`.
- No hay dirección, correo ni redes públicas en el sitio original, así que no se incluyeron.
- Para producción conviene enviar la CSP como cabecera HTTP (añadiendo `frame-ancestors`) en lugar de solo `<meta>`.
