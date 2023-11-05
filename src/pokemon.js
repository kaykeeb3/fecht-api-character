// pokemon.js
const pokemonContainer = document.getElementById('pokemonContainer');
const searchInput = document.getElementById('searchInput');
const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=200';

async function fetchPokemon() {
    try {
        const response = await axios.get(apiUrl);
        const pokemons = response.data.results;

        for (const pokemon of pokemons) {
            const pokemonData = await axios.get(pokemon.url);
            const { name, types, height, weight, abilities, sprites } = pokemonData.data;
            
            const pokemonCard = document.createElement('div');
            pokemonCard.classList.add('bg-gray-850', 'rounded', 'p-4', 'shadow-md', 'border-solid', 'border-2', 'border-zin-200');
            pokemonCard.innerHTML = `
                <h2 class="text-lg font-semibold mt-2">${name}</h2>
                <img src="${sprites.front_default}" alt="${name}" class="mx-auto mb-2">
                <p class="text-gray-600">Tipo: ${types.map(type => type.type.name).join(', ')}</p>
                <p class="text-gray-600">Altura: ${height / 10} m</p>
                <p class="text-gray-600">Peso: ${weight / 10} kg</p>
                <p class="text-gray-600">Habilidades: ${abilities.map(ability => ability.ability.name).join(', ')}</p>
            `;

            pokemonContainer.appendChild(pokemonCard);
        }
    } catch (error) {
        console.error('Erro ao buscar Pokémon:', error);
    }
}

function searchPokemon() {
    const searchTerm = searchInput.value.toLowerCase();
    const pokemonCards = pokemonContainer.getElementsByClassName('bg-white');

    for (const card of pokemonCards) {
        const pokemonName = card.querySelector('h2').textContent.toLowerCase();
        if (pokemonName.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    }
}

searchInput.addEventListener('input', searchPokemon);

fetchPokemon();
