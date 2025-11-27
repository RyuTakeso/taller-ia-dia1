// API de Datos de Gatos
const API_CAT_FACTS = 'https://catfact.ninja/fact';
const API_CAT_IMAGE = 'https://api.thecatapi.com/v1/images/search';

// Datos adicionales de gatos en español
const DATOS_GATOS_ESPAÑOLES = [
  "Los gatos tienen 32 músculos en cada oreja y pueden girarlas 180 grados.",
  "Un gato puede dormir entre 12 a 16 horas al día, lo que equivale a dos tercios de su vida.",
  "Los gatos tienen una visión nocturna 6 veces mejor que la de los humanos.",
  "El ronroneo de un gato vibra a una frecuencia de 25 Hertz, que puede promover la curación de huesos.",
  "Un gato puede saltar hasta 6 veces la longitud de su propio cuerpo.",
  "Los gatos tienen una memoria a corto plazo de 16 horas.",
  "Un gato tiene aproximadamente 230 huesos en su cuerpo, mientras que los humanos tenemos 206.",
  "Los gatos pueden correr a velocidades de hasta 48 km/h.",
  "Los gatos tienen un órgano especial en el techo de la boca llamado vómeronasal que detecta feromonas.",
  "Un gato maúlla únicamente para comunicarse con los humanos, no con otros gatos.",
  "Los bigotes de un gato son tan sensibles que pueden detectar cambios minúsculos en el aire.",
  "Un gato tiene una temperatura corporal normal de 38.5°C, más alta que la de los humanos.",
  "Los gatos son uno de los animales más independientes del reino animal.",
  "Un gato gasta el 30% de su tiempo despierto en acicalarse.",
  "Los gatos pueden girar sus orejas independientemente una de la otra.",
  "Un gato tiene alrededor de 1,000 expresiones faciales diferentes.",
  "Los gatos pueden detectar un rango de sonidos más amplio que los humanos.",
  "Un gato pasa hasta el 70% de su vida en el hogar, principalmente durmiendo.",
  "Los gatos tienen glándulas de olor en sus almohadillas plantares.",
  "Un gato puede recuperarse de casi cualquier caída, gracias a su reflejo de righting.",
  "Los gatos antiguos en Egipto eran momificados y enterrados con sus dueños.",
  "Un gato puede vivir entre 12 a 18 años en promedio en cautividad.",
  "Los gatos tienen una lengua con pequeñas púas que les ayudan a acicalarse.",
  "Un gato puede alcanzar una velocidad de caída terminal de 100 km/h.",
  "Los gatos tienen un tercer párpado llamado membrana nictitante.",
  "Un gato tiene aproximadamente 100 vocalizaciones diferentes.",
  "Los gatos pueden regular la extensión de sus garras a voluntad.",
  "Un gato tiene una excelente capacidad de orientación espacial.",
  "Los gatos tienen preferencia por el lado derecho o izquierdo, como los humanos.",
  "Un gato puede beber agua salada y procesarla adecuadamente.",
  "Los gatos tienen un sentido del olfato 14 veces más fuerte que el de los humanos.",
  "Un gato ronronea cuando está feliz, relajado o incluso cuando está enfermo.",
  "Los gatos pueden ver en color, pero no con tanta intensidad como los humanos.",
  "Un gato tiene alrededor de 20,000 fibras musculares en su cuerpo.",
  "Los gatos domésticos comparten el 95% de su ADN con los tigres.",
  "Un gato puede caminar casi en línea recta, colocando sus patas traseras donde estaban las delanteras.",
  "Los gatos tienen una dilatación de pupilas que refleja sus emociones.",
  "Un gato puede girar la cabeza hasta 270 grados.",
  "Los gatos tienen glándulas sudoríparas solo en las almohadillas de sus patas.",
  "Un gato puede ronronear a un volumen de hasta 25 decibelios.",
];

/**
 * Obtiene un dato aleatorio sobre gatos
 * @returns {Promise<Object>} Dato sobre gatos
 */
