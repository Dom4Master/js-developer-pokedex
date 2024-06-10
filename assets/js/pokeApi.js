
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.number = pokeDetail.id
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.img = pokeDetail.sprites.front_default

    return pokemon

}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests => Promise.all(detailRequests)))
        .then((pokemonDetails) => (pokemonDetails))
}

pokeApi.searchPokemon = parameter => {
    const url = `https://pokeapi.co/api/v2/pokemon/${parameter}`

    fetch (url)
        .then(response => response.json())
        .then(pokemon => {
            if (!pokemon) {
                searchTerm.textContent = "Pokémon não encontrado."
                return
            } else if (parameter === pokemon.name) {
                pokemonsList.innerHTML = `
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
                `
            }
        })
}