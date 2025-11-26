# Reloj Digital Interactivo con Alarma ⏰

Un reloj digital moderno y completamente funcional con sistema de alarma integrado, diseñado con estética tipo pantalla digital con efecto "cyberpunk".

## 🌟 Características

### 📱 Display Principal
- **Reloj Digital**: Muestra la hora en formato HH:MM:SS con fuente grande y legible
- **Fecha Completa**: Muestra el día, fecha y mes en español (ej: "Lunes, 26 de Noviembre de 2025")
- **Saludo Dinámico**: Cambia automáticamente según la hora del día
  - Buenos días (5:00 - 11:59)
  - Buenas tardes (12:00 - 18:59)
  - Buenas noches (19:00 - 4:59)

### ⏰ Sistema de Alarma
- **Configuración de Hora**: Selector de hora intuitivocon input `type="time"`
- **Validación**: Verifica que la hora sea futura antes de establecer la alarma
- **Estado Visual**: Indicador claro si hay alarma activa y a qué hora
- **Activación**: Automática cuando coincide la hora actual con la configurada
- **Notificación**: Alerta visual con overlay parpadeante
- **Sonido**: Genera bips de alarma usando Web Audio API (o alert como fallback)

### 🎨 Diseño
- **Tema Digital**: Fondo oscuro con texto luminoso (verde neón)
- **Efecto Pantalla**: Estilo retro cyberpunk con sombras de brillo
- **Animaciones**: 
  - Parpadeo en la alarma
  - Efecto glow en elementos
  - Animación de entrada en notificaciones
- **Responsive**: Se adapta a cualquier tamaño de pantalla

### 🔄 Modo 12h/24h
- **Toggle Button**: Cambia entre formato 12 y 24 horas
- **Cambio Dinámico**: El reloj se actualiza inmediatamente

## 📁 Estructura del Proyecto

```
reloj-alarma/
├── index.html      # Estructura HTML
├── styles.css      # Estilos y animaciones
├── script.js       # Lógica JavaScript
└── README.md       # Este archivo
```

## 🚀 Cómo Usar

1. **Abrir la Aplicación**
   - Abre el archivo `index.html` en tu navegador web
   - El reloj comenzará a mostrar la hora actual automáticamente

2. **Configurar una Alarma**
   - Selecciona una hora futura en el input "Hora de Alarma"
   - Haz clic en "Establecer Alarma"
   - Se mostrará el estado de la alarma debajo del botón

3. **Cambiar Formato de Hora**
   - Haz clic en el botón "24h" para cambiar a formato 12 horas
   - El reloj se actualizará inmediatamente

4. **Cuando Suene la Alarma**
   - Se mostrará una notificación grande y parpadeante
   - Se reproducirá un sonido de alarma
   - Haz clic en "Desactivar Alarma" para detenerla

5. **Cancelar Alarma**
   - Haz clic en "Cancelar Alarma" en cualquier momento
   - El input volverá a estar disponible

## 💻 Especificaciones Técnicas

### HTML
- Semántica HTML5
- Input type="time" para la selección de hora
- Estructura organizada con clases descriptivas
- Accesibilidad básica con labels

### CSS
- Diseño responsivo con media queries
- Animaciones CSS3 fluidas
- Variables de color consistentes
- Efectos de sombra y brillo con `text-shadow` y `box-shadow`
- Transiciones suaves en interacciones

### JavaScript
- `setInterval()` para actualizar el reloj cada segundo
- Formateo de números con función `padZero()`
- Validación de entrada del usuario
- Web Audio API para generar sonidos
- Gestión de eventos con `addEventListener()`
- Comentarios explicativos en todo el código
- Estructura modular y reutilizable

## 🎯 Funcionalidades Detalladas

### Actualización del Reloj
```javascript
// Se ejecuta cada segundo
setInterval(updateClock, 1000);
```
- Obtiene la hora actual
- Formatea con ceros a la izquierda (08:05:03)
- Actualiza la fecha en español
- Verifica si debe sonar la alarma

### Validación de Alarma
```javascript
// La alarma solo se puede establecer para horas futuras
if (inputTime <= currentTime) {
    alert('La hora debe ser en el futuro');
}
```

### Sistema de Sonido
```javascript
// Usa Web Audio API para generar tonos de alarma
const oscillator = audioContext.createOscillator();
oscillator.frequency.value = 800; // 800 Hz
```

## 🌐 Compatibilidad

- Chrome/Chromium ✅
- Firefox ✅
- Safari ✅
- Edge ✅
- Opera ✅

## 📝 Notas de Implementación

1. **Web Audio API**: Si el navegador no soporta Web Audio API, usa `alert()` como fallback
2. **Formato 12h**: En formato 12 horas, las horas se mostrarán del 1-12 (no 0-11)
3. **Almacenamiento**: Actualmente no persiste los datos (se pierden al recargar)
4. **Zona Horaria**: Usa la zona horaria del sistema del usuario

## 🔧 Posibles Mejoras

- [ ] Persistencia con localStorage
- [ ] Múltiples alarmas simultáneas
- [ ] Seleccionar sonido de alarma personalizado
- [ ] Snooze (posponer alarma 5-10 minutos)
- [ ] Temas de color personalizables
- [ ] Desactivar automáticamente después de X segundos
- [ ] Notificaciones del navegador (Notification API)
- [ ] Configuración de volumen

## 📄 Licencia

Libre para uso personal y educativo.

---

**Creado con ❤️ para aprender Web Development**
