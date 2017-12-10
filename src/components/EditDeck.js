import React, {Component} from 'react';
import {Body, Button, Container, Content, H1, Icon, Right, Text, Card, CardItem} from 'native-base';
import DefaultHeader from './header/DefaultHeader';
import PropTypes from 'prop-types';
import BackButton from './header/BackButton';
import {ADD_CARD_VIEW} from '../navigation/MainNavigator';

class EditDeck extends Component {

	constructor(props) {
		super();
		const {navigation} = props;
		this.state = {
			deck: {...navigation.state.params.deck}
		}
	}

	addCard = card => {
		const updatedState = {
			...this.state,
			deck: {
				...this.state.deck,
				cards: [...this.state.deck.cards, card]
			}
		};
		const {navigation} = this.props;
		return navigation.state.params.updateDeckHandler(updatedState.deck).then(
			() => this.setState(updatedState)
		);
	};

	deleteCard = card => {
		const updatedState = {
			...this.state,
			deck: {
				...this.state.deck,
				cards: this.state.deck.cards.filter(entry => entry.question !== card.question)
			}
		};
		const {navigation} = this.props;
		return navigation.state.params.updateDeckHandler(updatedState.deck).then(
			() => this.setState(updatedState)
		);
	};

	deleteDeck = () => {
		const {navigation} = this.props;
		navigation.state.params.deleteDeckHandler(this.state.deck.name).then(
			() => navigation.goBack()
		);
	};

	render() {
		const {navigation} = this.props;
		const {deck} = this.state;
		return (
			<Container>
				<DefaultHeader
					title='Edit deck'
					left={<BackButton navigation={navigation}/>}
					right={
						<Button transparent onPress={() =>
							this.props.navigation.navigate(ADD_CARD_VIEW,
								{onSubmitHandler: this.addCard})
						}>
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
									<Button transparent onPress={() => this.deleteCard(card)}>
										<Icon name='trash'/>
									</Button>
								</Right>
							</CardItem>
						</Card>
					))}
					<Body>
					<Button danger onPress={this.deleteDeck}><Text>Delete deck</Text></Button>
					</Body>
				</Content>
			</Container>
		);
	}
}

EditDeck.propTypes = {
	navigation: PropTypes.shape().isRequired
};

export default EditDeck;
