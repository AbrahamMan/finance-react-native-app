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
		value: 4.5,
		date: '2018-01-11',
	},
	{
		id: 2,
		description: 'Nasi Putih + Ayam + Teh Ais',
		value: 7.5,
		date: '2018-01-12',
	}
];

class Wallets extends Component {

	static navigationOptions = {
	    tabBarLabel: "Wallets",
	    swipeEnabled: false,
	    tabBarIcon: () => <Icon size={24} name="account-balance-wallet" color="white" />
	}

	_onPressItem = (id: string) => {
		const { navigate } = this.props.navigation;

		// open other pages to edit transactions
		console.log('_onPressItem', navigate);
		navigate('Edits', { Item: id } );
	};

	_renderItem = ({item}) => (
		<Single
			onPressItem={this._onPressItem}
			item={item}

		/>
	);

	render() {
		const { navigate } = this.props.navigation;
		console.log(WALLETS);
		return (
			<View>
				<Header headerText="Wallet" buttonText="Create"/>
				<FlatList
				  data={WALLETS}
				  renderItem={this._renderItem}
				/>
			</View>
		);
	}
}

export default Wallets;
