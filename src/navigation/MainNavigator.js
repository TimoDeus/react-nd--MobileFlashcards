import {StackNavigator} from 'react-navigation';
import DeckList from '../components/DeckList';
import AddDeck from '../components/AddDeck';

export const DECK_LIST_VIEW = 'Home';
export const ADD_DECK_VIEW = 'AddDeck';

const MainNavigator = StackNavigator({
	[DECK_LIST_VIEW]: {
		screen: DeckList,
	},
	[ADD_DECK_VIEW]: {
		screen: AddDeck
	}
});

export default MainNavigator;
