// ===== CONFIGURACIÓN INICIAL =====
// Variables globales para almacenar el estado de la alarma
let alarmTime = null;           // Hora de alarma configurada (formato HH:MM)
let alarmActive = false;        // Si hay una alarma establecida
let is24HourFormat = true;      // Formato de hora (true = 24h, false = 12h)
let alarmTriggered = false;     // Si la alarma ya sonó

// Nombres de los meses en español
const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

// Nombres de los días en español
const dayNames = [
    'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
];

// ===== REFERENCIAS A ELEMENTOS DEL DOM =====
const clockDisplay = document.getElementById('clockDisplay');
const dateDisplay = document.getElementById('dateDisplay');
const alarmTimeInput = document.getElementById('alarmTime');
const setAlarmBtn = document.getElementById('setAlarmBtn');
const cancelAlarmBtn = document.getElementById('cancelAlarmBtn');
const alarmStatus = document.getElementById('alarmStatus');
const notification = document.getElementById('notification');
const alarmOverlay = document.getElementById('alarmOverlay');
const dismissBtn = document.getElementById('dismissBtn');
const formatToggle = document.getElementById('formatToggle');
const greeting = document.getElementById('greeting');
const alarmNotificationTime = document.getElementById('alarmNotificationTime');

// ===== FUNCIÓN PARA FORMATEAR NÚMEROS CON CEROS A LA IZQUIERDA =====
/**
 * Formatea un número agregando ceros a la izquierda si es necesario
 * @param {number} num - Número a formatear
 * @returns {string} Número formateado con dos dígitos
 */
function padZero(num) {
    return num < 10 ? '0' + num : num;
}

// ===== FUNCIÓN PARA ACTUALIZAR EL RELOJ =====
/**
 * Actualiza el display del reloj con la hora actual
 * Calcula la hora en el formato seleccionado (12h o 24h)
 */
function updateClock() {
    const now = new Date();
    
    // Obtener hora, minutos y segundos
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    
    // Convertir a formato 12h si es necesario
    if (!is24HourFormat) {
        hours = hours % 12 || 12;
    }
    
    // Formatear con ceros a la izquierda
    const timeString = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    
    // Actualizar el display
    clockDisplay.textContent = timeString;
    
    // Actualizar la fecha
    updateDate();
    
    // Actualizar saludo según la hora
    updateGreeting();
    
    // Verificar si la alarma debe sonar
    checkAlarm();
}

// ===== FUNCIÓN PARA ACTUALIZAR LA FECHA =====
/**
 * Actualiza el display de la fecha en formato: Día, DD de Mes de YYYY
 */
function updateDate() {
    const now = new Date();
    const day = dayNames[now.getDay()];
    const date = padZero(now.getDate());
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();
    
    const dateString = `${day}, ${date} de ${month} de ${year}`;
    dateDisplay.textContent = dateString;
}

// ===== FUNCIÓN PARA ACTUALIZAR EL SALUDO =====
/**
 * Muestra un saludo diferente según la hora del día
 * Buenos días: 5 - 12
 * Buenas tardes: 12 - 19
 * Buenas noches: 19 - 5
 */
function updateGreeting() {
    const now = new Date();
    const hours = now.getHours();
    
    let saludo = '';
    let color = '';
    
    if (hours >= 5 && hours < 12) {
        saludo = '¡Buenos días!';
        color = '#FFD700'; // Dorado
    } else if (hours >= 12 && hours < 19) {
        saludo = '¡Buenas tardes!';
        color = '#FF8C00'; // Naranja
    } else {
        saludo = '¡Buenas noches!';
        color = '#87CEEB'; // Azul cielo
    }
    
    greeting.textContent = saludo;
    greeting.style.color = color;
}

// ===== FUNCIÓN PARA ESTABLECER LA ALARMA =====
/**
 * Establece una nueva alarma basada en el input del usuario
 * Valida que la hora sea futura antes de establecerla
 */
function setAlarm() {
    const inputTime = alarmTimeInput.value;
    
    // Validar que se haya seleccionado una hora
    if (!inputTime) {
        alert('Por favor selecciona una hora para la alarma');
        return;
    }
    
    // Obtener hora actual
    const now = new Date();
    const currentHours = padZero(now.getHours());
    const currentMinutes = padZero(now.getMinutes());
    const currentTime = `${currentHours}:${currentMinutes}`;
    
    // Validar que la hora sea futura
    if (inputTime <= currentTime) {
        alert('La hora de alarma debe ser en el futuro. Intenta mañana o selecciona una hora más tarde.');
        return;
    }
    
    // Guardar la alarma
    alarmTime = inputTime;
    alarmActive = true;
    alarmTriggered = false;
    
    // Actualizar UI
    updateAlarmStatus();
    
    // Desabilitar botón de establecer y habilitar el de cancelar
    setAlarmBtn.disabled = true;
    cancelAlarmBtn.disabled = false;
    alarmTimeInput.disabled = true;
    
    console.log(`Alarma establecida para las ${alarmTime}`);
}

// ===== FUNCIÓN PARA CANCELAR LA ALARMA =====
/**
 * Cancela la alarma activa y restaura los controles
 */
