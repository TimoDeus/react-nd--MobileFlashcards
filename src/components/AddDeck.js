import React from 'react';
import {Container, Content, Text} from 'native-base';
import DefaultHeader from './header/DefaultHeader';
import PropTypes from 'prop-types';
import BackButton from './header/BackButton';

const AddDeck = props => {
	const {navigation} = props;
	return (
		<Container>
			<DefaultHeader title='Add Deck' left={<BackButton navigation={navigation}/>}/>
			<Content>
				<Text>AddDeck</Text>
			</Content>
		</Container>
	);
};

AddDeck.propTypes = {
	navigation: PropTypes.shape().isRequired
};

export default AddDeck;
