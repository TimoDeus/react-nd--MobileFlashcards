import React from 'react';
import {AppLoading} from 'expo';
import MainNavigator from './src/navigation/MainNavigator';
import {initSampleDataIfRequired, loadFonts} from './src/utils/helper';
import {Root} from 'native-base';

export default class App extends React.Component {

	constructor() {
		super();
		this.state = {
			isReady: false
		};
	}

	componentWillMount() {
		Promise.all([
			loadFonts(),
			initSampleDataIfRequired()
		]).then(
			() => this.setState({isReady: true})
		);
	}

	render() {
		const {isReady} = this.state;
		return isReady ? <Root><MainNavigator/></Root> : <AppLoading/>;
	}
}
