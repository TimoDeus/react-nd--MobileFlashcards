import React from 'react';
import {Button, Icon} from 'native-base';
import PropTypes from 'prop-types';

const BackButton = props => {
	const {navigation} = props;
	return (
		<Button transparent onPress={() => navigation.goBack()}>
			<Icon name="arrow-back"/>
		</Button>
	);
};

BackButton.propTypes = {
	navigation: PropTypes.shape().isRequired
};

export default BackButton;
