import React from 'react';
import {Container, Header, Content, Text, Button, Icon} from 'native-base';
import DefaultHeader from './DefaultHeader';

const AddDeck = props => {
	const {navigation} = props;
	const headerLeft = (
		<Button transparent onPress={() => navigation.goBack()}>
			<Icon name="arrow-back"/>
		</Button>
	);
	return (
		<Container>
			<DefaultHeader title='Add Deck' left={headerLeft}/>
			<Content>
				<Text>AddDeck</Text>
			</Content>
		</Container>
	);
};

export default AddDeck;