async function obtenerDatoGato() {
  try {
    const respuesta = await fetch(API_CAT_FACTS);
    
    if (!respuesta.ok) {
      throw new Error(`Error: ${respuesta.status}`);
    }
    
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error('Error al obtener dato del gato:', error);
    throw error;
  }
}

/**
 * Obtiene un dato aleatorio en español
 * @returns {Object} Dato sobre gatos en español
 */
function obtenerDatoEspañol() {
  const indice = Math.floor(Math.random() * DATOS_GATOS_ESPAÑOLES.length);
  return {
    fact: DATOS_GATOS_ESPAÑOLES[indice],
    source: 'datos-locales'
  };
}

/**
 * Obtiene una imagen aleatoria de un gato
 * @returns {Promise<string>} URL de la imagen del gato
 */
async function obtenerImagenGato() {
  try {
    const respuesta = await fetch(API_CAT_IMAGE);
    
    if (!respuesta.ok) {
      throw new Error(`Error: ${respuesta.status}`);
    }
    
    const datos = await respuesta.json();
    return datos[0].url;
  } catch (error) {
    console.error('Error al obtener imagen del gato:', error);
    throw error;
  }
}

/**
 * Obtiene múltiples datos sobre gatos (combinados)
 * @param {number} cantidad - Cantidad de datos a obtener
 * @returns {Promise<Array>} Array de datos sobre gatos
 */
async function obtenerMultiplesDatos(cantidad = 5) {
  try {
    // Combinar datos de la API con datos locales en español
    const datosMixtos = [];
    
    for (let i = 0; i < cantidad; i++) {
      if (i % 2 === 0) {
        // Datos en español locales
        datosMixtos.push(obtenerDatoEspañol());
      } else {
        // Intentar obtener de la API
        try {
          const dato = await obtenerDatoGato();
          datosMixtos.push(dato);
        } catch {
          // Si falla, usar dato local
          datosMixtos.push(obtenerDatoEspañol());
        }
      }
    }
    
    return datosMixtos;
  } catch (error) {
    console.error('Error al obtener múltiples datos:', error);
    throw error;
  }
}

/**
 * Obtiene una categoría aleatoria de gatos
 * @returns {string} Categoría de gato
 */
function obtenerCategoriaAleatoria() {
  const categorias = [
    '😸 Gato Feliz',
    '😻 Gato Amoroso',
    '😽 Gato Besador',
    '😼 Gato Bromista',
    '😹 Gato Risueño',
    '😺 Gato Sonriente',
    '😸 Gato Travieso',
    '🐱 Gato Curiosidad',
    '😾 Gato Pensador',
    '😿 Gato Sabio'
  ];
  return categorias[Math.floor(Math.random() * categorias.length)];
}

/**
 * Formatea la longitud del dato
 * @param {number} longitud - Longitud del texto
 * @returns {string} Descripción de longitud
 */
function obtenerNivelDificultad(longitud) {
  if (longitud < 100) return 'Corto';
  if (longitud < 200) return 'Medio';
  if (longitud < 300) return 'Largo';
  return 'Muy Largo';
}

/**
 * Traduce términos técnicos al español
 * @param {string} texto - Texto a traducir
 * @returns {string} Texto traducido
 */
function traducirTexto(texto) {
  const traducciones = {
    'whiskers': 'bigotes',
    'purr': 'ronroneo',
    'meow': 'maullido',
    'cat': 'gato',
    'cats': 'gatos',
    'sleep': 'duerme',
    'eyes': 'ojos',
    'ears': 'orejas',
    'paws': 'patas',
    'tail': 'cola',
    'fur': 'pelaje',
    'claws': 'garras',
    'teeth': 'dientes',
    'nose': 'nariz',
    'mouth': 'boca'
  };
  
  let textoTraducido = texto;
  for (const [en, es] of Object.entries(traducciones)) {
    const regex = new RegExp(en, 'gi');
    textoTraducido = textoTraducido.replace(regex, es);
  }
  
  return textoTraducido;
}
