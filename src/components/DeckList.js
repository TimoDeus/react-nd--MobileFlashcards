import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Body, Button, Card, CardItem, Container, Content, H1, Icon, Left, Right, Text, Thumbnail} from 'native-base';
import {ADD_DECK_VIEW, DECK_DETAIL_VIEW} from '../navigation/MainNavigator';
import {loadDecks} from '../utils/api';
import DefaultHeader from './header/DefaultHeader';
import PropTypes from 'prop-types';
import {gravatarImageSrc} from '../utils/helper';
import {fetchDecks} from '../actions/index';

class DeckList extends Component {

	componentDidMount() {
		this.fetchAllDecks();
	}

	fetchAllDecks = () => {
		const {fetchData} = this.props;
		loadDecks().then(
			data => fetchData(JSON.parse(data))
		);
	};

	dispatchNavigation = (target, params = {}) => {
		this.props.navigation.navigate(target, params);
	};

	render() {
		const {decks} = this.props;
		return (
			<Container>
				<DefaultHeader
					title='Mobile Flashcards'
					right={
						<Button transparent onPress={() => this.dispatchNavigation(ADD_DECK_VIEW)}>
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
								<CardItem button onPress={() => this.dispatchNavigation(DECK_DETAIL_VIEW, {deckName: name})}>
									<Left>
										<Thumbnail source={{uri: gravatarImageSrc(name)}}/>
										<Body>
										<Text>{name}</Text>
										<Text note>{cards.length} cards</Text>
										</Body>
									</Left>
									<Right>
										<Button transparent onPress={() => this.dispatchNavigation(DECK_DETAIL_VIEW, {deckName: name})}>
											<Text>Details</Text>
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
	navigation: PropTypes.shape().isRequired,
	decks: PropTypes.array,
	fetchData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	decks: state.decks
});

const mapDispatchToProps = dispatch => ({
	fetchData: data => dispatch(fetchDecks(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);
