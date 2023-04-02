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
	];

	function getAll() {
		return pokemonList;
	}

	function add(newPokemon) {
		// Check if new Pokemon is of the object data type
		if (typeof newPokemon !== 'object') {
			return console.log('Error: data was not of type object');
		}
		// Check if new Pokemon object has all the required keys
		if (JSON.stringify(Object.keys(newPokemon)) !== JSON.stringify(['name', 'height', 'types'])) {
			return console.log('Error: data was not in the correct format');
		}
		// Add new Pokemon object to list
		pokemonList.push(newPokemon);
	}

	function addListItem(pokemon) {
		const pokemonString = `${pokemon.name} (height: ${pokemon.height})`;
		const pokemonUl = document.querySelector('.pokemon-list');

		let listItem = document.createElement('li');
		let button = document.createElement('button');
		button.innerText = pokemon.name;
		button.classList.add('button__primary');

		listItem.appendChild(button);
		pokemonUl.appendChild(listItem);
	}

	// Search for a Pokemon in pokemonList by it's name
	function find(pokemonName) {
		return pokemonList.filter((pokemon) => {
			return pokemon.name === pokemonName;
		});
	}

	return {
		getAll: getAll,
		add: add,
		find: find,
		addListItem: addListItem,
	};
})();

// Returns the Pokemon object that has the highest height from the Pokemon Repository.
const tallestPokemon = pokemonRepository.getAll().reduce(function (prev, current) {
	return prev.height > current.height ? prev : current;
});

// Loop through all the Pokemon and print them to the webpage and say which one is the tallest one.
pokemonRepository.getAll().forEach((pokemon) => {
	pokemonRepository.addListItem(pokemon);
});

// if (pokemon === tallestPokemon) {
// 	document.write("<p class='pokemon'>" + pokemonString + ' <= This is the tallest Pokemon! </p>');
// } else {
// 	document.write("<p class='pokemon'>" + pokemonString + '</p>');
// }
