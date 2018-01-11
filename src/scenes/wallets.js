import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Input } from '../components/forms';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Header } from '../components/layouts';
import Single from '../components/wallets/single';

export const WALLETS = [ 
	{
		id: 1,
		description: 'Nasi Lemak + Teh Ais + Telur Mata',
		value: 4.5
	},
	{
		id: 2,
		description: 'Nasi Putih + Ayam + Teh Ais',
		value: 7.5
	}
];

class Wallets extends Component {

	static navigationOptions = {
	    tabBarLabel: "Wallets",
	    swipeEnabled: false,
	    tabBarIcon: () => <Icon size={24} name="account-balance-wallet" color="white" />
	}

	_onPressItem = () => {
		// open other pages to edit transactions
		console.log('_onPressItem');
	};

	_renderItem = ({item}) => (
		<Single
			id={item.id}
			onPressItem={this._onPressItem}
			description={item.description}
		/>
	);

	render() {
		const { navigate } = this.props.navigation;
		return (
			<View>
				<Header headerText="Wallet" />
				<FlatList
				  data={WALLETS}
				  renderItem={this._renderItem}
				/>
			</View>
		);
	}
}

export default Wallets;
