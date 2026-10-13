# Inventario de imágenes — página de inicio original

Revisado el 13-10-2026 en https://www.abonoselbuensembrador.com/ (plataforma Kolau). Se recorrió la página completa, incluidos carruseles y fondos CSS.

| # | Original (S3 / origen) | Dimensiones | Uso en el original | Archivo nuevo | Uso en el rediseño | Tratamiento |
|---|---|---|---|---|---|---|
| 1 | `landing_page_business/logo/30855/image-upload1693779520.png` | 884×738 | Logotipo (header) | `logo-el-buen-sembrador.png`, `-300.png/.webp` | Header, footer, favicon | Reducido a 300 px + WebP |
| 2 | Fondo del encabezado, JPEG embebido en base64 | 1280×620 | Hero "Insumos agrícolas…" | `hero-siembra.jpg/.webp` | Hero | Real-ESRGAN ×4 → 1600 px |
| 3 | `landing_page_product_variant/image/529388/image-upload1693781375.png` | 247×249 | Abono Orgánico-Compostado | `saco-abono-el-buen-sembrador.jpg/.webp` | Producto Compostado | Real-ESRGAN, recorte de líneas negras del borde |
| 4 | `landing_page_product_variant/image/504019/image-upload1693780922.png` | 247×249 | Abono Orgánico-Mineral y tarjeta de categoría Abono | mismo archivo que #3 | Producto Mineral | **Idéntica píxel a píxel a #3** (PSNR = ∞); se usa un solo archivo |
| 5 | `variant_image/image/17434/image-upload1690304612.jpeg` | 1280×960 | Variante de Abono Orgánico-Mineral | `abono-organico-mineral-bodega.jpg/.webp` | Producto Mineral (foto superpuesta) y sección Proceso | WebP |
| 6 | `landing_page_product_variant/image/503798/image-upload1693780809.jpeg` | 355×740 | Vinobiol y tarjeta de categoría Fertilizante | `vinobiol.jpg/.webp` | Producto Vinobiol | Real-ESRGAN → 700 px |
| 7 | `variant_image/image/19899/image-upload1693780784.jpeg` | 355×740 | Variante de Vinobiol | mismo archivo que #6 | — | **Idéntica byte a byte a #6** (mismo MD5) |
| 8 | `landing_page_image/image/294716/image-upload1693774397.png` | 649×361 | Carrusel "Tu satisfacción…" | `trabajo-campo-guatica.jpg/.webp` | Sección editorial | Real-ESRGAN → 1600 px |
| 9 | `landing_page_image/image/294721/image-upload1693774756.jpeg` | 1070×803 | Carrusel | `cultivo-cafe.jpg/.webp` | Mosaico de cultivos | WebP |
| 10 | `landing_page_image/image/294723/image-upload1693774756.png` | 419×370 | Carrusel | `cultivo-hortalizas.jpg/.webp` | Mosaico de cultivos | Real-ESRGAN → 1400 px |
| 11 | `landing_page_image/image/294722/image-upload1693774756.jpeg` | 3072×2304 (4,3 MB) | Carrusel | `cultivo-aguacate.jpg/.webp` | Mosaico de cultivos | Reducido a 1600 px (371 KB WebP) |
| 12 | `kolau.s3.amazonaws.com/images/camara-icon-text.svg` | SVG | Icono del título "Conoce nuestro trabajo" | `camara-icon.svg` | Título "Tradición" | Sin cambios |

Videos de YouTube del original: `mwz1f_wHgaI` y `tmSwx-dT-aA`. Se conservan con fachada (miniatura + clic) y `youtube-nocookie.com`.

Ninguna imagen se reemplazó por material de stock, generado o de Fielder Nutrition. Real-ESRGAN (`C:\IA`) solo aumenta resolución sin cambiar el contenido; en los sacos (originales de 247 px) el texto de la etiqueta seguía siendo ilegible y lo sigue siendo.

La prueba `tests/site.test.mjs` → «todas las imágenes originales…» verifica que cada una aparezca en `index.html`.
