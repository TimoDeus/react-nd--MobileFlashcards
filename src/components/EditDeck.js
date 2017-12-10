import React, {Component} from 'react';
import {Body, Button, Container, Content, H1, Icon, List, ListItem, Right, Text} from 'native-base';
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
					<H1>{deck.name}</H1>
					<Text>The deck currently contains {deck.cards.length} cards.</Text>
					<List
						dataArray={deck.cards}
						renderRow={card =>
							<ListItem>
								<Body>
									<Text>{card.question}</Text>
								</Body>
								<Right>
									<Button small onPress={() => this.deleteCard(card)}><Text>Delete</Text></Button>
								</Right>
							</ListItem>
						}>
					</List>
				</Content>
				<Button onPress={this.deleteDeck}><Text>Delete deck</Text></Button>
			</Container>
		);
	}
}

EditDeck.propTypes = {
	navigation: PropTypes.shape().isRequired
};

export default EditDeck;
