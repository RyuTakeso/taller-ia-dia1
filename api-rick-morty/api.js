const API_URL = 'https://rickandmortyapi.com/api/character';
const container = document.getElementById('container');
const searchInput = document.getElementById('searchinput');
const searchBtn = document.getElementById('searchBtn');

let allCharacters = [];

// Evento para buscar al presionar Enter
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchCharacters();
    }
});

// Evento para buscar al hacer clic en el botón
searchBtn.addEventListener('click', searchCharacters);

// Cargar personajes al iniciar
document.addEventListener('DOMContentLoaded', () => {
    loadCharacters();
});

// Función para cargar todos los personajes
async function loadCharacters() {
    try {
        container.innerHTML = '<div class="loading">Cargando personajes...</div>';
        allCharacters = [];

        let nextUrl = API_URL;
        
        while (nextUrl) {
            const response = await fetch(nextUrl);
            
            if (!response.ok) {
                throw new Error('Error al cargar los personajes');
            }

            const data = await response.json();
            allCharacters = allCharacters.concat(data.results);
            nextUrl = data.info.next;
        }

        displayCharacters(allCharacters);
    } catch (error) {
        container.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        console.error('Error:', error);
    }
}

// Función para buscar personajes
function searchCharacters() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    if (searchTerm === '') {
        displayCharacters(allCharacters);
        return;
    }

    const filteredCharacters = allCharacters.filter(character =>
        character.name.toLowerCase().includes(searchTerm)
    );

    if (filteredCharacters.length === 0) {
        container.innerHTML = '<div class="error">No se encontraron personajes</div>';
    } else {
        displayCharacters(filteredCharacters);
    }
}

// Función para mostrar los personajes
function displayCharacters(characters) {
    container.innerHTML = '';

    characters.forEach(character => {
        const statusClass = character.status === 'Alive' ? 'alive' : 'dead';
        const statusText = character.status === 'Alive' ? 'Vivo' : 'Muerto';

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${character.image}" alt="${character.name}" class="card-image">
            <div class="card-content">
                <h2>${character.name}</h2>
                <span class="status ${statusClass}">${statusText}</span>
                <div class="card-info">
                    <strong>Especie:</strong> ${character.species}
                </div>
                <div class="card-info">
                    <strong>Ubicación:</strong> ${character.location.name}
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}
