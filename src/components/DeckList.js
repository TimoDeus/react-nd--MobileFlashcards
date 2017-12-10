import React, {Component} from 'react';
import {
	Body,
	Button,
	Card,
	CardItem,
	Container,
	Content,
	H1,
	Icon,
	Left,
	Right,
	Text,
	Thumbnail,
	Toast
} from 'native-base';
import {ADD_DECK_VIEW, DECK_VIEW, EDIT_DECK_VIEW} from '../navigation/MainNavigator';
import {fetchDecks, storeDecks} from '../utils/api';
import DefaultHeader from './header/DefaultHeader';
import PropTypes from 'prop-types';
import {gravatarImageSrc} from '../utils/helper';

export default class DeckList extends Component {

	constructor() {
		super();
		this.state = {
			decks: []
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
		const decks = this.state.decks || [];
		const updatedDecks = [...decks, {cards: [], name: name}];
		return storeDecks(updatedDecks).then(
			() => this.setState(oldState => ({
				...oldState,
				decks: updatedDecks
			}))
		);
	};

	updateDeck = deck => {
		const updatedDecks = [...(this.state.decks || [])];
		const index = updatedDecks.findIndex(entry => entry.name === deck.name);
		updatedDecks[index] = deck;
		return storeDecks(updatedDecks).then(
			() => this.setState(oldState => ({
				...oldState,
				decks: updatedDecks
			}))
		);
	};

	deleteDeck = name => {
		const updatedDecks = this.state.decks.filter(deck => deck.name !== name);
		return storeDecks(updatedDecks).then(
			() => this.setState(oldState => ({
				...oldState,
				decks: updatedDecks
			}))
		);
	};

	navigateToEditDeck = deck => {
		this.props.navigation.navigate(EDIT_DECK_VIEW, {
			deleteDeckHandler: this.deleteDeck,
			updateDeckHandler: this.updateDeck,
			deck
		})
	};

	navigateToDeck = deck => {
		if (deck.cards.length) {
			this.props.navigation.navigate(DECK_VIEW, {
				deck
			});
		} else {
			Toast.show({
				text: 'Your deck is empty, please add some cards',
				type: 'warning',
				duration: 2000
			})
		}
	};

	navigateToAddDeck = () => {
		this.props.navigation.navigate(
			ADD_DECK_VIEW,
			{onSubmitHandler: this.addNewDeck}
		);
	};

	render() {
		const {decks} = this.state;
		return (
			<Container>
				<DefaultHeader
					title='Mobile Flashcards'
					right={
						<Button transparent onPress={this.navigateToAddDeck}>
							<Icon name="add"/>
						</Button>
					}
				/>
				<Content>
					<Body>
						<H1>Choose your deck</H1>
						{(!decks || decks.length === 0) &&
							<Text>You have no decks yet. Use the button in the upper right corner to add your first one!</Text>
						}
					</Body>
					{decks && decks.length > 0 && decks.map(deck => {
						const {name, cards} = deck;
						return (
							<Card key={name}>
								<CardItem button onPress={() => this.navigateToDeck(deck)}>
									<Left>
										<Thumbnail source={{uri: gravatarImageSrc(name)}}/>
										<Body>
										<Text>{name}</Text>
										<Text note>{cards.length} cards</Text>
										</Body>
									</Left>
									<Right>
										<Button transparent onPress={() => this.navigateToEditDeck(deck)}>
											<Text>Edit</Text>
										</Button>
									</Right>
								</CardItem>
							</Card>
						)
					})}
				</Content>
			</Container>
		);
	}
}

DeckList.propTypes = {
	navigation: PropTypes.shape().isRequired
};
