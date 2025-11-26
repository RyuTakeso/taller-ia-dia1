// Escribe un programa que salude al usuario por consola
console.log("¡Hola, usuario!");

//"¿Qué es un commit y por qué es importante?"
// Un commit es una instantánea de los cambios realizados en el código fuente de un proyecto. Es una operación fundamental en sistemas de control de versiones como Git. Cada commit registra qué cambios se hicieron, quién los hizo y cuándo se hicieron.

//"¿Cuál es la diferencia entre git add y git commit?"
// git add es el comando que se utiliza para agregar cambios específicos al área de preparación (staging area) antes de hacer un commit. git commit, por otro lado, es el comando que crea un nuevo commit con los cambios que han sido agregados al área de preparación.

//"Explícame qué hace el comando git push."
// El comando git push se utiliza para subir los commits locales a un repositorio remoto. Esto permite compartir los cambios realizados en el código con otros colaboradores del proyecto y mantener el repositorio remoto actualizado con los últimos cambios.

// A continuación definimos una función muy simple que suma dos números.
// Comentarios línea por línea para que puedas entender cada instrucción.



// Definimos la función con la palabra reservada `function` y le damos el nombre `sum`.
// La función recibe dos parámetros: `a` y `b`.
function sum(a, b) {
	// Creamos una variable llamada `resultado` y le asignamos la suma de `a` y `b`.
	var resultado = a + b;

	// Devolvemos (return) el valor almacenado en `resultado` al código que llamó a la función.
	return resultado;
}

// Ejemplo de uso:
// Llamamos a la función `sum` pasando dos números y guardamos el resultado en `miSuma`.
var miSuma = sum(2, 3);

// Mostramos el resultado en la consola para verificar que la función funciona.
console.log('Ejemplo: 2 + 3 =', miSuma);

// Notas para el estudiante:
// - `function` crea una función reutilizable.
// - Las variables como `resultado` se usan para almacenar valores intermedios.
// - `return` finaliza la ejecución de la función y entrega un valor al llamador.
// - Evitamos aquí sintaxis avanzada de ES6 (como arrow functions o `const`/`let`) tal como pediste.