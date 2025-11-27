// Estado inicial del Tamagotchi
let estado = {
    hambre: 0,      // 0 = lleno, 100 = muriendo de hambre
    energia: 100,   // 100 = lleno de energía, 0 = exhausto
    felicidad: 100  // 100 = muy feliz, 0 = deprimido
};

let isAnimating = false;

// Referencias al DOM
const hungerBar = document.getElementById('hunger-bar');
const energyBar = document.getElementById('energy-bar');
const happinessBar = document.getElementById('happiness-bar');
const hungerVal = document.getElementById('hunger-val');
const energyVal = document.getElementById('energy-val');
const happinessVal = document.getElementById('happiness-val');
const messageBox = document.getElementById('ai-message');
const statusIcon = document.getElementById('status-icon');
const petImg = document.getElementById('pet-img');

// Imágenes
const IMG_IDLE = "hornet.png";
const IMG_ATTACK = "hornet_attack.png";
const IMG_SLEEP = "hornet_sleep.png";
const IMG_SAD = "hornet_sad.png";

// Función "IA" Básica
function evaluarEstado() {
    // Lógica solicitada por el usuario
    if (estado.hambre > 70) {
        statusIcon.innerText = "🕸️";
        return "¡Necesito seda para mi aguja!";
    }

    if (estado.energia < 20) {
        statusIcon.innerText = "💤";
        return "Mi fuerza se desvanece...";
    }

    if (estado.felicidad < 30) {
        statusIcon.innerText = "💔";
        return "El vacío se acerca...";
    }

    // Estados intermedios
    if (estado.hambre > 40) {
        statusIcon.innerText = "🕷️";
        return "Podría cazar algo pronto.";
    }

    if (estado.felicidad > 80 && estado.energia > 80) {
        statusIcon.innerText = "✨";
        return "¡Shaw! ¡Lista para la batalla!";
    }

    statusIcon.innerText = "";
    return "Vigilando Pharloom.";
}

// Actualizar la interfaz
function updateUI() {
    // Actualizar barras
    hungerBar.style.width = `${estado.hambre}%`;
    energyBar.style.width = `${estado.energia}%`;
    happinessBar.style.width = `${estado.felicidad}%`;

    // Actualizar textos
    hungerVal.innerText = `${Math.round(estado.hambre)}%`;
    energyVal.innerText = `${Math.round(estado.energia)}%`;
    happinessVal.innerText = `${Math.round(estado.felicidad)}%`;

    // Obtener mensaje de la "IA"
    const mensaje = evaluarEstado();
    messageBox.innerText = mensaje;

    // Actualizar Avatar (Solo si no está animando una acción)
    if (!isAnimating) {
        updateAvatarState();
    }
}

function updateAvatarState() {
    petImg.className = "pet-img"; // Reset classes

    if (estado.energia < 20) {
        petImg.src = IMG_SLEEP;
        petImg.classList.add("anim-sleep");
    } else if (estado.felicidad < 30 || estado.hambre > 70) {
        petImg.src = IMG_SAD;
        petImg.classList.add("anim-sad");
    } else {
        petImg.src = IMG_IDLE;
        petImg.classList.add("anim-idle");
    }
}

// Acciones del usuario
function feed() {
    if (estado.hambre <= 0) {
        messageBox.innerText = "¡Mi carrete está lleno!";
        return;
    }
    estado.hambre = Math.max(0, estado.hambre - 20);
    estado.energia = Math.max(0, estado.energia - 5);
    updateUI();
    animarAccion(IMG_ATTACK, "anim-attack", "🕸️");
}

function sleep() {
    if (estado.energia >= 100) {
        messageBox.innerText = "¡No necesito descansar!";
        return;
    }
    estado.energia = Math.min(100, estado.energia + 40);
    estado.hambre = Math.min(100, estado.hambre + 10);
    updateUI();
    animarAccion(IMG_SLEEP, "anim-sleep", "🪑", 2000); // Dormir toma más tiempo
}

function play() {
    if (estado.energia < 10) {
        messageBox.innerText = "Demasiado débil para entrenar...";
        return;
    }
    estado.felicidad = Math.min(100, estado.felicidad + 20);
    estado.energia = Math.max(0, estado.energia - 15);
    estado.hambre = Math.min(100, estado.hambre + 10);
    updateUI();
    animarAccion(IMG_ATTACK, "anim-attack", "⚔️");
}

function animarAccion(imgSrc, animClass, icon, duration = 1000) {
    if (isAnimating) return;
    isAnimating = true;

    // Cambiar imagen y animación
    petImg.src = imgSrc;
    petImg.className = "pet-img " + animClass;
    statusIcon.innerText = icon;

    setTimeout(() => {
        isAnimating = false;
        updateUI(); // Restaurar estado normal
    }, duration);
}

// Ciclo de vida (Game Loop)
setInterval(() => {
    // El hambre sube
    estado.hambre = Math.min(100, estado.hambre + 2);

    // La energía baja
    estado.energia = Math.max(0, estado.energia - 1);

    // La felicidad baja
    estado.felicidad = Math.max(0, estado.felicidad - 1);

    updateUI();
}, 2000); // Cada 2 segundos cambian las estadísticas

// Inicializar
updateUI();
