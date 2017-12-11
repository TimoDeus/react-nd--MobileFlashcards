import React, {Component} from 'react';
import {Body, Button, Container, Content, Form, Input, Item, Label, Text} from 'native-base';
import DefaultHeader from './header/DefaultHeader';
import PropTypes from 'prop-types';
import BackButton from './header/BackButton';
import {addCardToDeck} from '../actions/index';
import {connect} from 'react-redux';
import {storeNewCard} from '../utils/api';

class AddCard extends Component {

	constructor() {
		super();
		this.state = {question: '', answer: ''}
	}

	submit = () => {
		const {navigation} = this.props;
		const deckName = navigation.state.params.deckName;
		const card = {question: this.state.question, answer: this.state.answer};
		storeNewCard(deckName, card).then(
			() => {
				this.props.addCard(deckName, card);
				this.props.navigation.goBack();
			});
	};

	render() {
		const {navigation} = this.props;
		return (
			<Container>
				<DefaultHeader title='Add new card' left={<BackButton navigation={navigation}/>}/>
				<Content>
					<Body>
					<Text>Please enter question and answer of your new card.</Text>
					</Body>
					<Form>
						<Item fixedLabel>
							<Label>Question</Label>
							<Input autoFocus={true} onChangeText={question => this.setState({question})}/>
						</Item>
						<Item fixedLabel>
							<Label>Answer</Label>
							<Input onChangeText={answer => this.setState({answer})}/>
						</Item>
					</Form>
					<Body>
					<Button onPress={this.submit}><Text>Add card</Text></Button>
					</Body>
				</Content>
			</Container>
		);
	}
}

AddCard.propTypes = {
	navigation: PropTypes.shape().isRequired,
	addCard: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
	addCard: (deckName, card) => dispatch(addCardToDeck(deckName, card))
});

export default connect(null, mapDispatchToProps)(AddCard);
