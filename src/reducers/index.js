import {ADD_DECK, ADD_CARD_TO_DECK, REMOVE_CARD_FROM_DECK, REMOVE_DECK, FETCH_DECKS} from '../actions/actionTypes.js';

const reducer = (state = {}, action) => {
	const {payload} = action;
	switch (action.type) {
		case FETCH_DECKS:
			console.log(action);
			return {
				...state,
				decks: payload ?  [...payload] : []
			};
		case ADD_DECK:
			return {
				...state,
				decks: [...state.decks, {name: payload.deckName, cards: []}]
			};
		case REMOVE_DECK:
			return {
				...state,
				decks: state.decks.filter(entry => entry.name !== payload.deckName)
			};
		case ADD_CARD_TO_DECK: {
			const newDecks = [...{...state.decks}];
			newDecks[payload.deckName].cards.push(payload.card);
			return {
				...state,
				decks: newDecks
			};
		}
		case REMOVE_CARD_FROM_DECK: {
			const newDecks = [...{...state.decks}];
			const cards = newDecks[payload.deckName].cards.push(payload.card);
			newDecks[payload.deckName].cards = cards.filter(entry => entry.question !== payload.card.question);
			return {
				...state,
				decks: newDecks
			};
		}
		default:
			return state;
	}
};

export default reducer;
