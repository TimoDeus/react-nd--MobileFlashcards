import React, {Component} from 'react';
import {Button, Container, Content, Form, Input, Item, Label, Text} from 'native-base';
import DefaultHeader from './header/DefaultHeader';
import PropTypes from 'prop-types';
import BackButton from './header/BackButton';

class AddDeck extends Component {

	constructor() {
		super();
		this.state = {name: ''}
	}

	submit = () => {
		const {navigation} = this.props;
		navigation.state.params.onSubmitHandler(this.state.name).then(
			() => navigation.goBack()
		);
	};

	render() {
		const {navigation} = this.props;
		return (
			<Container>
				<DefaultHeader title='Add deck' left={<BackButton navigation={navigation}/>}/>
				<Content>
					<Form>
						<Item floatingLabel>
							<Label>Deck name</Label>
							<Input onChangeText={name => this.setState({name})} />
						</Item>
					</Form>
					<Button onPress={this.submit}><Text>Add deck</Text></Button>
					<Text>{this.state.name}</Text>
				</Content>
			</Container>
		);
	}
}

AddDeck.propTypes = {
	navigation: PropTypes.shape().isRequired
};

export default AddDeck;
