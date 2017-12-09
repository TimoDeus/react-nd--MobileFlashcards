import React, {Component} from 'react';
import {Button, Container, Content, Fab, Icon, Text} from 'native-base';
import {ADD_DECK_VIEW} from '../navigation/MainNavigator';
import {addDeck, clearDecks, fetchDecks, updateDeck} from '../utils/api';
import DefaultHeader from './DefaultHeader';

export default class DeckList extends Component {

	constructor() {
		super();
		this.state = {
			decks: {}
		}
	}

	componentDidMount() {
		this.fetchAllDecks();
	}

	fetchAllDecks = () => {
		fetchDecks().then(
			data => this.setState({decks: JSON.parse(data)})
		);
	};

	addNewDeck = () => {
		const name = 'myDeck';
		addDeck(name).then(this.fetchAllDecks);
	};

	addNewCard = () => {
		const card = {name: Date.now()};
		const existingCards = this.state.decks['myDeck'];
		const cards = [...existingCards, card];
		updateDeck('myDeck', cards).then(this.fetchAllDecks);
	};

	removeDecks = () => {
		clearDecks().then(this.fetchAllDecks);
	};

	render() {
		return (
			<Container>
				<DefaultHeader title='Mobile Flashcards'/>
				<Content>
					<Text>{JSON.stringify(this.state.decks)}</Text>
					<Button onPress={() => this.addNewDeck()}>
						<Text>Add New Deck</Text>
					</Button>
					<Button onPress={() => this.addNewCard()}>
						<Text>Add New Card</Text>
					</Button>
					<Button onPress={() => this.removeDecks()}>
						<Text>Remove all decks</Text>
					</Button>

				</Content>
				<Fab
					position="bottomRight"
					onPress={() => this.props.navigation.navigate(ADD_DECK_VIEW)}>
					<Icon ios="ios-add" android='md-add'/>
				</Fab>
			</Container>
		);
	}
}
