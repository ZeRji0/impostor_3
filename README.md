# IMPOSTOR — Versión Cerveza (Banco v3.3)

Ajustes pedidos:
- **Fondo**: azul cian discreto.
- **Privacidad por turno**: nuevo menú claro en la pantalla de roles (Ver/Ocultar/Pasar al siguiente).
- **Cooperativo persistente**: si eliges *Cooperativo*, las mismas palabras se reutilizan ronda a ronda **sin repetirse** y excluyendo las aportadas por quien sea impostor en cada ronda.
- **Nombres por defecto**: si no marcas *Usar nombres personalizados*, se generan automáticamente `Jugador1`, `Jugador2`, ... según el **número de jugadores**.

## Estructura
- `index.html` — Estructura de la interfaz.
- `styles.css` — Estilos con el nuevo esquema de color.
- `script.js` — Lógica del juego (roles, modos, competitivo, copiar/pegar, cooperativo persistente, flujo de turnos con privacidad).

## GitHub Pages
1. Crea un repo y sube estos 3 archivos.
2. **Settings → Pages** → *Deploy from a branch* → `main` y carpeta raíz `/`.
3. Abre la URL que te da GitHub.

## Notas
- *Aleatorias (ES)* intentará usar Internet; si falla, usa respaldo local.
- El favicon sigue siendo opcional/no incluido.
