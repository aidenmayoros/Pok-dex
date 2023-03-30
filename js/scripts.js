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
for (let i = 0; i < pokemonList.length; i++) {
	let pokemon = `${pokemonList[i].name} (height: ${pokemonList[i].height})`;
	if (pokemonList[i] === tallestPokemon) {
		document.write("<div class='pokemon'>");
		document.write(pokemon + ' <= This is the tallest Pokemon!');
		document.write('</div>');
	} else {
		document.write("<div class='pokemon'>");
		document.write(pokemon);
		document.write('</div>');
	}
}
