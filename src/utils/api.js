import {AsyncStorage} from 'react-native';

const DECK_STORAGE_KEY = 'DECK_STORAGE_KEY';

export function loadDecks() {
	return AsyncStorage.getItem(DECK_STORAGE_KEY)
}

export function storeDecks(decks) {
	return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks));
}

export function storeNewDeck(deckName) {
	return updateOrCreateDeck(deckName, []);
}

export function updateOrCreateDeck(deckName, cards) {
	const deck = {name: deckName, cards};
	return loadDecks().then(
		result => {
			const decks = JSON.parse(result);
			const index = decks.findIndex(entry => entry.name === deckName);
			if (index === -1) {
				decks.push(deck)
			} else {
				decks[index] = deck;
			}
			return storeDecks(decks);
		}
	);
}

export function deleteDeck(deckName) {
	return loadDecks().then(
		result => {
			const decks = JSON.parse(result);
			const filteredDecks = decks.filter(entry => entry.name !== deckName);
			return storeDecks(filteredDecks);
		}
	);
}
