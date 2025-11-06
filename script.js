// ====== Datos locales (listas) ======
const wordsBanco = ['abogado','abrigo','actor','aeropuerto','agricultor','amarillo','amistad','amor','arquitecto','arroz','arte','astronauta','azul','ballena','banana','banco','baño','biblioteca','bicicleta','blanco','bolígrafo','bombero','bosque','botella','caballo','café','cama','camisa','cantante','carne','carpintero','castillo','cepillo','cerdo','chocolate','científico','cine','ciudad','coche','cocina','cocinero','cocodrilo','computadora','conejo','cuaderno','cuchara','cuchillo','delfín','dentista','desierto','destornillador','dinero','doctor','electricista','elefante','enfermedad','enfermero','ensalada','escritor','escuela','espejo','estación','estadio','familia','farmacia','felicidad','fiesta','fontanero','gafas','galleta','garaje','gato','gris','guerra','helado','hospital','hotel','huevo','iglesia','ingeniero','jabón','jardín','jirafa','juego','juez','leche','león','libro','llave','lobo','lámpara','lápiz','manzana','marrón','martillo','mecánico','mentira','mercado','mesa','miedo','mochila','mono','montaña','morado','muerte','museo','música','naranja','negro','oficina','oso','oveja','pan','panadero','pantalón','papel','paraguas','parque','pasta','pato','paz','perro','pescado','pez','piloto','pintor','pizza','plato','playa','policía','pollo','profesor','pueblo','puerta','queso','radio','rana','ratón','reloj','restaurante','rojo','rosa','salud','serpiente','silla','sofá','sombrero','sueño','supermercado','tarta','teatro','televisor','teléfono','tenedor','tiempo','tigre','tijeras','trabajo','tristeza','té','universidad','vaca','vaso','ventana','verdad','verde','veterinario','vida','violeta','zapato','zorro','águila'];
const wordsNaturales = ['abogado','abrigo','actor','aeropuerto','agricultor','alto','amarillo','amistad','amor','arquitecto','arroz','arte','astronauta','azul','bajo','ballena','banana','banco','baño','biblioteca','bicicleta','blanco','bolígrafo','bombero','bosque','botella','brillante','caballo','café','caliente','cama','camisa','cantante','carne','carpintero','castillo','cepillo','cerca','cerdo','chocolate','científico','cine','ciudad','coche','cocina','cocinero','cocodrilo','computadora','conejo','cuaderno','cuchara','cuchillo','delfín','dentista','desierto','destornillador','dinero','doctor','débil','electricista','elefante','enfermedad','enfermero','ensalada','escritor','escuela','espejo','estación','estadio','familia','farmacia','felicidad','feliz','fiesta','fontanero','frío','fuerte','gafas','galleta','garaje','gato','grande','gris','guerra','helado','hospital','hotel','huevo','iglesia','ingeniero','jabón','jardín','jirafa','juego','juez','leche','lejos','lento','león','libro','limpio','llave','lobo','lámpara','lápiz','manzana','marrón','martillo','mecánico','mentira','mercado','mesa','miedo','mochila','mono','montaña','morado','muerte','museo','música','naranja','negro','nuevo','oficina','oscuro','oso','oveja','pan','panadero','pantalón','papel','paraguas','parque','pasta','pato','paz','pequeño','perro','pescado','pez','piloto','pintor','pizza','plato','playa','policía','pollo','profesor','pueblo','puerta','queso','radio','rana','ratón','reloj','restaurante','rojo','rosa','rápido','salud','serpiente','silla','sofá','sombrero','sucio','sueño','supermercado','tarta','teatro','televisor','teléfono','tenedor','tiempo','tigre','tijeras','trabajo','triste','tristeza','té','universidad','vaca','vaso','ventana','verdad','verde','veterinario','vida','viejo','violeta','zapato','zorro','águila'];

// ====== Estado global ======
let players = [];
let scores = [];
let competitive = false;
let impostorCount = 1;
let impostorMode = 'fixed';
let wordMode = 'banco';
let secretWord = '';
let impostors = [];
let currentPlayerIndex = 0;

// Nombres por defecto
let useCustomNames = false;
let playerCount = 6;

// Cooperativo persistente
let coopContributionsByPlayer = {}; // { nombre: [palabras,...] }
let coopUsed = new Set();           // palabras ya usadas
let coopEntryIndex = 0;             // índice del jugador en la entrada privada

// ====== DOM ======
const configScreen = document.getElementById('configScreen');
const coopWordsScreen = document.getElementById('coopWordsScreen');
const roleScreen = document.getElementById('roleScreen');
const playScreen = document.getElementById('playScreen');
const mainMenu = document.getElementById('mainMenu');
const resultModal = document.getElementById('resultModal');

