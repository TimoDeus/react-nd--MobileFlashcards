import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {Constants} from 'expo';
import {Body, Header, Left, Right, Title} from 'native-base';
import PropTypes from 'prop-types';

const DefaultHeader = props => {
	return (
		<Header style={styles.header}>
			<Left>{props.left}</Left>
			<Body style={styles.body}>
			<Title>{props.title}</Title>
			</Body>
			<Right>{props.right}</Right>
		</Header>
	);
};

const styles = StyleSheet.create({
	header: {
		marginTop: Platform.OS === 'ios' ? undefined : Constants.statusBarHeight
	},
	body: {
		flex: 3
	}
});

DefaultHeader.propTypes = {
	left: PropTypes.shape(),
	right: PropTypes.shape(),
	title: PropTypes.string,
};

export default DefaultHeader;
