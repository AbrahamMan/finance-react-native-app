import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import Router from './router';
import { Sentry } from 'react-native-sentry';

class App extends Component{

	componentWillMount() {
		Sentry.config('https://6a694a5571c64be9be904d68f902e4e9:d573ee8624cb47bcaeeebbd40e42e54f@sentry.io/276526').install();
	}
	render(){
		return(
			<Provider store={store}>
				<Router />
			</Provider>
		);
	}
}

export default App;