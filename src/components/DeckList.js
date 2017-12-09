import React, {Component} from 'react';
import {Button, Container, Content, Fab, Icon, Text} from 'native-base';
import {ADD_DECK_VIEW} from '../navigation/MainNavigator';
import {addDeck, clearDecks, fetchDecks, updateDeck} from '../utils/api';
import DefaultHeader from './header/DefaultHeader';
import PropTypes from 'prop-types';

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

	addNewDeck = name => {
		return addDeck(name).then(this.fetchAllDecks);
	};

	addNewCard = () => {
		const card = {name: Date.now()};
		const existingCards = this.state.decks['myDeck'];
		const cards = [...existingCards, card];
		return updateDeck('myDeck', cards).then(this.fetchAllDecks);
	};

	removeDecks = () => {
		return clearDecks().then(this.fetchAllDecks);
	};

	render() {
		return (
			<Container>
				<DefaultHeader title='Choose your deck'/>
				<Content>
					<Text>{JSON.stringify(this.state.decks)}</Text>
					<Button onPress={() => this.addNewCard()}>
						<Text>Add New Card</Text>
					</Button>
					<Button onPress={() => this.removeDecks()}>
						<Text>Remove all decks</Text>
					</Button>
				</Content>
				<Fab
					position="bottomRight"
					onPress={() => this.props.navigation.navigate(ADD_DECK_VIEW, {onSubmitHandler: this.addNewDeck})}>
					<Icon name="add"/>
				</Fab>
			</Container>
		);
	}
}

DeckList.propTypes = {
	navigation: PropTypes.shape().isRequired
};
