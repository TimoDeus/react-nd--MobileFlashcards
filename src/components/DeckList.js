import React, {Component} from 'react';
import {Container, Header, Body, Content, Text, Button, Left, Right, Icon, Title} from 'native-base';
import {ADD_DECK_VIEW} from '../navigation/MainNavigator';

export default class DeckList extends Component {

	render() {
		return (
			<Container>
				<Header>
					<Left>
						<Button transparent>
							<Icon name="menu"/>
						</Button>
					</Left>
					<Body>
					<Title>Mobile Flashcards</Title>
					</Body>
					<Right/>
				</Header>
				<Content>
					<Text>DeckList</Text>
					<Button full rounded dark
									style={{ marginTop: 10 }}
									onPress={() => this.props.navigation.navigate(ADD_DECK_VIEW)}>
						<Text>Chat With People</Text>
					</Button>
				</Content>
			</Container>
		);
	}
}
