import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Input } from '../components/forms';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Header } from '../components/layouts';

class Wallets extends Component {

	static navigationOptions = {
	    tabBarLabel: "Wallets",
	    tabBarIcon: () => <Icon size={24} name="account-balance-wallet" color="white" />
	}

	render() {
		const { navigate } = this.props.navigation;
		return (
			<View>
				<Header headerText="Wallet" />
				<Text> Wallet </Text>
			</View>
		);
	}
}

export default Wallets;
