// 🖱️ Ejercicio: DOM (Document Object Model)

// 1. Seleccionar elementos
// Pídele a la IA: "¿Cómo selecciono un elemento por su ID en JavaScript?"
// Selecciona el botón 'btnCambiarColor' y la 'miCaja'.
// Ejemplo: Puedes seleccionar un elemento por su ID usando:
// - `document.getElementById('miId')` (rápido y específico para ID)
// - `document.querySelector('#miId')` (más flexible, acepta selectores CSS)

// Seleccionamos los elementos solicitados:
const btnCambiarColor = document.getElementById('btnCambiarColor');
const btnCambiarTexto = document.getElementById('btnCambiarTexto');
const miCaja = document.getElementById('miCaja');

// Comprobación simple (opcional): si no se encuentran, mostrar en consola
if (!btnCambiarColor) console.warn("No se encontró el botón 'btnCambiarColor'");
if (!btnCambiarTexto) console.warn("No se encontró el botón 'btnCambiarTexto'");
if (!miCaja) console.warn("No se encontró el elemento 'miCaja'");
// 2. Escuchar eventos (Clicks)
// Pídele a la IA: "¿Cómo hago que pase algo cuando hago click en un botón?"

// Helper: registra información básica del evento en la consola
function registrarEvento(e) {
	try {
		const info = {
			tipo: e.type,
			objetivo: e.target && (e.target.id || e.target.tagName),
			clases: e.target && e.target.className,
			timestamp: e.timeStamp
		};
		console.log('Evento capturado:', info);
	} catch (err) {
		console.log('Evento capturado (error al formatear):', e);
	}
}

// Escucha global para cualquier botón: registra todos los clicks en botones
document.addEventListener('click', (e) => {
	if (e.target && e.target.tagName === 'BUTTON') {
		registrarEvento(e);
	}
});


// 3. Modificar elementos
// Cuando den click en 'Cambiar Color', cambia el color de fondo de la caja a rojo.
// Pídele a la IA: "¿Cómo cambio el estilo background-color de un elemento con JS?"

// Añadimos listeners para que los botones hagan lo pedido
if (btnCambiarColor && miCaja) {
	// Alterna el color entre 'red' y el estilo por defecto (definido en CSS)
	let esRojo = false;
	btnCambiarColor.addEventListener('click', (e) => {
		// registra el evento y aplica la acción
		registrarEvento(e);
		miCaja.style.backgroundColor = esRojo ? '' : 'red';
		esRojo = !esRojo;
	});
}

// Reto: Cambiar el texto dentro de la caja
if (btnCambiarTexto && miCaja) {
	btnCambiarTexto.addEventListener('click', (e) => {
		registrarEvento(e);
		miCaja.textContent = '¡Hola DOM!';
	});
}

// Reto:
// Haz que el botón 'Cambiar Texto' cambie lo que dice dentro de la caja por "¡Hola DOM!".



// --- Ejemplos de uso de las funciones de calculadora ----
// Crea una pequeña UI para probar sumar, restar, multiplicar y dividir
;(function crearCalculadoraRapida() {
	try {
		// Comprueba si las funciones están disponibles
		if (typeof sumar !== 'function') {
			console.warn('La función `sumar` no está disponible en el ámbito global. Asegúrate de incluir `calculadora.js`.');
		}

		const container = document.createElement('div');
		container.className = 'widget calculadora';
		container.innerHTML = `
			<h2>Calculadora rápida</h2>
			<div class="controls">
				<input id="calcA" class="input" placeholder="Número A" />
				<input id="calcB" class="input" placeholder="Número B" />
			</div>
			<div style="margin-top:8px" class="controls">
				<button id="btnSumar" class="btn">Sumar</button>
				<button id="btnRestar" class="btn secondary">Restar</button>
				<button id="btnMultiplicar" class="btn">Multiplicar</button>
				<button id="btnDividir" class="btn">Dividir</button>
				<button id="btnLimpiar" class="btn secondary">Limpiar</button>
			</div>
			<div id="resultadoCalc" class="resultado"></div>
		`;
		document.body.appendChild(container);

		const elA = document.getElementById('calcA');
		const elB = document.getElementById('calcB');
		const resEl = document.getElementById('resultadoCalc');

		function leerValores() {
			return [elA.value, elB.value];
		}

		function mostrarResultado(valor) {
			resEl.textContent = `Resultado: ${valor}`;
			console.log('Resultado:', valor);
		}

		document.getElementById('btnSumar').addEventListener('click', () => {
			try {
				const [a, b] = leerValores();
				mostrarResultado(sumar(a, b));
			} catch (e) {
				resEl.textContent = `Error: ${e.message}`;
			}
		});

		document.getElementById('btnRestar').addEventListener('click', () => {
			try {
				const [a, b] = leerValores();
				mostrarResultado(restar(a, b));
			} catch (e) {
				resEl.textContent = `Error: ${e.message}`;
			}
		});

		document.getElementById('btnMultiplicar').addEventListener('click', () => {
			try {
				const [a, b] = leerValores();
				mostrarResultado(multiplicar(a, b));
			} catch (e) {
				resEl.textContent = `Error: ${e.message}`;
			}
		});

		document.getElementById('btnDividir').addEventListener('click', () => {
			try {
				const [a, b] = leerValores();
				mostrarResultado(dividir(a, b));
			} catch (e) {
				resEl.textContent = `Error: ${e.message}`;
			}
		});

		document.getElementById('btnLimpiar').addEventListener('click', () => {
			// Limpia los campos de entrada y el resultado
			try {
				elA.value = '';
				elB.value = '';
				resEl.textContent = '';
				elA.focus();
			} catch (e) {
				console.error('Error al limpiar la calculadora:', e);
			}
		});
	} catch (e) {
		console.error('No se pudo crear la calculadora rápida:', e);
	}
})();

// --- Convertidor Celsius -> Fahrenheit ---
function celsiusToFahrenheit(celsius) {
	const n = Number(celsius);
	if (Number.isNaN(n)) throw new Error('Valor de Celsius no válido');
	return (n * 9 / 5) + 32;
}

(function setupConvertidor() {
	const input = document.getElementById('celsiusInput');
	const btn = document.getElementById('btnConvert');
	const out = document.getElementById('fahrenheitResult');
	if (!btn || !input || !out) return;

	btn.addEventListener('click', () => {
		try {
			const f = celsiusToFahrenheit(input.value);
			out.textContent = `${f} °F`;
		} catch (e) {
			out.textContent = `Error: ${e.message}`;
		}
	});

	// Botón para limpiar el convertidor
	const clearBtn = document.getElementById('btnClearConv');
	if (clearBtn) {
		clearBtn.addEventListener('click', () => {
			try {
				input.value = '';
				out.textContent = '';
				input.focus();
			} catch (e) {
				console.error('Error al limpiar el convertidor:', e);
			}
		});
	}

	// Convertir al presionar Enter
	input.addEventListener('keydown', (e) => {
		if (e.key === 'Enter') btn.click();
	});
})();


