//Ejercicio: Array y objetos
//1. Array (listas)
//Crea una lista de tus 3 comidas favoritas
var comidasFavoritas = ["Pizza", "Sushi", "Tacos"];

//2. Objeto (key y value)
var persona = {
    nombre: "Juan",
    edad: 30,
    ciudad: "Madrid",
    habilidades: ['JavaScript', 'HTML', 'CSS'],
    estatura: 1.75,
    programador: true
};
//Como accedo a la propiedad 'nombre' del objeto persona
console.log("Nombre:", persona.nombre);
//Como accedo a la propiedad 'habilidades' del objeto persona
console.log("Habilidades:", persona.habilidades);
//Como accedo a la segunda habilidad del objeto persona
console.log("Segunda habilidad:", persona.habilidades[1]);

//3. Array de objetos
//Crea una lista de 3 alumnos (objetos) con nombre y calificación
var alumnos = [
    { nombre: "Ana", calificacion: 90 },
    { nombre: "Luis", calificacion: 70 },
    { nombre: "Marta", calificacion: 81 },
    { nombre: "Carlos",}
];
// Escribe un bucle que recorra el array de alumnos e imprima solo los que tienen calificación mayor a 8
for (var i = 0; i < alumnos.length; i++) {
    if (alumnos[i].calificacion > 80) {
        console.log("Alumno con calificación mayor a 80:", alumnos[i].nombre, "Calificación:", alumnos[i].calificacion);
    }
}