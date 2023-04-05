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

	// Open Pokemon Modal on click
	function showDetails(pokemon) {
		loadDetails(pokemon).then(() => {
			pokemonModal.showModal(pokemon);
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
				pokemon.weight = details.weight;
				pokemon.types = details.types;
				hideLoadingMessage();
			})
			.catch((e) => {
				hideLoadingMessage();
				console.error(e);
			});
	}

	// Get a list of Pokemon from the Pokemon API and then add the data to Pokemon array.
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

// Start of the Pokemon Modal.
const pokemonModal = (function () {
	function makeModalCloseButton() {
		let closeButtonElement = document.createElement('button');
		closeButtonElement.classList.add('pokedex-modal-close');
		closeButtonElement.innerText = 'Close';
		closeButtonElement.addEventListener('click', hideModal);

		return closeButtonElement;
	}

	function makePokemonImg({ imageUrl }) {
		let imgContainer = document.querySelector('.pokemon-img-container');
		let pokemonImg = document.createElement('img');
		pokemonImg.src = imageUrl;
		pokemonImg.classList.add('pokemon-img');
		imgContainer.appendChild(pokemonImg);

		return imgContainer;
	}

	function makePokemonHeightAndWeight({ height, weight }) {
		let physicalTraitContainer = document.querySelector('#about-screen');
		let pysicalTraits = `Height: ${height}` + '<br>' + `Weight: ${weight}`;
		physicalTraitContainer.innerHTML = pysicalTraits;

		return physicalTraitContainer;
	}

	function makePokemonType({ types }) {
		let typeContainer = document.querySelector('#type-screen');
		let pokemonType = types[0].type.name;
		typeContainer.innerHTML = pokemonType;

		return typeContainer;
	}

	function showModal(props) {
		// Make and edit all details in modal.
		makePokemonImg(props);
		makePokemonHeightAndWeight(props);
		makePokemonType(props);

		// Append modal and close button to container.
		let modalContainer = document.querySelector('#pokedex-modal-container');
		let modal = document.querySelector('.pokedex-modal');
		modal.appendChild(makeModalCloseButton());
		modalContainer.appendChild(modal);

		// Display modal container and modal.
		modalContainer.classList.add('is-visible');
		modal.style.display = 'inline-block';

		// Close modal when clicked outside of it.
		modalContainer.addEventListener('click', (e) => {
			let target = e.target;
			if (target === modalContainer) {
				hideModal();
			}
		});

		window.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
				pokemonModal.hideModal();
			}
		});
	}

	function hideModal() {
		let modalContainer = document.querySelector('#pokedex-modal-container');

		// Clear the previous modal content and close button.
		if (document.querySelector('.pokedex-modal-close')) {
			document.querySelector('.pokedex-modal-close').remove();
		}

		if (document.querySelector('.pokemon-img')) {
			document.querySelector('.pokemon-img').remove();
		}

		if (document.querySelector('#about-screen').innerHTML !== '') {
			document.querySelector('#about-screen').innerHTML = '';
		}

		if (document.querySelector('#type-screen').innerHTML !== '') {
			document.querySelector('#type-screen').innerHTML = '';
		}

		modalContainer.classList.remove('is-visible');
	}

	return {
		showModal: showModal,
		hideModal: hideModal,
	};
})();

// Get Pokemon from API add to local storage and then display them into a list onto page.
pokemonRepository.loadList().then(() => {
	pokemonRepository.getAll().forEach((pokemon) => {
		pokemonRepository.addListItem(pokemon);
	});
});
