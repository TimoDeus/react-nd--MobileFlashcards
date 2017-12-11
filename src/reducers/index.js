import {ADD_DECK, ADD_CARD_TO_DECK, REMOVE_CARD_FROM_DECK, REMOVE_DECK, FETCH_DECKS} from '../actions/actionTypes.js';
import {fromJS} from 'immutable';

const reducer = (state = {}, action) => {
	const {payload} = action;
	switch (action.type) {
		case FETCH_DECKS: {
			const newState = fromJS(state).set('decks', payload ? [...payload] : []);
			return newState.toJS();
		}
		case ADD_DECK: {
			const deck = {name: payload.deckName, cards: []};
			const decks = [...state.decks, deck];
			const newState = fromJS(state).set('decks', decks);
			return newState.toJS();
		}
		case REMOVE_DECK: {
			const newState = fromJS(state).set('decks', state.decks.filter(entry => entry.name !== payload.deckName));
			return newState.toJS();
		}
		case ADD_CARD_TO_DECK: {
			const index = state.decks.findIndex(entry => entry.name === payload.deckName);
			const newCards = [...state.decks[index].cards, payload.card];
			const newState = fromJS(state).setIn(['decks', index, 'cards'], newCards);
			return newState.toJS();
		}
		case REMOVE_CARD_FROM_DECK: {
			const index = state.decks.findIndex(entry => entry.name === payload.deckName);
			const cards = state.decks[index].cards;
			const filteredCards = cards.filter(entry => entry.question !== payload.card.question);
			const newState = fromJS(state).setIn(['decks', index, 'cards'], filteredCards);
			return newState.toJS();
		}
		default:
			return state;
	}
};

export default reducer;
