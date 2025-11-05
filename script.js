const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));

const state = {jugadores:[],modo:'mis',impCount:1,impModo:'fixed',competitivo:false,palabra:null,i:0,vis:false};

const LOCAL_5000 = ['árbol','coche','casa','perro','gato','mesa','ciudad','río','flor','libro','puerta','mar','montaña','sol','luna','estrella','escuela','vino','queso','foto','música','familia','amigo','computadora','cielo','isla','jardín','planta','reloj','camino','barco','tren','avión','hospital','mujer','hombre','niño','pan','tierra','agua','fuego','aire','bosque','playa','pueblo','parque','cine','teatro','restaurante','biblioteca','museo','mercado'];

function show(id){$$('.view').forEach(v=>v.classList.remove('active'));$('#'+id).classList.add('active');}
function toast(msg){const t=document.createElement('div');t.className='toast';t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),1800);}

$('#btn-empezar').onclick=()=>show('view-setup');
$('#btn-prev-home').onclick=()=>show('view-home');

$$('.tab').forEach(btn=>btn.onclick=()=>{ $$('.tab').forEach(x=>x.classList.remove('active'));btn.classList.add('active');state.modo=btn.dataset.mode;$$('.panel').forEach(p=>p.classList.remove('active'));$('#panel-'+state.modo).classList.add('active');});

$('#btn-copy-config').onclick=async()=>{try{await navigator.clipboard.writeText(JSON.stringify(state));toast('Configuración copiada');}catch(e){toast('Error al copiar');}};
$('#btn-paste-config').onclick=async()=>{const txt=prompt('Pega aquí la configuración:');if(!txt)return;try{Object.assign(state,JSON.parse(txt));toast('Configuración cargada');}catch(e){alert('Formato inválido');}};

function palabraLocal(){return LOCAL_5000[Math.floor(Math.random()*LOCAL_5000.length)];}

$('#btn-comenzar').onclick=()=>{let palabra='';if(state.modo==='mis'){const arr=($('#lista-palabras').value||'').split(',').map(s=>s.trim()).filter(Boolean);palabra=arr.length?arr[Math.floor(Math.random()*arr.length)]:palabraLocal();}else if(state.modo==='aleatorias'||state.modo==='local'){palabra=palabraLocal();}else{palabra=palabraLocal();}state.palabra=palabra;state.i=0;state.vis=false;setReveal();show('view-reveal');};

$('#btn-toggle').onclick=()=>{state.vis=!state.vis;setReveal();};
$('#btn-siguiente').onclick=()=>{state.i++;state.vis=false;if(state.i>=state.jugadores.length)state.i=0;setReveal();};

function setReveal(){const box=$('#contenido');if(state.vis){box.textContent=state.palabra;box.classList.remove('hidden');$('#btn-toggle').textContent='🙈 Ocultar';}else{box.textContent='— Oculto —';box.classList.add('hidden');$('#btn-toggle').textContent='👁 Mostrar';}};