const pokemonsList = document.getElementById('pokemonsList')
const loadMoreButton = document.getElementById('loadMoreButton')
const searchInput = document.getElementById('searchInput')

const maxRecords = 151
const limit = 151
const offset = 0

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="Pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail"> 
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>       

                    <img src="${pokemon.img}"
                        alt="${pokemon.name}">
                </div>
            </li>
        `).join('')

        pokemonsList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

/*
loadMoreButton.addEventListener('click', () => {
    offset += limit

    const recordsNextPagae = offset + limit

    if (recordsNextPagae >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit)
        
        loadMoreButton.parentElement.removeChild(loadMoreButton)

    } else {
        loadPokemonItens(offset, limit)
    }
    
})
*/

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const pokemonList = Array.from(pokemonsList.children);
    const filteredPokemon = pokemonList.filter(pokemon => {
      const pokemonName = pokemon.querySelector('.name').textContent.toLowerCase();
      return pokemonName.startsWith(searchTerm);
    });
  
    pokemonList.forEach(pokemon => {
      if (filteredPokemon.includes(pokemon)) {
        pokemon.style.display = 'block';
      } else {
        pokemon.style.display = 'none';
      }
    });
  }
  
searchInput.addEventListener('keyup', handleSearch)