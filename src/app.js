import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import Router from './router';
import { Sentry } from 'react-native-sentry';
import configureStore from './store';
import { persistStore } from 'redux-persist';

const WHITELISTED_REDUCER = ['WalletReducer', 'AuthReducer'];


class App extends Component{

	state = {
		store: configureStore(),
		isHydrated: false, /* redux-persist */
	}

	componentWillMount() {
		const { store } = this.state;
		console.log('WHITELISTED_REDUCER',WHITELISTED_REDUCER);
		persistStore(store, { storage: AsyncStorage, whitelist: WHITELISTED_REDUCER }, () => {
			this.setState({ isHydrated: true });
		});

		Sentry.config('https://6a694a5571c64be9be904d68f902e4e9:d573ee8624cb47bcaeeebbd40e42e54f@sentry.io/276526').install();
	}
	render(){
		const { store, isHydrated } = this.state;

		if (!isHydrated) return null;

		return(
			<Provider store={store}>
				<Router />
			</Provider>
		);
	}
}

export default App;