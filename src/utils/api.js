import {AsyncStorage} from 'react-native';

const DECK_STORAGE_KEY = 'DECK_STORAGE_KEY';

export function fetchDecks() {
	return AsyncStorage.getItem(DECK_STORAGE_KEY)
}

export function storeDecks(decks) {
	return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks));
}
