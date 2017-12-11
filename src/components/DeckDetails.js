import React, {Component} from 'react';
import {Body, Button, Card, CardItem, Container, Content, H1, Icon, Right, Text} from 'native-base';
import DefaultHeader from './header/DefaultHeader';
import PropTypes from 'prop-types';
import BackButton from './header/BackButton';
import {ADD_CARD_VIEW} from '../navigation/MainNavigator';
import {connect} from 'react-redux';
import {removeCardFromDeck, removeDeck} from '../actions/index';
import {deleteDeck, updateDeck} from '../utils/api';

class DeckDetails extends Component {

	render() {
		const {navigation, removeCard, removeDeck} = this.props;
		const {deck} = this.props;
		return deck ? (
			<Container>
				<DefaultHeader
					title='Deck details'
					left={<BackButton navigation={navigation}/>}
					right={
						<Button transparent onPress={() =>
							this.props.navigation.navigate(ADD_CARD_VIEW, {deckName: deck.name})}>
							<Icon name="add"/>
						</Button>
					}
				/>
				<Content>
					<Body>
					<H1>{deck.name}</H1>
					<Text>The deck currently contains {deck.cards.length} card(s).</Text>
					</Body>
					{deck.cards.map(card => (
						<Card key={card.question}>
							<CardItem>
								<Body>
								<Text>{card.question}</Text>
								</Body>
								<Right>
									<Button transparent onPress={() => removeCard(deck, card)}>
										<Icon name='trash'/>
									</Button>
								</Right>
							</CardItem>
						</Card>
					))}
					<Body>
					<Button danger onPress={() => removeDeck(deck.name)}><Text>Delete deck</Text></Button>
					</Body>
				</Content>
			</Container>
		) : null;
	}
}

DeckDetails.propTypes = {
	navigation: PropTypes.shape().isRequired,
	deckName: PropTypes.string.isRequired,
	deck: PropTypes.shape(),
	removeDeck: PropTypes.func.isRequired,
	removeCard: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
	deck: state.decks.find(entry => entry.name === ownProps.navigation.state.params.deckName),
	deckName: ownProps.navigation.state.params.deckName
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	removeDeck: deckName => {
		deleteDeck(deckName).then(
			() => {
				dispatch(removeDeck(deckName));
				ownProps.navigation.goBack();
			}
		);
	},
	removeCard: (deck, card) => {
		const filteredCards = deck.cards.filter(entry => entry.question !== card.question);
		updateDeck(deck.name, filteredCards).then(
			() => dispatch(removeCardFromDeck(deck.name, card))
		);
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetails);