const playerCountInput = document.getElementById('playerCount');
const useCustomNamesCheckbox = document.getElementById('useCustomNames');
const customNamesWrap = document.getElementById('customNamesWrap');
const playerNamesInput = document.getElementById('playerNames');

const impFixedRadio = document.getElementById('impFixedRadio');
const impRandomRadio = document.getElementById('impRandomRadio');
const impCountInput = document.getElementById('impCount');
const wordModeSelect = document.getElementById('wordMode');
const customWordsSection = document.getElementById('customWordsSection');
const customWordsTextarea = document.getElementById('customWords');

const startButton = document.getElementById('startButton');
const copyConfigButton = document.getElementById('copyConfigButton');
const pasteConfigButton = document.getElementById('pasteConfigButton');

// Cooperativo privado
const coopTurnTitle = document.getElementById('coopTurnTitle');
const coopTextWrap = document.getElementById('coopTextWrap');
const coopWordArea = document.getElementById('coopWordArea');
const coopStartEntryBtn = document.getElementById('coopStartEntryBtn');
const coopHideEntryBtn = document.getElementById('coopHideEntryBtn');
const coopNextEntryBtn = document.getElementById('coopNextEntryBtn');
const coopHandoffTip = document.getElementById('coopHandoffTip');
const coopReuseBtn = document.getElementById('coopReuseBtn');

// Roles
const currentPlayerNameElem = document.getElementById('currentPlayerName');
const roleInstructions = document.getElementById('roleInstructions');
const roleTextElem = document.getElementById('roleText');
const showRoleBtn = document.getElementById('showRoleBtn');
const hideRoleBtn = document.getElementById('hideRoleBtn');
const nextPlayerBtn = document.getElementById('nextPlayerBtn');
const handoffTip = document.getElementById('handoffTip');

// Puntuación/flujo
const finishRoundButton = document.getElementById('finishRoundButton');
const goMenuButton = document.getElementById('goMenuButton');
const scoreboardBody = document.getElementById('scoreboardBody');
const newRoundButton = document.getElementById('newRoundButton');
const openConfigButton = document.getElementById('openConfigButton');
const copyScoreButton = document.getElementById('copyScoreButton');
const discoveredBtn = document.getElementById('discoveredBtn');
const notDiscoveredBtn = document.getElementById('notDiscoveredBtn');

// ====== Utilidades ======
function showSection(sectionElem) {
  [configScreen, coopWordsScreen, roleScreen, playScreen, mainMenu].forEach(sec => sec.classList.remove('active'));
  sectionElem.classList.add('active');
}
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
async function getRandomSpanishWord() {
  const candidates = [
    async () => {
      const r = await fetch('https://palabras-aleatorias-public-api.herokuapp.com/random');
      const j = await r.json();
      return (j && j.body && j.body.Word) ? j.body.Word.toLowerCase() : null;
    },
    async () => {
      const r = await fetch('https://random-word-api.herokuapp.com/word?number=1');
      const j = await r.json();
      return Array.isArray(j) && j.length ? String(j[0]).toLowerCase() : null;
    }
  ];
  for (const fn of candidates) {
    try { const w = await fn(); if (w && /^[a-záéíóúüñ]+$/i.test(w)) return w; } catch (e) {}
  }
  const list = wordsNaturales;
  return list[Math.floor(Math.random() * list.length)];
}

// ====== Roles y selección de palabra ======
function pickImpostors() {
  let numImpostors = 1;
  if (impostorMode === 'fixed') numImpostors = Math.min(impostorCount, players.length);
  else if (impostorMode === 'random') numImpostors = Math.floor(Math.random() * players.length) + 1;
  const indices = players.map((_, i) => i);
  shuffle(indices);
  impostors = indices.slice(0, numImpostors);
}

