import React, {Component} from 'react';
import {Body, Button, Card, CardItem, Container, Content, H1, Right, Text, View} from 'native-base';
import DefaultHeader from './header/DefaultHeader';
import PropTypes from 'prop-types';
import BackButton from './header/BackButton';
import {shuffleArray} from '../utils/helper';

class Deck extends Component {

	constructor(props) {
		super();
		this.state = this.createNewState(props);
	}

	createNewState = props => {
		const {name, cards} = props.navigation.state.params.deck;
		const shuffledCards = shuffleArray([...cards]);
		return {
			correct: 0,
			cardsSeen: 1,
			remainingCards: shuffledCards,
			totalCardCount: cards.length,
			showAnswer: false,
			name,
		}
	};

	onNextCard = correct => {
		this.setState(state => {
				const remainingCards = [...state.remainingCards];
				remainingCards.pop();
				return {
					correct: state.correct + (correct ? 1 : 0),
					cardsSeen: state.cardsSeen + 1,
					showAnswer: false,
					remainingCards
				};
			}
		);
	};

	restart = () => {
		this.setState(this.createNewState(this.props));
	};

	toggleAnswer = () => {
		this.setState(state => ({showAnswer: !state.showAnswer}));
	};

	renderResults = () => {
		const {correct, totalCardCount} = this.state;
		return (
			<Content>
				<Body>
					<Text>Answered {correct} of {totalCardCount} questions correctly.</Text>
					<Button onPress={this.restart}>
						<Text>Restart</Text>
					</Button>
				</Body>
			</Content>
		);
	};

	renderControls = () => {
		return (
			<View style={{
				flexDirection: "row",
				flex: 1,
				position: "absolute",
				bottom: 50,
				left: 0,
				right: 0,
				justifyContent: 'space-between',
				padding: 15
			}}>
				<Button danger onPress={() => this.onNextCard(false)}>
					<Text>Incorrect</Text>
				</Button>
				<Button success onPress={() => this.onNextCard(true)}>
					<Text>Correct</Text>
				</Button>
			</View>
		);
	};

	render() {
		const {navigation} = this.props;
		const {name, remainingCards, cardsSeen, totalCardCount, correct} = this.state;
		const card = [...remainingCards].pop();
		return (
			<Container>
				<DefaultHeader title={name} left={<BackButton navigation={navigation}/>}/>
				<Content>
					{card ? (
						<Card>
							<CardItem header>
								<Body>
								<Text>Question {cardsSeen} of {totalCardCount}</Text>
								<Text note>{correct} correct so far</Text>
								</Body>
								<Right>
									<Button transparent onPress={this.toggleAnswer}><Text>Toggle Answer</Text></Button>
								</Right>
							</CardItem>
							<CardItem>
								<Body>
								<H1>{card.question}</H1>

								{this.state.showAnswer && <Text>{card.answer}</Text>}
								</Body>
							</CardItem>
						</Card>
					) : this.renderResults()
					}
				</Content>
				{card && this.renderControls()}
			</Container>
		);
	}
}

Deck.propTypes = {
	navigation: PropTypes.shape().isRequired
};

export default Deck;
