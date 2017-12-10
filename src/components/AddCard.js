import React, {Component} from 'react';
import {Body, Button, Container, Content, Form, Input, Item, Label, Text} from 'native-base';
import DefaultHeader from './header/DefaultHeader';
import PropTypes from 'prop-types';
import BackButton from './header/BackButton';
import {addCardToDeck} from '../actions/index';
import {connect} from 'react-redux';

class AddCard extends Component {

	constructor() {
		super();
		this.state = {question: '', answer: ''}
	}

	submit = () => {
		const card = {question: this.state.question, answer: this.state.answer};
		this.props.addCard(card);
		this.props.navigation.goBack();
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

const mapStateToProps = (state, ownProps) => ({
	deckName: ownProps.navigation.state.params.deckName
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	addCard: card => dispatch(addCardToDeck(ownProps.deckName, card))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);
