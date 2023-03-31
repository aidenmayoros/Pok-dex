let pokemonRepository = (function () {
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
		pokemonList.push(newPokemon);
	}

	return {
		getAll: getAll,
		add: add,
	};
})();

// Returns the Pokemon object that has the highest height from the Pokemon Repository.
const tallestPokemon = pokemonRepository.getAll().reduce(function (prev, current) {
	return prev.height > current.height ? prev : current;
});

// Loop through all the Pokemon and print them to the webpage and say which one is the tallest one.
pokemonRepository.getAll().forEach((pokemon) => {
	let pokemonString = `${pokemon.name} (height: ${pokemon.height})`;
	if (pokemon === tallestPokemon) {
		document.write("<p class='pokemon'>" + pokemonString + ' <= This is the tallest Pokemon! </p>');
	} else {
		document.write("<p class='pokemon'>" + pokemonString + '</p>');
	}
});
