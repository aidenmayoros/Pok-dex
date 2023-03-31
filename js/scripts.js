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

// Returns the Pokemon object that has the highest height
const tallestPokemon = pokemonList.reduce(function (prev, current) {
	return prev.height > current.height ? prev : current;
});

// Loop through the Pokemon and print them to webpage in a Div, adding some extra text to the tallest one.
pokemonList.forEach((pokemon) => {
	let pokemonString = `${pokemon.name} (height: ${pokemon.height})`;
	if (pokemon === tallestPokemon) {
		document.write("<p class='pokemon'>" + pokemonString + ' <= This is the tallest Pokemon! </p>');
	} else {
		document.write("<p class='pokemon'>" + pokemonString + '</p>');
	}
});
