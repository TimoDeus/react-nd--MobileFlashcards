import React from 'react';
import {AppLoading} from 'expo';
import MainNavigator from './src/navigation/MainNavigator';
import {initSampleDataIfRequired, loadFonts} from './src/utils/helper';
import {Root} from 'native-base';
import reducer from './src/reducers/index';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

export default class App extends React.Component {

	constructor() {
		super();
		this.state = {
			isReady: false
		};
	}

	/**
	 * Note: componentWillMount has to be used here instead of componentDidMount!
	 * NativeBase required fonts to be loaded before rendering, otherwise it throws an exception.
	 */
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
		return isReady ? (
			<Provider store={createStore(reducer)}>
				<Root>
					<MainNavigator/>
				</Root>
			</Provider>
		): <AppLoading/>;
	}
}
