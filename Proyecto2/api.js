const API_KEY = '79dce510';
const BASE_URL = 'https://www.omdbapi.com/';

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsContainer = document.getElementById('results');
const typeFilter = document.getElementById('typeFilter');
const yearFilter = document.getElementById('yearFilter');
const movieDetailsSection = document.getElementById('movie-details');
const detailsContent = document.getElementById('details-content');

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});

// Functions to trigger search from sidebars
function searchByGenre(genre) {
    searchInput.value = genre;
    handleSearch();
}

function searchCustom(query) {
    searchInput.value = query;
    handleSearch();
}

async function handleSearch() {
    const query = searchInput.value.trim();
    const type = typeFilter.value;
    const year = yearFilter.value;

    if (!query) return;

    showLoading();

    try {
        let url = `${BASE_URL}?apikey=${API_KEY}&s=${query}`;
        if (type) url += `&type=${type}`;
        if (year) url += `&y=${year}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === "True") {
            renderMovies(data.Search);
        } else {
            showError(data.Error);
        }
    } catch (error) {
        showError("Error de conexión. Intenta nuevamente.");
        console.error(error);
    }
}

function showLoading() {
    resultsContainer.innerHTML = '<div style="grid-column: 1/-1; text-align: center; margin-top: 50px;"><i class="fas fa-spinner fa-spin fa-3x"></i></div>';
}

function showError(msg) {
    resultsContainer.innerHTML = `<div style="grid-column: 1/-1; text-align: center; margin-top: 50px; color: #ef4444;"><h3>${msg}</h3></div>`;
}

function renderMovies(movies) {
    resultsContainer.innerHTML = '';

    movies.forEach(movie => {
        const poster = movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image';

        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <img src="${poster}" alt="${movie.Title}" class="movie-poster">
            <div class="movie-info">
                <div class="movie-title">${movie.Title}</div>
                <div class="movie-meta">${movie.Year} • ${capitalize(movie.Type)}</div>
                <button class="btn-details" onclick="showDetails('${movie.imdbID}')">
                    <i class="fas fa-info-circle"></i> Ver Detalles
                </button>
            </div>
        `;
        resultsContainer.appendChild(card);
    });
}

async function showDetails(id) {
    // Show loading in details
    movieDetailsSection.classList.add('active');
    detailsContent.innerHTML = '<div style="text-align: center; width: 100%; margin-top: 100px;"><i class="fas fa-spinner fa-spin fa-3x"></i></div>';

    try {
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
        const data = await response.json();

        renderDetailsView(data);
    } catch (error) {
        detailsContent.innerHTML = 'Error al cargar detalles.';
    }
}

function renderDetailsView(movie) {
    const poster = movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image';

    detailsContent.innerHTML = `
        <img src="${poster}" alt="${movie.Title}" class="details-poster">
        <div class="details-info">
            <h2>${movie.Title}</h2>
            <div class="details-meta">
                <span>${movie.Year}</span> • 
                <span>${movie.Rated}</span> • 
                <span>${movie.Runtime}</span>
            </div>
            
            <div class="details-stat">
                <strong>Género:</strong> ${movie.Genre}
            </div>
            
            <p class="details-plot">${movie.Plot}</p>
            
            <div class="details-stat">
                <strong>Director:</strong> ${movie.Director}
            </div>
            <div class="details-stat">
                <strong>Actores:</strong> ${movie.Actors}
            </div>
            <div class="details-stat">
                <strong>Premios:</strong> ${movie.Awards}
            </div>
            <div class="details-stat">
                <strong>IMDB Rating:</strong> ⭐ ${movie.imdbRating}/10
            </div>
        </div>
    `;
}

function closeDetails() {
    movieDetailsSection.classList.remove('active');
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
