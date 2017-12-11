import React, {Component} from 'react';
import {Button, Container, Content, Form, Input, Item, Label, Text} from 'native-base';
import DefaultHeader from './header/DefaultHeader';
import PropTypes from 'prop-types';
import BackButton from './header/BackButton';
import {connect} from 'react-redux';
import {addDeck} from '../actions/index';
import {NavigationActions} from 'react-navigation';
import {DECK_LIST_VIEW, DECK_DETAIL_VIEW} from '../navigation/MainNavigator';
import {storeNewDeck} from '../utils/api';

class AddDeck extends Component {

	constructor() {
		super();
		this.state = {name: ''}
	}

	submit = () => {
		const {navigation, addNewDeck} = this.props;
		const {name} = this.state;
		storeNewDeck(name).then(
			() => {
				addNewDeck(name);
				const resetAction = NavigationActions.reset({
					index: 1,
					actions: [
						NavigationActions.navigate({routeName: DECK_LIST_VIEW}),
						NavigationActions.navigate({routeName: DECK_DETAIL_VIEW, params: {deckName: name}})
					]
				});
				navigation.dispatch(resetAction);
			}
		);
	};

	render() {
		const {navigation} = this.props;
		return (
			<Container>
				<DefaultHeader title='Add new deck' left={<BackButton navigation={navigation}/>}/>
				<Content>
					<Text>Please enter the name of your new deck.</Text>
					<Form>
						<Item fixedLabel>
							<Label>Deck name</Label>
							<Input autoFocus={true} onChangeText={name => this.setState({name})}/>
						</Item>
					</Form>
					<Button onPress={this.submit}><Text>Add deck</Text></Button>
				</Content>
			</Container>
		);
	}
}

AddDeck.propTypes = {
	navigation: PropTypes.shape().isRequired,
	addNewDeck: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
	addNewDeck: data => dispatch(addDeck(data))
});

export default connect(null, mapDispatchToProps)(AddDeck);
