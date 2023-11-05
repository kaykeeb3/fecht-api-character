const charactersContainer = document.querySelector('.grid');
const apiUrl = 'https://rickandmortyapi.com/api/character';
const searchInput = document.getElementById('searchInput');

// Função para traduzir o status do personagem para português
function traduzirStatus(status) {
    switch (status) {
        case 'Alive':
            return 'Vivo';
        case 'Dead':
            return 'Morto';
        case 'unknown':
            return 'Desconhecido';
        default:
            return status;
    }
}

// Função para buscar personagens da API e exibir
async function fetchAndDisplayCharacters() {
    try {
        const response = await axios.get(apiUrl);
        const characters = response.data.results;

        charactersContainer.innerHTML = ''; // Limpar conteúdo anterior

        characters.forEach(character => {
            const characterCard = document.createElement('div');
            characterCard.classList.add('bg-gray-850', 'rounded', 'p-4', 'shadow-md', 'border-solid', 'border-2', 'border-zin-200');
            characterCard.innerHTML = `
                <img src="${character.image}" alt="${character.name}" class="w-32 h-32 mx-auto rounded-full">
                <h2 class="text-lg font-semibold mt-2">${character.name}</h2>
                <p class="text-gray-600">Status: ${traduzirStatus(character.status)}</p>
                <p class="text-gray-600">Espécie: ${character.species}</p>
                <p class="text-gray-600">Origem: ${character.origin.name}</p>
                <p class="text-gray-600">Descrição: ${character.species}</p>
            `;

            charactersContainer.appendChild(characterCard);
        });
    } catch (error) {
        console.error('Erro ao buscar personagens:', error);
    }
}

// Adicionar evento de pesquisa
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const characterCards = charactersContainer.querySelectorAll('.bg-white');

    characterCards.forEach(characterCard => {
        const characterName = characterCard.querySelector('h2').innerText.toLowerCase();
        if (characterName.includes(searchTerm)) {
            characterCard.style.display = 'block';
        } else {
            characterCard.style.display = 'none';
        }
    });
});

fetchAndDisplayCharacters();