function startRoleScreen() {
  currentPlayerIndex = 0;
  setupRoleScreenForPlayer(currentPlayerIndex);
  showSection(roleScreen);
  roleTextElem.style.display = 'none';
  showRoleBtn.disabled = false;
  hideRoleBtn.disabled = true;
  nextPlayerBtn.disabled = true;
  handoffTip.style.display = 'none';
  roleInstructions.innerHTML = 'Solo <strong>este jugador</strong> debe mirar la pantalla. Pulsa <em>“Ver mi rol”</em> para verlo.';
}
function setupRoleScreenForPlayer(index) {
  currentPlayerNameElem.textContent = "Turno de: " + players[index];
  roleTextElem.textContent = impostors.includes(index) ? "Eres el impostor 👀" : secretWord;
  roleTextElem.style.display = 'none';
  showRoleBtn.disabled = false;
  hideRoleBtn.disabled = true;
  nextPlayerBtn.disabled = true;
  handoffTip.style.display = 'none';
}
function finishCurrentRoleView() {
  currentPlayerIndex++;
  if (currentPlayerIndex < players.length) {
    setupRoleScreenForPlayer(currentPlayerIndex);
  } else {
    showSection(playScreen);
    if (competitive) { finishRoundButton.textContent = "Finalizar Ronda"; goMenuButton.style.display = 'none'; }
    else { finishRoundButton.textContent = "Nueva Ronda"; goMenuButton.style.display = 'inline-block'; }
  }
}

// ====== Cooperativo: entrada privada ======
function startCoopPrivateEntry() {
  coopEntryIndex = 0;
  setupCoopEntryForPlayer(coopEntryIndex);
  showSection(coopWordsScreen);
  coopTextWrap.style.display = 'none';
  coopStartEntryBtn.disabled = false;
  coopHideEntryBtn.disabled = true;
  coopNextEntryBtn.disabled = true;
  coopHandoffTip.style.display = 'none';

  // Si ya hay palabras guardadas para todos, ofrecer reutilizar
  const complete = players.every(p => Array.isArray(coopContributionsByPlayer[p]) && coopContributionsByPlayer[p].length);
  coopReuseBtn.style.display = complete ? 'inline-block' : 'none';
}
function setupCoopEntryForPlayer(index) {
  const name = players[index];
  coopTurnTitle.textContent = "Turno de: " + name;
  coopWordArea.value = ""; // se muestra al pulsar comenzar
}
function saveCoopEntryForCurrent() {
  const name = players[coopEntryIndex];
  const words = coopWordArea.value.split('\n').map(w => w.trim()).filter(Boolean);
  coopContributionsByPlayer[name] = words;
}
function nextCoopEntry() {
  coopEntryIndex++;
  if (coopEntryIndex < players.length) {
    setupCoopEntryForPlayer(coopEntryIndex);
    coopTextWrap.style.display = 'none';
    coopStartEntryBtn.disabled = false;
    coopHideEntryBtn.disabled = true;
    coopNextEntryBtn.disabled = true;
    coopHandoffTip.style.display = 'none';
  } else {
    const ok = assignRolesAndPickWord();
    if (ok === 'random') getRandomSpanishWord().then(w => { secretWord = w; startRoleScreen(); });
    else if (ok) startRoleScreen();
  }
}

// ====== Cooperativo: selección persistente sin repetición ======
function computeCoopPoolForThisRound() {
  const nonImpostors = players.filter((_, idx) => !impostors.includes(idx));
  let pool = [];
  nonImpostors.forEach(p => {
    const arr = coopContributionsByPlayer[p] || [];
    pool.push(...arr);
  });
  pool = pool.filter(w => !coopUsed.has(w));
  if (!pool.length) {
    let all = [];
    Object.values(coopContributionsByPlayer).forEach(arr => all.push(...arr));
    all = all.filter(w => !coopUsed.has(w));
    pool = all;
  }
  return pool;
}

function assignRolesAndPickWord() {
  pickImpostors();

  if (wordMode === 'custom') {
    const list = customWordsTextarea.value.split(',').map(w => w.trim()).filter(Boolean);
    if (!list.length) { alert("Introduce palabras en 'Mis palabras'."); return false; }
    secretWord = list[Math.floor(Math.random() * list.length)];
    return true;
  }
  if (wordMode === 'random') {
    return 'random';
  }
  if (wordMode === 'common') {
    secretWord = wordsNaturales[Math.floor(Math.random() * wordsNaturales.length)];
    return true;
  }
  if (wordMode === 'banco') {
    secretWord = wordsBanco[Math.floor(Math.random() * wordsBanco.length)];
    return true;
  }
  if (wordMode === 'coop') {
    const pool = computeCoopPoolForThisRound();
    if (!pool.length) {
      alert("No quedan palabras disponibles. Vuelve a introducir palabras (Cooperativo).");
      startCoopPrivateEntry();
      return false;
    }
    secretWord = pool[Math.floor(Math.random() * pool.length)];
    coopUsed.add(secretWord);
    return true;
  }
  return false;
}

