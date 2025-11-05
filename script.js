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

// ====== DOM ======
const configScreen = document.getElementById('configScreen');
const coopWordsScreen = document.getElementById('coopWordsScreen');
const roleScreen = document.getElementById('roleScreen');
const playScreen = document.getElementById('playScreen');
const mainMenu = document.getElementById('mainMenu');
const resultModal = document.getElementById('resultModal');

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

const coopInputsContainer = document.getElementById('coopInputsContainer');
const coopContinueButton = document.getElementById('coopContinueButton');

const currentPlayerNameElem = document.getElementById('currentPlayerName');
const roleTextElem = document.getElementById('roleText');
const toggleRoleBtn = document.getElementById('toggleRoleBtn');

const finishRoundButton = document.getElementById('finishRoundButton');
const goMenuButton = document.getElementById('goMenuButton');

const scoreboardTitle = document.getElementById('scoreboardTitle');
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
  // Intenta usar APIs (si hay internet); si fallan, usa respaldo local
  const candidates = [
    // Nota: Estas APIs pueden cambiar o no estar disponibles.
    // Se prueban y si fallan se usa el respaldo local.
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
    try {
      const w = await fn();
      if (w && /^[a-záéíóúüñ]+$/i.test(w)) return w;
    } catch (e) { /* continúa */ }
  }
  const list = wordsNaturales;
  return list[Math.floor(Math.random() * list.length)];
}

// ====== Lógica principal ======
function assignRolesAndStartRound() {
  impostors = [];
  let numImpostors = 1;
  if (impostorMode === 'fixed') {
    numImpostors = Math.min(impostorCount, players.length);
  } else if (impostorMode === 'random') {
    numImpostors = Math.floor(Math.random() * players.length) + 1;
  }
  const indices = players.map((_, i) => i);
  shuffle(indices);
  impostors = indices.slice(0, numImpostors);

  if (wordMode === 'custom') {
    const customWordsList = customWordsTextarea.value.split(',').map(w => w.trim()).filter(w => w);
    if (!customWordsList.length) { alert("Introduce palabras en 'Mis palabras'."); return; }
    secretWord = customWordsList[Math.floor(Math.random() * customWordsList.length)];
    startRoleScreen();
  } else if (wordMode === 'random') {
    // Puede requerir internet; si no hay, usa respaldo local
    getRandomSpanishWord().then(w => { secretWord = w; startRoleScreen(); });
  } else if (wordMode === 'common') {
    secretWord = wordsNaturales[Math.floor(Math.random() * wordsNaturales.length)];
    startRoleScreen();
  } else if (wordMode === 'banco') {
    secretWord = wordsBanco[Math.floor(Math.random() * wordsBanco.length)];
    startRoleScreen();
  }
}

function startRoleScreen() {
  currentPlayerIndex = 0;
  setupRoleScreenForPlayer(currentPlayerIndex);
  showSection(roleScreen);
  roleTextElem.style.display = 'none';
  toggleRoleBtn.textContent = '👁 Mostrar';
}

function setupRoleScreenForPlayer(index) {
  currentPlayerNameElem.textContent = "Jugador: " + players[index];
  roleTextElem.textContent = impostors.includes(index) ? "Eres el impostor 👀" : secretWord;
  roleTextElem.style.display = 'none';
  toggleRoleBtn.textContent = '👁 Mostrar';
}

function finishCurrentRoleView() {
  roleTextElem.style.display = 'none';
  currentPlayerIndex++;
  if (currentPlayerIndex < players.length) {
    setupRoleScreenForPlayer(currentPlayerIndex);
  } else {
    showSection(playScreen);
    if (competitive) {
      finishRoundButton.textContent = "Finalizar Ronda";
      goMenuButton.style.display = 'none';
    } else {
      finishRoundButton.textContent = "Nueva Ronda";
      goMenuButton.style.display = 'inline-block';
    }
  }
}

function updateScoreboardDisplay() {
  scoreboardBody.innerHTML = "";
  players.forEach((player, i) => {
    const tr = document.createElement('tr');
    const nameTd = document.createElement('td');
    const scoreTd = document.createElement('td');
    nameTd.textContent = player;
    scoreTd.textContent = scores[i];
    tr.appendChild(nameTd);
    tr.appendChild(scoreTd);
    scoreboardBody.appendChild(tr);
  });
}

function copyConfiguration() {
  const configData = { players, scores, competitive, impostorMode, impostorCount, wordMode };
  try {
    const jsonStr = JSON.stringify(configData);
    const b64 = btoa(unescape(encodeURIComponent(jsonStr)));
    const temp = document.createElement("textarea");
    temp.value = b64;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
    alert("¡Configuración copiada! Usa 'Pegar configuración' para restaurarla.");
  } catch (e) {
    alert("Error al copiar la configuración.");
  }
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

    document.getElementById('playerNames').value = players.join(", ");
    if (impostorMode === 'fixed') {
      document.getElementById('impFixedRadio').checked = true;
      document.getElementById('impRandomRadio').checked = false;
      document.getElementById('impCount').disabled = false;
      document.getElementById('impCount').value = impostorCount;
    } else {
      document.getElementById('impFixedRadio').checked = false;
      document.getElementById('impRandomRadio').checked = true;
      document.getElementById('impCount').disabled = true;
    }
    document.getElementById('wordMode').value = wordMode;
    document.getElementById('customWordsSection').style.display = (wordMode === 'custom') ? 'block' : 'none';
    alert("Configuración cargada. Revisa y pulsa 'Comenzar Ronda'.");
  } catch (e) {
    alert("Código inválido.");
  }
}

