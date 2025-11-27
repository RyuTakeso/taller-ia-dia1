//Crea una funcion para calcular el area de un circulo dado su radio

// Esta función calcula el área de un círculo.
  // Recibe un parámetro 'radio' que representa el radio del círculo.
  // La fórmula para el área de un círculo es π (Pi) multiplicado por el radio al cuadrado (radio * radio).
  // 'Math.PI' es una constante predefinida en JavaScript que representa el valor de Pi.
  // El resultado es el área del círculo.
function calcularAreaCirculo(radio) {
  return Math.PI * radio * radio;
}

//Crea una funcion para calcular el area de un rectangulo
//  dado su base y altura
// Esta función calcula el área de un rectángulo.
// Recibe dos parámetros: 'base' y 'altura', que representan la base y la altura del rectángulo, respectivamente.
// La fórmula para el área de un rectángulo es base multiplicada por altura (base * altura).
// El resultado es el área del rectángulo.
function calcularAreaRectangulo(base, altura) {
  return base * altura;
}

//Crea una funcion para calcular el area de un triangulo
//  dado su base y altura
// Esta función calcula el área de un triángulo.
// Recibe dos parámetros: 'base' y 'altura', que representan la base y la altura del triángulo, respectivamente.
// La fórmula para el área de un triángulo es base multiplicada por altura dividida 2 ((base * altura) / 2).
// El resultado es el área del triángulo.
function calcularAreaTriangulo(base, altura) {
  return (base * altura) / 2;
}

//Vamos a calcular el volumen de un cilindro 
//El volumen es Area de la base (circulo) * altura
// Esta función calcula el volumen de un cilindro.
// Recibe dos parámetros: 'radio' y 'altura', que representan el radio y la altura del cilindro, respectivamente.
// El volumen se calcula como el área de la base (que es un círculo) multiplicada por la altura (calcularAreaCirculo(radio) * altura).
// El resultado es el volumen del cilindro.
function calcularVolumenCilindro(radio, altura) {
  return calcularAreaCirculo(radio) * altura;
}

//Vamos a calcular el volumen de un cono 
//El volumen es Area de la base (circulo) * altura / 3
// Esta función calcula el volumen de un cono.
// Recibe dos parámetros: 'radio' y 'altura', que representan el radio y la altura del cono, respectivamente.
// El volumen se calcula como el área de la base (que es un círculo) multiplicada por la altura y dividida 3 (calcularAreaCirculo(radio) * altura / 3).
// El resultado es el volumen del cono.
function calcularVolumenCono(radio, altura) {
  return calcularAreaCirculo(radio) * altura / 3;
}

//Vamos a calcular el volumen de un prisma 
//El volumen es Area de la base (rectangulo) * altura
// Esta función calcula el volumen de un prisma.
// Recibe dos parámetros: 'radio' y 'altura', que representan el radio y la altura del prisma, respectivamente.
// El volumen se calcula como el área de la base (que es un círculo) multiplicada por la altura (calcularAreaCirculo(radio) * altura).
// El resultado es el volumen del prisma.
function calcularVolumenPrisma(base, altura) {
  return calcularAreaRectangulo(base, altura) * altura;
}

    //Crea una funcion para calcular una derivada simple de una funcion polinomial de la forma ax^n
    // Esta función calcula la derivada de una función polinomial simple de la forma ax^n.
    // Recibe dos parámetros: 'a' (el coeficiente) y 'n' (el exponente).
    // Retorna una nueva función que, al ser llamada con un valor 'x', calcula la derivada en ese punto.
    // La fórmula para la derivada de ax^n es a * n * x^(n-1).
    function calcularDerivadaPolinomial(a, n) {
    if (n === 0) {
        return (x) => 0; // La derivada de una constante (ax^0 = a) es 0.
    }
    return (x) => a * n * Math.pow(x, n - 1);
    }

    //Crea una funcion para calcular una integral simple de una funcion polinomial de la forma ax^n
    // Esta función calcula la integral de una función polinomial simple de la forma ax^n.
    // Recibe dos parámetros: 'a' (el coeficiente) y 'n' (el exponente).
    // Retorna una nueva función que, al ser llamada con un valor 'x', calcula la integral en ese punto.
    // La fórmula para la integral de ax^n es (a / (n + 1)) * x^(n + 1).
    function calcularIntegralPolinomial(a, n) {
    if (n === -1) {
        return (x) => Math.log(x); // La integral de ax^-1 es ln(x).
    }
    return (x) => (a / (n + 1)) * Math.pow(x, n + 1);
    }
