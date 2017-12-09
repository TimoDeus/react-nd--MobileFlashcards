import React, {Component} from 'react';
import {Body, Button, Card, CardItem, Container, Content, Fab, Icon, Left, Right, Text, Thumbnail} from 'native-base';
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
		const {decks} = this.state;
		return (
			<Container>
				<DefaultHeader title='Choose your deck'/>
				<Content>
					{decks ? Object.keys(decks).map(name => {
						return (
							<Card key={name}>
								<CardItem>
									<Left>
										<Thumbnail source={{uri: 'Image URL'}}/>
										<Body>
										<Text>{name}</Text>
										<Text note>{decks[name].length} cards</Text>
										</Body>
									</Left>
									<Right>
										<Button transparent>
											<Icon active name="trash" />
											<Text>Delete</Text>
										</Button>
									</Right>
								</CardItem>
							</Card>
						)
					}) : (
						<Card>
							<CardItem cardBody>
								<Text>No decks yet</Text>
							</CardItem>
						</Card>
					)}
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
