const pokemonRepository = (function () {
	let pokemonList = [
		{
			name: 'Bulbasaur',
			height: 0.7,
			types: ['grass', 'poison'],
		},
		{
			name: 'Charmander',
			height: 0.6,
			types: ['fire'],
		},
		{
			name: 'Squirtle',
			height: 0.5,
			types: ['water'],
		},
		{
			name: 'Bulbasaur',
			height: 0.7,
			types: ['grass', 'poison'],
		},
		{
			name: 'Charmander',
			height: 0.6,
			types: ['fire'],
		},
		{
			name: 'Squirtle',
			height: 0.5,
			types: ['water'],
		},
		{
			name: 'Bulbasaur',
			height: 0.7,
			types: ['grass', 'poison'],
		},
		{
			name: 'Charmander',
			height: 0.6,
			types: ['fire'],
		},
		{
			name: 'Squirtle',
			height: 0.5,
			types: ['water'],
		},
		{
			name: 'Bulbasaur',
			height: 0.7,
			types: ['grass', 'poison'],
		},
		{
			name: 'Charmander',
			height: 0.6,
			types: ['fire'],
		},
		{
			name: 'Squirtle',
			height: 0.5,
			types: ['water'],
		},
		{
			name: 'Bulbasaur',
			height: 0.7,
			types: ['grass', 'poison'],
		},
		{
			name: 'Charmander',
			height: 0.6,
			types: ['fire'],
		},
		{
			name: 'Squirtle',
			height: 0.5,
			types: ['water'],
		},
		{
			name: 'Bulbasaur',
			height: 0.7,
			types: ['grass', 'poison'],
		},
		{
			name: 'Charmander',
			height: 0.6,
			types: ['fire'],
		},
		{
			name: 'Squirtle',
			height: 0.5,
			types: ['water'],
		},
	];

	function getAll() {
		return pokemonList;
	}

	function addNewPokemon(newPokemon) {
		// Check if new Pokemon is of the object data type.
		if (typeof newPokemon !== 'object') {
			return console.log('Error: data was not of type object');
		}
		// Check if new Pokemon object has all the required keys.
		if (JSON.stringify(Object.keys(newPokemon)) !== JSON.stringify(['name', 'height', 'types'])) {
			return console.log('Error: data was not in the correct format');
		}
		// Add new Pokemon object to list
		pokemonList.push(newPokemon);
	}

	// Create a button for a Pokemon and function when clicked then append it to the Pokemon list.
	function addListItem(pokemon) {
		const pokemonUl = document.querySelector('.pokemon-list');

		const listItem = document.createElement('li');
		const button = document.createElement('button');
		button.innerText = pokemon.name;
		button.classList.add('button__primary');
		button.addEventListener('click', () => showDetails(pokemon));

		listItem.appendChild(button);
		pokemonUl.appendChild(listItem);
	}

	function showDetails(pokemon) {
		// Add more logic here to display pokemon data to UI
		console.log(pokemon.name);
	}

	// Search for a Pokemon in pokemonList by it's name.
	function find(pokemonName) {
		const foundPokemon = pokemonList.filter((pokemon) => {
			return pokemon.name === pokemonName;
		});
		if (foundPokemon.length === 0) {
			return console.log('Found no pokemon by that name');
		}
		// Add more logic to update UI with data and better filtering instead of identical name.
	}

	return {
		getAll: getAll,
		addNewPokemon: addNewPokemon,
		find: find,
		addListItem: addListItem,
	};
})();

// Loop through all the Pokemon and display them to the webpage.
pokemonRepository.getAll().forEach((pokemon) => {
	pokemonRepository.addListItem(pokemon);
});

function searchPokemon() {
	let searchInput = document.getElementById('name-input').value;

	if (searchInput.length === 0) {
		return;
	}
	pokemonRepository.find(searchInput);
}