// ====== Puntuaciones ======
function updateScoreboardDisplay() {
  scoreboardBody.innerHTML = "";
  players.forEach((player, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${player}</td><td>${scores[i]}</td>`;
    scoreboardBody.appendChild(tr);
  });
}
function copyScoreboard() {
  let text = "Puntuaciones:\n";
  players.forEach((p, i) => text += p + ": " + scores[i] + " pts\n");
  const temp = document.createElement("textarea");
  temp.value = text; document.body.appendChild(temp); temp.select(); document.execCommand("copy"); document.body.removeChild(temp);
  alert("Puntuaciones copiadas.");
}

// ====== Config copiar/pegar ======
function copyConfiguration() {
  const configData = {
    players, scores, competitive, impostorMode, impostorCount, wordMode,
    useCustomNames, playerCount,
    coopContributionsByPlayer, coopUsed: Array.from(coopUsed)
  };
  try {
    const jsonStr = JSON.stringify(configData);
    const b64 = btoa(unescape(encodeURIComponent(jsonStr)));
    const temp = document.createElement("textarea");
    temp.value = b64; document.body.appendChild(temp); temp.select(); document.execCommand("copy"); document.body.removeChild(temp);
    alert("¡Configuración copiada! Usa 'Pegar configuración' para restaurarla.");
  } catch (e) { alert("Error al copiar la configuración."); }
}
function pasteConfiguration() {
  const code = prompt("Pega el código de configuración:");
  if (!code) return;
  try {
    const jsonStr = decodeURIComponent(escape(atob(code.trim())));
    const data = JSON.parse(jsonStr);
    players = data.players || [];
    scores = data.scores || players.map(() => 0);
    competitive = !!data.competitive;
    impostorMode = data.impostorMode || 'fixed';
    impostorCount = parseInt(data.impostorCount || 1, 10);
    wordMode = data.wordMode || 'banco';
    useCustomNames = !!data.useCustomNames;
    playerCount = parseInt(data.playerCount || players.length || 6, 10);
    coopContributionsByPlayer = data.coopContributionsByPlayer || {};
    coopUsed = new Set(Array.isArray(data.coopUsed) ? data.coopUsed : []);

    playerCountInput.value = playerCount;
    useCustomNamesCheckbox.checked = useCustomNames;
    customNamesWrap.style.display = useCustomNames ? 'block' : 'none';
    playerNamesInput.value = players.join(", ");
    if (impostorMode === 'fixed') { impFixedRadio.checked = true; impRandomRadio.checked = false; impCountInput.disabled = false; impCountInput.value = impostorCount; }
    else { impFixedRadio.checked = false; impRandomRadio.checked = true; impCountInput.disabled = true; }
    wordModeSelect.value = wordMode;
    customWordsSection.style.display = (wordMode === 'custom') ? 'block' : 'none';
    alert("Configuración cargada. Revisa y pulsa 'Comenzar Ronda'.");
  } catch (e) { alert("Código inválido."); }
}

// ====== Eventos ======
impFixedRadio.addEventListener('change', () => { if (impFixedRadio.checked) impCountInput.disabled = false; });
impRandomRadio.addEventListener('change', () => { if (impRandomRadio.checked) impCountInput.disabled = true; });
wordModeSelect.addEventListener('change', () => {
  const mode = wordModeSelect.value;
  customWordsSection.style.display = (mode === 'custom') ? 'block' : 'none';
});
useCustomNamesCheckbox.addEventListener('change', () => {
  useCustomNames = useCustomNamesCheckbox.checked;
  customNamesWrap.style.display = useCustomNames ? 'block' : 'none';
});

startButton.addEventListener('click', () => {
  playerCount = parseInt(playerCountInput.value || '6', 10);
  if (playerCount < 2) { alert("Mínimo 2 jugadores."); return; }

  if (useCustomNames) {
    const namesStr = playerNamesInput.value.trim();
    if (!namesStr) { alert("Introduce nombres o desactiva 'Usar nombres personalizados'."); return; }
    players = namesStr.split(',').map(n => n.trim()).filter(Boolean);
  } else {
    players = Array.from({length: playerCount}, (_, i) => "Jugador" + (i + 1));
  }

  if (!players.length) { alert("No hay jugadores."); return; }
  scores = players.map(() => 0);

  impostorMode = impFixedRadio.checked ? 'fixed' : 'random';
  impostorCount = parseInt(impCountInput.value || '1', 10);
  wordMode = wordModeSelect.value;

  competitive = confirm("¿Activar modo competitivo (puntuaciones)?");

  if (wordMode === 'coop') {
    startCoopPrivateEntry();
  } else {
    const r = assignRolesAndPickWord();
    if (r === 'random') getRandomSpanishWord().then(w => { secretWord = w; startRoleScreen(); });
    else if (r) startRoleScreen();
  }
});

// Cooperativo privado — botones
coopStartEntryBtn.addEventListener('click', () => {
  const name = players[coopEntryIndex];
  const prev = coopContributionsByPlayer[name];
  coopWordArea.value = Array.isArray(prev) ? prev.join('\n') : "";
  coopTextWrap.style.display = 'block';
  coopStartEntryBtn.disabled = true;
  coopHideEntryBtn.disabled = false;
  coopNextEntryBtn.disabled = true;
  coopHandoffTip.style.display = 'block';
});
coopHideEntryBtn.addEventListener('click', () => {
  const hasSomething = coopWordArea.value.trim().length > 0;
  if (!hasSomething && !confirm("No has escrito palabras. ¿Guardar vacío igualmente?")) return;
  const name = players[coopEntryIndex];
  const words = coopWordArea.value.split('\n').map(w => w.trim()).filter(Boolean);
  coopContributionsByPlayer[name] = words;
  coopTextWrap.style.display = 'none';
  coopHideEntryBtn.disabled = true;
  coopNextEntryBtn.disabled = false;
  coopHandoffTip.style.display = 'none';
});
coopNextEntryBtn.addEventListener('click', () => {
  coopEntryIndex++;
  if (coopEntryIndex < players.length) {
    setupCoopEntryForPlayer(coopEntryIndex);
    coopStartEntryBtn.disabled = false;
    coopHideEntryBtn.disabled = true;
    coopNextEntryBtn.disabled = true;
  } else {
    const ok = assignRolesAndPickWord();
    if (ok === 'random') getRandomSpanishWord().then(w => { secretWord = w; startRoleScreen(); });
    else if (ok) startRoleScreen();
  }
});
coopReuseBtn.addEventListener('click', () => {
  const ok = assignRolesAndPickWord();
  if (ok === 'random') getRandomSpanishWord().then(w => { secretWord = w; startRoleScreen(); });
  else if (ok) startRoleScreen();
});

// Roles — botones
showRoleBtn.addEventListener('click', () => {
  roleTextElem.style.display = 'block';
  showRoleBtn.disabled = true;
  hideRoleBtn.disabled = false;
  nextPlayerBtn.disabled = true;
  handoffTip.style.display = 'block';
  roleInstructions.textContent = "Cuando termines, oculta tu rol y pasa el móvil al siguiente.";
});
hideRoleBtn.addEventListener('click', () => {
  roleTextElem.style.display = 'none';
  hideRoleBtn.disabled = true;
  nextPlayerBtn.disabled = false;
  roleInstructions.textContent = "Rol oculto. Entrega el móvil al siguiente jugador.";
});
nextPlayerBtn.addEventListener('click', () => {
  nextPlayerBtn.disabled = true;
  finishCurrentRoleView();
  roleInstructions.innerHTML = 'Solo <strong>este jugador</strong> debe mirar la pantalla. Pulsa <em>“Ver mi rol”</em> para verlo.';
  handoffTip.style.display = 'none';
});

// Flujo de rondas
finishRoundButton.addEventListener('click', () => {
  if (competitive) {
    resultModal.style.display = 'flex';
  } else {
    const r = assignRolesAndPickWord();
    if (r === 'random') getRandomSpanishWord().then(w => { secretWord = w; startRoleScreen(); });
    else if (r) startRoleScreen();
  }
});
goMenuButton.addEventListener('click', () => {
  updateScoreboardDisplay();
  copyScoreButton.style.display = 'none';
  showSection(mainMenu);
});
newRoundButton.addEventListener('click', () => {
  const r = assignRolesAndPickWord();
  if (r === 'random') getRandomSpanishWord().then(w => { secretWord = w; startRoleScreen(); });
  else if (r) startRoleScreen();
});

// Puntuaciones modal competitivo
discoveredBtn.addEventListener('click', () => {
  players.forEach((_, idx) => { if (!impostors.includes(idx)) scores[idx] += 1; });
  closeResultAndShowMenu();
});
notDiscoveredBtn.addEventListener('click', () => {
  players.forEach((_, idx) => { if (impostors.includes(idx)) scores[idx] += 2; });
  closeResultAndShowMenu();
});
function closeResultAndShowMenu() {
  resultModal.style.display = 'none';
  updateScoreboardDisplay();
  copyScoreButton.style.display = 'inline-block';
  showSection(mainMenu);
}

// Copiar/pegar y navegación
copyConfigButton.addEventListener('click', copyConfiguration);
pasteConfigButton.addEventListener('click', pasteConfiguration);
openConfigButton.addEventListener('click', () => { showSection(configScreen); });
copyScoreButton.addEventListener('click', copyScoreboard);
