const getPokemonButton = document.getElementById('getPokemonButton');
const pokemonInfo = document.getElementById('pokemonInfo');

// Función para obtener un Pokémon aleatorio
async function getRandomPokemon() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.results.length);
    const pokemonUrl = data.results[randomIndex].url;

    // Obtener información detallada del Pokémon seleccionado
    const pokemonResponse = await fetch(pokemonUrl);
    const pokemonData = await pokemonResponse.json();

    // Mostrar información del Pokémon en el DOM
    const pokemonHtml = `
      <h2>${pokemonData.name.toUpperCase()}</h2>
      <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
      <p><strong>Altura:</strong> ${pokemonData.height} decímetros</p>
      <p><strong>Peso:</strong> ${pokemonData.weight} hectogramos</p>
      <p><strong>Habilidades:</strong> ${pokemonData.abilities.map(ability => ability.ability.name).join(', ')}</p>
    `;
    pokemonInfo.innerHTML = pokemonHtml;
  } catch (error) {
    pokemonInfo.innerHTML = '<p>Error al obtener el Pokémon</p>';
    console.error(error);
  }
}

getPokemonButton.addEventListener('click', getRandomPokemon);
