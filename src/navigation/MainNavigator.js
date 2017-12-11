import {StackNavigator} from 'react-navigation';
import DeckList from '../components/DeckList';
import AddDeck from '../components/AddDeck';
import DeckDetails from '../components/DeckDetails';
import AddCard from '../components/AddCard';
import Deck from '../components/Deck';

export const DECK_LIST_VIEW = 'Home';
export const ADD_DECK_VIEW = 'AddDeck';
export const DECK_DETAIL_VIEW = 'EditDeck';
export const ADD_CARD_VIEW = 'AddCard';
export const DECK_VIEW = 'Deck';

const MainNavigator = StackNavigator({
	[DECK_LIST_VIEW]: {
		screen: DeckList,
	},
	[ADD_DECK_VIEW]: {
		screen: AddDeck
	},
	[DECK_DETAIL_VIEW]: {
		screen: DeckDetails
	},
	[ADD_CARD_VIEW]: {
		screen: AddCard
	},
	[DECK_VIEW]: {
		screen: Deck
	}
}, {headerMode: 'none'});

export default MainNavigator;
