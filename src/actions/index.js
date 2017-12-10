import {ADD_DECK, ADD_CARD_TO_DECK, REMOVE_CARD_FROM_DECK, REMOVE_DECK, FETCH_DECKS} from './actionTypes.js';

export const addDeck = deckName => ({
	type: ADD_DECK,
	payload: {deckName}
});

export const removeDeck = deckName => ({
	type: REMOVE_DECK,
	payload: {deckName}
});

export const addCardToDeck = (deckName, card) => ({
	type: ADD_CARD_TO_DECK,
	payload: {deckName, card}
});

export const removeCardFromDeck = (deckName, card) => ({
	type: REMOVE_CARD_FROM_DECK,
	payload: {deckName, card}
});

export const fetchDecks = decks => ({
	type: FETCH_DECKS,
	payload: decks
});
