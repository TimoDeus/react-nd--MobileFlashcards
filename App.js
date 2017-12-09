import React from 'react';
import {AppLoading} from 'expo';
import MainNavigator from './src/navigation/MainNavigator';
import {loadFonts} from './src/utils/helper';

export default class App extends React.Component {

	constructor() {
		super();
		this.state = {
			isReady: false
		};
	}

	componentWillMount() {
		loadFonts().then(
			() => this.setState({isReady: true})
		);
	}

	render() {
		const {isReady} = this.state;
		return isReady ? <MainNavigator/> : <AppLoading/>;
	}
}
