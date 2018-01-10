import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Input } from '../components/forms';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Header } from '../components/layouts';

class Wallets extends Component {

	static navigationOptions = {
	    tabBarLabel: "Wallets",
	    swipeEnabled: false,
	    tabBarIcon: () => <Icon size={24} name="account-balance-wallet" color="white" />
	}

	render() {
		const { navigate } = this.props.navigation;
		return (
			<View>
				<Header headerText="Wallet" />
				<FlatList
				  data={[{key: 'a'}, {key: 'b'}]}
				  renderItem={({item}) => <Text>{item.key}</Text>}
				/>
			</View>
		);
	}
}

export default Wallets;