function copyScoreboard() {
  let text = "Puntuaciones:\n";
  players.forEach((p, i) => text += p + ": " + scores[i] + " pts\n");
  const temp = document.createElement("textarea");
  temp.value = text;
  document.body.appendChild(temp);
  temp.select();
  document.execCommand("copy");
  document.body.removeChild(temp);
  alert("Puntuaciones copiadas.");
}

// ====== Eventos ======
impFixedRadio.addEventListener('change', () => { if (impFixedRadio.checked) impCountInput.disabled = false; });
impRandomRadio.addEventListener('change', () => { if (impRandomRadio.checked) impCountInput.disabled = true; });

wordModeSelect.addEventListener('change', () => {
  const mode = wordModeSelect.value;
  customWordsSection.style.display = (mode === 'custom') ? 'block' : 'none';
});

startButton.addEventListener('click', () => {
  const namesStr = playerNamesInput.value.trim();
  if (!namesStr) { alert("Introduce al menos un jugador."); return; }
  players = namesStr.split(',').map(n => n.trim()).filter(Boolean);
  if (!players.length) { alert("Introduce al menos un jugador."); return; }
  scores = players.map(() => 0);

  impostorMode = impFixedRadio.checked ? 'fixed' : 'random';
  impostorCount = parseInt(impCountInput.value || '1', 10);
  wordMode = wordModeSelect.value;

  competitive = confirm("¿Activar modo competitivo (puntuaciones)?");

  if (wordMode === 'coop') {
    coopInputsContainer.innerHTML = "";
    players.forEach(player => {
      const label = document.createElement('label');
      label.textContent = player + ":";
      const textarea = document.createElement('textarea');
      textarea.id = "words_" + player;
      textarea.placeholder = "Palabras de " + player + " (una por línea)";
      coopInputsContainer.appendChild(label);
      coopInputsContainer.appendChild(textarea);
    });
    showSection(coopWordsScreen);
  } else {
    assignRolesAndStartRound();
  }
});

coopContinueButton.addEventListener('click', () => {
  let contributions = [];
  const byPlayer = {};
  players.forEach(p => {
    const t = document.getElementById("words_" + p);
    const words = t ? t.value.split('\n').map(w => w.trim()).filter(Boolean) : [];
    byPlayer[p] = words;
    contributions = contributions.concat(words.map(w => ({ word: w, player: p })));
  });
  if (!contributions.length) { alert("Introduce al menos una palabra entre todos."); return; }

  // Elegir impostores
  let numImpostors = 1;
  if (impostorMode === 'fixed') numImpostors = Math.min(impostorCount, players.length);
  else if (impostorMode === 'random') numImpostors = Math.floor(Math.random() * players.length) + 1;
  const indices = players.map((_, i) => i);
  shuffle(indices);
  impostors = indices.slice(0, numImpostors);

  const nonImpostors = players.filter((_, idx) => !impostors.includes(idx));
  let pool = [];
  contributions.forEach(item => { if (nonImpostors.includes(item.player)) pool.push(item.word); });
  if (!pool.length) pool = contributions.map(i => i.word);
  secretWord = pool[Math.floor(Math.random() * pool.length)];

  startRoleScreen();
});

toggleRoleBtn.addEventListener('click', () => {
  if (roleTextElem.style.display === 'none') {
    roleTextElem.style.display = 'block';
    toggleRoleBtn.textContent = '🙈 Ocultar';
  } else {
    roleTextElem.style.display = 'none';
    finishCurrentRoleView();
  }
});

finishRoundButton.addEventListener('click', () => {
  if (competitive) {
    resultModal.style.display = 'flex';
  } else {
    assignRolesAndStartRound();
  }
});

goMenuButton.addEventListener('click', () => {
  updateScoreboardDisplay();
  copyScoreButton.style.display = 'none';
  showSection(mainMenu);
});

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

newRoundButton.addEventListener('click', () => {
  if (wordMode === 'coop') {
    coopInputsContainer.innerHTML = "";
    players.forEach(player => {
      const label = document.createElement('label');
      label.textContent = player + ":";
      const textarea = document.createElement('textarea');
      textarea.id = "words_" + player;
      textarea.placeholder = "Palabras de " + player + " (una por línea)";
      coopInputsContainer.appendChild(label);
      coopInputsContainer.appendChild(textarea);
    });
    showSection(coopWordsScreen);
  } else {
    assignRolesAndStartRound();
  }
});

openConfigButton.addEventListener('click', () => { showSection(configScreen); });
copyConfigButton.addEventListener('click', copyConfiguration);
pasteConfigButton.addEventListener('click', pasteConfiguration);
copyScoreButton.addEventListener('click', copyScoreboard);
