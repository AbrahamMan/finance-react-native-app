import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, FlatList } from 'react-native';
import { Input } from '../components/forms';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HeaderTop } from '../components/layouts';
import Single from '../components/wallets/single';
import tranActions from '../actions/tranActions';

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
	},
	{
		id: 3,
		description: 'Nasi Putih + Ayam + Teh Ais',
		value: 10.5,
		date: '2018-01-15',
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
		navigate('Edits', { Item: id } );
	};

	_renderItem = ({item}) => (
		<Single
			onPressItem={this._onPressItem}
			item={item}

		/>
	);

	componentWillMount() {
		const { actions } = this.props;

		actions.requestTransList();
	}

	render() {
		const { navigate } = this.props.navigation;
		const { trans, actions } = this.props;
		return (
			<View>
				<HeaderTop 
					title="Wallets"
					navigate={navigate}
				/>
				<FlatList
				  data={trans}
				  renderItem={this._renderItem}
				/>
			</View>
		);
	}
}

//export default Wallets;

const mapStateToProps = (state) => {
	console.log(state);
	const { trans } = state.wallet;
	return { trans };
};

// const mapStateToProps = state => {
// 	const employees = _.map(state.employees, (val, uid) => {
// 		return { ...val, uid};
// 	});

// 	return { employees };
// };

// const mapStateToProps = (state) => {
// 	console.log(state);
// 	//const { name, phone, shift } = state.walletReducer;
// 	return state;
// };

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(tranActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallets);
