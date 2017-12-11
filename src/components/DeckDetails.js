import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Body, Button, Card, CardItem, Container, Content, H1, Icon, Right, Text, View} from 'native-base';
import DefaultHeader from './header/DefaultHeader';
import PropTypes from 'prop-types';
import BackButton from './header/BackButton';
import {ADD_CARD_VIEW, DECK_VIEW} from '../navigation/MainNavigator';
import {connect} from 'react-redux';
import {removeCardFromDeck, removeDeck} from '../actions/index';
import {deleteDeck, updateDeck} from '../utils/api';

class DeckDetails extends Component {

	renderControls = deck => {
		return (
			<View style={styles.buttonContainer}>
				<Button transparent onPress={() =>
					this.props.navigation.navigate(ADD_CARD_VIEW, {deckName: deck.name})}>
					<Text>Add card</Text>
				</Button>
				<Button transparent danger onPress={() => this.props.removeDeck(deck.name)}>
					<Text>Delete deck</Text>
				</Button>
			</View>
		);
	};

	render() {
		const {navigation, removeCard} = this.props;
		const {deck} = this.props;
		return deck ? (
			<Container>
				<DefaultHeader
					title='Deck details'
					left={<BackButton navigation={navigation}/>}
				/>
				<Content>
					<Body>
					<H1>{deck.name}</H1>
						{deck.cards.length > 0 && (
					<View style={styles.container}>
							<Button onPress={() => this.props.navigation.navigate(DECK_VIEW, {deck})}>
								<Text>Start learning</Text>
							</Button>
					</View>
						)}
						<Text>The deck currently contains {deck.cards.length} card(s).</Text>
					</Body>
					{this.renderControls(deck)}
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
				</Content>
			</Container>
		) : null;
	}
}

const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: "row",
		flex: 1,
		justifyContent: 'space-between',
		padding: 15
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 15
	}
});

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
