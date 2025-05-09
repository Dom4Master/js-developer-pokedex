const pokemonsList = document.getElementById('pokemonsList')
const loadMoreButton = document.getElementById('loadMoreButton')
const searchBar = document.getElementById('searchBar')
const searchInput = document.getElementById('searchInput')
const popUp = document.getElementById('popUp')
const sortButton = document.getElementById('sortButton')
const nameRadio = document.getElementById('name')
const numberRadio = document.getElementById('number')
const body = document.querySelector('body')
const imgIcon = document.getElementById('tagIcon')

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
    const searchTerm = searchInput.value.toLowerCase()
    const pokemonList = Array.from(pokemonsList.children)
    const filteredPokemon = pokemonList.filter(pokemon => {
      const pokemonName = pokemon.querySelector('.name').textContent.toLowerCase()
      const pokemonNumber = pokemon.querySelector('.number').textContent.replace('#', '')
      return pokemonName.startsWith(searchTerm) ||
      pokemonNumber.startsWith(searchTerm) ||
      pokemonNumber === searchTerm
    });
  
    pokemonList.forEach(pokemon => {
      if (filteredPokemon.includes(pokemon)) {
        pokemon.style.display = 'flex'
      } else {
        pokemon.style.display = 'none'
      }
    });
  }

searchInput.addEventListener('keyup', handleSearch)

searchInput.addEventListener('click', () => {
  searchBar.style.boxShadow = '2px 2px 10px rgba(0, 0, 0, 0.5)'

  // Adicionar evento de clique no corpo para fechar a barra de busca
  body.addEventListener('click', (event) => {
    if (!event.target.closest('#searchInput')) { // Verifica se o clique não foi no input de busca
      searchBar.style.boxShadow = 'inset 2px 2px 10px rgba(0, 0, 0, 0.5)'
    }
  })
})

sortButton.addEventListener('click', () => {
  sortButton.style.boxShadow = '2px 2px 10px rgba(0, 0, 0, 0.5)'
  popUp.classList.add('popup-in') // Adicionar classe para animação de entrada
  popUp.style.display = 'block'

  popUp.addEventListener('click', () => {
    sortButton.style.boxShadow = 'inset 2px 2px 10px rgba(0, 0, 0, 0.5)'
    popUp.classList.add('popup-out') // Adicionar classe para animação de saída
    setTimeout(() => {
      popUp.style.display = 'none'
      popUp.classList.remove('popup-in', 'popup-out') // Remover classes após a animação
    }, 500)
  })
})

function organizePokemonsAlphabetically () {
  const pokemonItems = Array.from(pokemonsList.children)
  const sortedItems = pokemonItems.sort((a, b) => {
    const pokemonAName = a.querySelector('.name').textContent.toLowerCase()
    const pokemonBName = b.querySelector('.name').textContent.toLowerCase()
    return pokemonAName.localeCompare(pokemonBName)
  })

  pokemonsList.innerHTML = ''
  sortedItems.forEach(item => pokemonsList.appendChild(item))
}

nameRadio.addEventListener('click', () => {
  imgIcon.setAttribute('src', 'assets/imgs/textFormatIcon.png')
  organizePokemonsAlphabetically()
})

function organizePokemonsNumerically () {
  const pokemonItems = Array.from(pokemonsList.children)
  const sortedItems = pokemonItems.sort((a, b) => {
    const pokemonANumber = a.querySelector('.number').textContent.replace('#', '')
    const pokemonBNumber = b.querySelector('.number').textContent.replace('#', '')
    return pokemonANumber - pokemonBNumber
  })
  pokemonsList.innerHTML = ''
  sortedItems.forEach(item => pokemonsList.appendChild(item))
}

numberRadio.addEventListener('click', () => {
  imgIcon.setAttribute('src', 'assets/imgs/tagIcon.png')
  organizePokemonsNumerically()
})

