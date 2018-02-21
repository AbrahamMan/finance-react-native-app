import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Input } from '../components/forms';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Header } from '../components/layouts';

class Login extends Component {

	static navigationOptions = {
	    tabBarLabel: "Wallet",
	    tabBarIcon: () => <Icon size={24} name="account-balance-wallet" color="#3389EE" />
	}

	render() {
		const { navigate } = this.props.navigation;
		return (
			<View>
				<Header headerText="Wallet" />
				<Input />

				<Button
			      onPress={() => navigate('Details')}
			      title="Go to details"
			    />
			</View>
		);
	}
}

export default Login;
