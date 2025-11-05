# IMPOSTOR — Versión Cerveza (Banco v3.2)

Juego de mesa/party para jugar en persona, versión web estática pensada para GitHub Pages. Funciona 100% offline salvo el modo **Aleatorias (ES)**, que intentará obtener palabras de Internet y, si falla, usará un respaldo local.

## Estructura
- `index.html` — Estructura de la interfaz.
- `styles.css` — Estilos (fondo rojizo oscuro, botones rojos).
- `script.js` — Lógica del juego (roles, modos, competitivo, copiar/pegar configuración).

## Cómo usarlo en local
1. Descarga este proyecto (o el ZIP) y descomprímelo.
2. Abre `index.html` con tu navegador. ¡Listo!

## Cómo publicarlo en GitHub Pages
1. Crea un repositorio nuevo en GitHub (por ejemplo: `impostor-cerveza`).
2. Sube `index.html`, `styles.css` y `script.js` a la rama `main`.
3. Ve a **Settings → Pages**, y en **Build and deployment** selecciona:
   - Source: *Deploy from a branch*
   - Branch: `main` / carpeta raíz (`/`)
4. Guarda. En unos segundos/minutos tendrás una URL del tipo: `https://tu-usuario.github.io/impostor-cerveza/`

## Modo competitivo
- Al finalizar la ronda, elige si se descubrió al impostor.
- Ciudadanos: +1 punto cada uno si lo descubren.
- Impostores: +2 puntos cada uno si ganan.
- Puedes copiar la tabla de puntuaciones con un botón.

## Copiar / Pegar configuración
- **Copiar**: genera un código Base64 con jugadores, puntos, modo de palabras, etc.
- **Pegar**: restaura el estado a partir de ese código, útil tras recargar o cambiar de dispositivo.

## Idioma
- 100% en español.

## Notas
- El favicon es opcional (no incluido).
- Las APIs públicas usadas en *Aleatorias (ES)* pueden no estar disponibles o cambiar. El juego seguirá funcionando con el respaldo local.
