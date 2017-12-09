import {AsyncStorage} from 'react-native';

const DECK_STORAGE_KEY = 'DECK_STORAGE_KEY';

export function fetchDecks() {
	return AsyncStorage.getItem(DECK_STORAGE_KEY)
}

export function clearDecks() {
	return AsyncStorage.removeItem(DECK_STORAGE_KEY);
}

export const addDeck = deckName => {
	return updateDeck(deckName, []);
};

export const updateDeck = (deckName, cards) => {
	return AsyncStorage.mergeItem(
		DECK_STORAGE_KEY,
		JSON.stringify({[deckName]: cards})
	);
};