function cancelAlarm() {
    alarmTime = null;
    alarmActive = false;
    alarmTriggered = false;
    
    // Limpiar el input
    alarmTimeInput.value = '';
    
    // Actualizar UI
    updateAlarmStatus();
    
    // Habilitar botón de establecer y desabilitar el de cancelar
    setAlarmBtn.disabled = false;
    cancelAlarmBtn.disabled = true;
    alarmTimeInput.disabled = false;
    
    // Ocultar notificación si está visible
    notification.classList.remove('show');
    alarmOverlay.classList.remove('show');
    
    console.log('Alarma cancelada');
}

// ===== FUNCIÓN PARA ACTUALIZAR EL ESTADO DE LA ALARMA =====
/**
 * Actualiza el mensaje indicando el estado actual de la alarma
 */
function updateAlarmStatus() {
    const statusText = alarmStatus.querySelector('.status-text');
    
    if (alarmActive) {
        alarmStatus.classList.add('active');
        statusText.textContent = `⏰ Alarma configurada para las ${alarmTime}`;
    } else {
        alarmStatus.classList.remove('active');
        statusText.textContent = '⏳ Sin alarma configurada';
    }
}

// ===== FUNCIÓN PARA VERIFICAR LA ALARMA =====
/**
 * Compara la hora actual con la hora de alarma configurada
 * Si coinciden, desencadena la alarma
 */
function checkAlarm() {
    // Si no hay alarma activa o ya sonó, salir
    if (!alarmActive || alarmTriggered) {
        return;
    }
    
    const now = new Date();
    const currentHours = padZero(now.getHours());
    const currentMinutes = padZero(now.getMinutes());
    const currentTime = `${currentHours}:${currentMinutes}`;
    
    // Si la hora actual coincide con la hora de alarma
    if (currentTime === alarmTime) {
        triggerAlarm();
    }
}

// ===== FUNCIÓN PARA DESENCADENAR LA ALARMA =====
/**
 * Ejecuta todas las acciones cuando la alarma suena:
 * - Muestra notificación visual
 * - Reproduce sonido (simulado con alert)
 * - Marca la alarma como disparada
 */
function triggerAlarm() {
    alarmTriggered = true;
    
    // Mostrar notificación visual
    notification.classList.add('show');
    alarmOverlay.classList.add('show');
    
    // Mostrar hora de la alarma en la notificación
    alarmNotificationTime.textContent = `Hora: ${alarmTime}`;
    
    // Reproducir sonido (simulado con alert y sonidos del navegador)
    playAlarmSound();
    
    console.log('¡LA ALARMA ESTÁ SONANDO!');
}

// ===== FUNCIÓN PARA REPRODUCIR SONIDO DE ALARMA =====
/**
 * Reproduce un sonido de alarma usando la API Web Audio
 * Si no es posible, usa alert() como fallback
 */
function playAlarmSound() {
    try {
        // Crear contexto de audio
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Crear oscilador para generar un sonido de alarma
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        // Conectar oscilador al nodo de ganancia
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Configurar el sonido (frecuencia de alarma típica: 800Hz)
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        // Configurar volumen
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        
        // Duración de 2 segundos
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 2);
        
        // Hacer un patrón de beeps (alternar sonido)
        let beepCount = 0;
        const beepInterval = setInterval(() => {
            if (beepCount >= 4 || !alarmTriggered) {
                clearInterval(beepInterval);
                return;
            }
            
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            
            osc.frequency.value = 800;
            osc.type = 'sine';
            
            gain.gain.setValueAtTime(0.3, audioContext.currentTime);
            
            osc.start(audioContext.currentTime);
            osc.stop(audioContext.currentTime + 0.3);
            
            beepCount++;
        }, 500);
        
    } catch (error) {
        // Fallback: usar alert si Web Audio API no está disponible
        alert('¡¡¡ALARMA!!!');
        console.log('Web Audio API no disponible, usando alert como fallback');
    }
}

// ===== FUNCIÓN PARA TOGGLE DE FORMATO 12H/24H =====
/**
 * Cambia entre formato 12 horas y 24 horas
 */
function toggleFormat() {
    is24HourFormat = !is24HourFormat;
    formatToggle.textContent = is24HourFormat ? '24h' : '12h';
    updateClock();
}

// ===== EVENT LISTENERS =====
// Botón para establecer alarma
setAlarmBtn.addEventListener('click', setAlarm);

// Botón para cancelar alarma
cancelAlarmBtn.addEventListener('click', cancelAlarm);

// Permitir establecer alarma con Enter en el input
alarmTimeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        setAlarm();
    }
});

// Botón para desactivar la notificación
dismissBtn.addEventListener('click', cancelAlarm);

// Toggle de formato
formatToggle.addEventListener('click', toggleFormat);

// ===== INICIALIZACIÓN =====
/**
 * Inicializa la aplicación al cargar la página
 */
function init() {
    console.log('Inicializando reloj digital con alarma...');
    
    // Desabilitar botón de cancelar al inicio
    cancelAlarmBtn.disabled = true;
    
    // Actualizar reloj inmediatamente
    updateClock();
    
    // Actualizar reloj cada segundo
    setInterval(updateClock, 1000);
    
    console.log('Reloj inicializado correctamente');
}

// Ejecutar inicialización cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
