import {StackNavigator} from 'react-navigation';
import DeckList from '../components/DeckList';
import AddDeck from '../components/AddDeck';
import EditDeck from '../components/EditDeck';
import AddCard from '../components/AddCard';

export const DECK_LIST_VIEW = 'Home';
export const ADD_DECK_VIEW = 'AddDeck';
export const EDIT_DECK_VIEW = 'EditDeck';
export const ADD_CARD_VIEW = 'AddCard';

const MainNavigator = StackNavigator({
	[DECK_LIST_VIEW]: {
		screen: DeckList,
	},
	[ADD_DECK_VIEW]: {
		screen: AddDeck
	},
	[EDIT_DECK_VIEW]: {
		screen: EditDeck
	},
	[ADD_CARD_VIEW]: {
		screen: AddCard
	}
}, {headerMode: 'none'});

export default MainNavigator;
