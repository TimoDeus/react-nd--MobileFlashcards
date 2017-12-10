import React, {Component} from 'react';
import {Body, Button, Card, CardItem, Container, Content, H1, Icon, Right, Text} from 'native-base';
import DefaultHeader from './header/DefaultHeader';
import PropTypes from 'prop-types';
import BackButton from './header/BackButton';
import {ADD_CARD_VIEW} from '../navigation/MainNavigator';
import {connect} from 'react-redux';
import {removeCardFromDeck, removeDeck} from '../actions/index';

class EditDeck extends Component {

	render() {
		const {navigation, removeCard, removeDeck} = this.props;
		const {deck} = this.state;
		return (
			<Container>
				<DefaultHeader
					title='Edit deck'
					left={<BackButton navigation={navigation}/>}
					right={
						<Button transparent onPress={() =>
							this.props.navigation.navigate(ADD_CARD_VIEW)}>
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
									<Button transparent onPress={() => removeCard(card)}>
										<Icon name='trash'/>
									</Button>
								</Right>
							</CardItem>
						</Card>
					))}
					<Body>
					<Button danger onPress={removeDeck}><Text>Delete deck</Text></Button>
					</Body>
				</Content>
			</Container>
		);
	}
}

EditDeck.propTypes = {
	navigation: PropTypes.shape().isRequired,
	deckName: PropTypes.string.isRequired,
	removeDeck: PropTypes.func.isRequired,
	removeCard: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
	deck: state.decks.find(entry => entry.name === ownProps.navigation.state.params.deckName),
	deckName: ownProps.navigation.state.params.deckName
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	removeDeck: () => dispatch(removeDeck(ownProps.deckName)),
	removeCard: card => dispatch(removeCardFromDeck(ownProps.deckName, card))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditDeck);
