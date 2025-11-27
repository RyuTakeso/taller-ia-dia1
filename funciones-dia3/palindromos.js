//Ejercicio: Detectar palindromos
//Objetivo: Crear una lógica compleja encapsulada en una funcion
//Un ejemplo de palindromo es: "Ana" o "Arenera"

//1. Crea una funcion llamada esPalindromo que reciba un texto y retorne true si es un palindromo y false si no lo es
function esPalindromo(texto) {
    //2. Dentro de la funcion, convierte el texto a minusculas y elimina los espacios en blanco
    const textoLimpio = texto.toLowerCase().replace(/\s+/g, '');
    //3. Invierte el texto limpio
    const textoInvertido = textoLimpio.split('').reverse().join('');
    //4. Compara el texto limpio con el texto invertido y retorna el resultado
    return textoLimpio === textoInvertido;
}
//5. Prueba la funcion con diferentes ejemplos
console.log(esPalindromo("Ana")); // true
console.log(esPalindromo("Arenera")); // true
console.log(esPalindromo("Hola")); // false
console.log(esPalindromo("A man a plan a canal Panama")); // true   


