// calculadora.js
// Funciones básicas de una calculadora: sumar, restar, multiplicar y dividir.

/**
 * Convierte los argumentos a número y valida.
 * Lanza un TypeError si alguno no es convertible a número.
 */
function validarNumero(value, nombre = 'valor') {
  const n = Number(value);
  if (Number.isNaN(n)) {
    throw new TypeError(`${nombre} no es un número válido: ${value}`);
  }
  return n;
}

/**
 * Suma dos números.
 * @param {number|string} a - Primer sumando (se convierte a número si es string).
 * @param {number|string} b - Segundo sumando.
 * @returns {number} - Resultado de a + b
 */
function sumar(a, b) {
  const x = validarNumero(a, 'a');
  const y = validarNumero(b, 'b');
  return x + y;
}

/**
 * Resta dos números (a - b).
 */
function restar(a, b) {
  const x = validarNumero(a, 'a');
  const y = validarNumero(b, 'b');
  return x - y;
}

/**
 * Multiplica dos números.
 */
function multiplicar(a, b) {
  const x = validarNumero(a, 'a');
  const y = validarNumero(b, 'b');
  return x * y;
}

/**
 * Divide dos números (a / b).
 * Arroja error si se intenta dividir por 0.
 */
function dividir(a, b) {
  const x = validarNumero(a, 'a');
  const y = validarNumero(b, 'b');
  if (y === 0) {
    throw new Error('División por cero no permitida');
  }
  return x / y;
}

/**
 * Función genérica que realiza la operación indicada.
 * @param {string} oper - Una de: '+', '-', '*', '/' o palabras 'sumar','restar','multiplicar','dividir'.
 */
function calcular(a, b, oper) {
  switch (oper) {
    case '+':
    case 'sumar':
      return sumar(a, b);
    case '-':
    case 'restar':
      return restar(a, b);
    case '*':
    case 'x':
    case 'multiplicar':
      return multiplicar(a, b);
    case '/':
    case 'dividir':
      return dividir(a, b);
    default:
      throw new Error(`Operación desconocida: ${oper}`);
  }
}

// Export (Node/CommonJS) para facilitar pruebas si se usa en Node.
// Función que solicita dos números por consola en Node.js.
// Devuelve una Promise que resuelve un array [a, b] con los valores numéricos.
function solicitarNumerosConsola(promptA = 'Ingrese el primer número: ', promptB = 'Ingrese el segundo número: ') {
  return new Promise((resolve, reject) => {
    // Comprobar que estamos en un entorno con process.stdin
    if (typeof process === 'undefined' || !process.stdin) {
      return reject(new Error('Función disponible solo en entorno Node.js con consola')); 
    }
    const readline = require('readline');
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    const preguntar = (pregunta) => {
      return new Promise((res) => rl.question(pregunta, (answer) => res(answer)));
    };

    (async () => {
      try {
        let aRaw = await preguntar(promptA);
        let a = validarNumero(aRaw, 'a');

        let bRaw = await preguntar(promptB);
        let b = validarNumero(bRaw, 'b');

        rl.close();
        resolve([a, b]);
      } catch (err) {
        rl.close();
        reject(err);
      }
    })();
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { validarNumero, sumar, restar, multiplicar, dividir, calcular, solicitarNumerosConsola };
}

// Ejemplos de uso (puedes ejecutarlos en la consola del navegador o en Node):
// console.log(sumar(2, 3));           // 5
// console.log(restar(10, '4'));      // 6
// console.log(multiplicar(3, 5));    // 15
// console.log(dividir(9, 3));        // 3
// console.log(calcular('6', '2', '/'));// 3

// Manejo de errores:
// try {
//   console.log(dividir(4, 0));
// } catch (e) {
//   console.error(e.message); // División por cero no permitida
// }

// Ejemplo interactivo (se ejecuta solo si el archivo se corre directamente con Node):
// node calculadora.js
if (typeof require !== 'undefined' && require.main === module) {
  (async () => {
    try {
      const [a, b] = await solicitarNumerosConsola();
      console.log(`Suma: ${sumar(a, b)}`);
      console.log(`Resta: ${restar(a, b)}`);
      console.log(`Multiplicación: ${multiplicar(a, b)}`);
      console.log(`División: ${dividir(a, b)}`);
    } catch (e) {
      console.error('Error:', e.message);
    }
  })();
}
