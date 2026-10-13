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

## Pendiente / limitaciones

- Precios copiados del sitio el 13-10-2026; si cambian en la tienda, actualícelos en `index.html`.
- No hay dirección, correo ni redes públicas en el sitio original, así que no se incluyeron.
- Para producción conviene enviar la CSP como cabecera HTTP (añadiendo `frame-ancestors`) en lugar de solo `<meta>`.
