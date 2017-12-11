import {ADD_DECK, ADD_CARD_TO_DECK, REMOVE_CARD_FROM_DECK, REMOVE_DECK, FETCH_DECKS} from '../actions/actionTypes.js';
import {Map} from 'immutable';

const reducer = (state = {}, action) => {
	const {payload} = action;
	switch (action.type) {
		case FETCH_DECKS: {
			const newState = Map(state).set('decks', payload ? [...payload] : []);
			return newState.toJS();
		}
		case ADD_DECK: {
			const deck = {name: payload.deckName, cards: []};
			const newState = Map(state).updateIn(['decks'], decks => [...decks, deck]);
			return newState.toJS();
		}
		case REMOVE_DECK: {
			const newState = Map(state).set('decks', state.decks.filter(entry => entry.name !== payload.deckName));
			return newState.toJS();
		}
		case ADD_CARD_TO_DECK: {
			const newState = Map(state).setIn(['decks', payload.deckName, 'cards'], cards => [...cards, payload.card]);
			return newState.toJS();
		}
		case REMOVE_CARD_FROM_DECK: {
			const cards = state.decks[payload.deckName].cards;
			const filteredCards = cards.filter(entry => entry.question !== payload.card.question);
			const newState = Map(state).setIn(['decks', payload.deckName, 'cards'], () => filteredCards);
			return newState.toJS();
		}
		default:
			return state;
	}
};

export default reducer;
