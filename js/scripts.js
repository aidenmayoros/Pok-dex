const pokemonRepository = (function () {
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

	function getAll() {
		return pokemonList;
	}

	function addNewPokemon(newPokemon) {
		if (typeof newPokemon !== 'object') {
			return console.log('Error: data was not of type object');
		}
		// Check if new Pokemon object has all the required keys.
		if (JSON.stringify(Object.keys(newPokemon)) !== JSON.stringify(['name', 'detailsUrl'])) {
			return console.log('Error: data was not in the correct format');
		}

		pokemonList.push(newPokemon);
	}

	// Create a button for Pokemon and function when clicked then append it to the Pokemon list.
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
		loadDetails(pokemon).then(() => {
			console.log(pokemon);
			// Add more logic here to display pokemon data to UI
		});
	}

	// Pull details about clicked Pokemon from API and add them to the clicked Pokemon object
	function loadDetails(pokemon) {
		showLoadingMessage();
		let url = pokemon.detailsUrl;
		return fetch(url)
			.then((response) => response.json())
			.then((details) => {
				pokemon.imageUrl = details.sprites.front_default;
				pokemon.height = details.height;
				pokemon.types = details.types;
				hideLoadingMessage();
			})
			.catch((e) => {
				hideLoadingMessage();
				console.error(e);
			});
	}

	// Get a list of Pokemon from the Pokemon API and then add the data to Pokemon array
	function loadList() {
		showLoadingMessage();
		return fetch(apiUrl)
			.then((response) => response.json())
			.then((json) => {
				json.results.forEach((item) => {
					let pokemon = {
						name: item.name,
						detailsUrl: item.url,
					};
					addNewPokemon(pokemon);
				});
				hideLoadingMessage();
			})
			.catch((e) => {
				hideLoadingMessage();
				console.error(e);
			});
	}

	// Search for a Pokemon by it's name.
	function find(pokemonName) {
		const foundPokemon = pokemonList.filter((pokemon) => {
			return pokemon.name === pokemonName;
		});
		if (foundPokemon.length === 0) {
			return console.log('Found no pokemon by that name');
		}
		// Add more logic to update UI with data and better filtering instead of identical name.
	}

	function showLoadingMessage() {
		const messageContainer = document.getElementById('loading-message');
		messageContainer.classList.remove('hide-loading-message');
		messageContainer.classList.add('show-loading-message');
	}

	function hideLoadingMessage() {
		const messageContainer = document.getElementById('loading-message');
		messageContainer.classList.remove('show-loading-message');
		messageContainer.classList.add('hide-loading-message');
	}

	return {
		getAll: getAll,
		addNewPokemon: addNewPokemon,
		find: find,
		addListItem: addListItem,
		loadList: loadList,
		loadDetails: loadDetails,
	};
})();

pokemonRepository.loadList().then(() => {
	// Now the data is loaded!
	pokemonRepository.getAll().forEach((pokemon) => {
		pokemonRepository.addListItem(pokemon);
	});
});

function searchPokemon() {
	let searchInput = document.getElementById('name-input').value;

	if (searchInput.length === 0) {
		return;
	}
	pokemonRepository.find(searchInput);
}
