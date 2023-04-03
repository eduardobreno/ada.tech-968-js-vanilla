const URL = `https://pokeapi.co/api/v2`;

function shuffle(toSuffle) {
  return toSuffle
    .map((value) => {
      return { ...value, sort: Math.random() };
    })
    .sort((a, b) => a.sort - b.sort);
}

function get4Pokemon(pokemons) {
  return pokemons.splice(0, 4);
}

async function getAllPokemon() {
  const response = await fetch(`${URL}/pokemon/?limit=151`);
  const result = await response.json();
  return result.results;
}

function generateImageUrl(pokemon) {
  const id = pokemon.url.split("/").at(-2);
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

async function init() {
  const pokemons = await getAllPokemon();
  const randomPokemons = shuffle(pokemons);
  const selectedPokemons = get4Pokemon(randomPokemons);

  const whosIsThat = selectedPokemons[0];
  const whoIsThatImage = generateImageUrl(whosIsThat);

  const pokemonName = document.querySelector("#pokemonName");
  const pokemonImage = document.querySelector("#pokemonImage");

  const choicesContainer = document.querySelector(".choices");

  choicesContainer.innerHTML = "";
  shuffle(selectedPokemons).forEach((p) => {
    choicesContainer.innerHTML += `<button class="${p.name}">${p.name}</button>`;
  });

  selectedPokemons.forEach((p) => {
    choicesContainer
      .querySelector(`.${p.name}`)
      .addEventListener("click", () => {
        pokemonName.innerHTML = whosIsThat.name;
        pokemonImage.style.filter = "brightness(1)";

        if (p.name === whosIsThat.name) {
          console.log("Ganhou!");
        } else {
          console.log("Perdeu");
        }
      });
  });

  pokemonImage.src = whoIsThatImage;
  pokemonImage.style.filter = "brightness(0)";
}

init();

document.querySelector("#app").innerHTML = /*html*/ `
  <div>
    <h1>Quem é esse pokemon?</h1>
    <img id="pokemonImage" src='' />
    <p id="pokemonName"></p>
    <div class="choices"></div>
    <br />
    <button class="reset">Reiniciar</button>
  </div>
`;

document
  .querySelector("#app")
  .querySelector(".reset")
  .addEventListener("click", init);
