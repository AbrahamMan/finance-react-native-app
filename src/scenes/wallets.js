import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, FlatList } from 'react-native';
import { Input } from '../components/forms';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HeaderTop } from '../components/layouts';
import Single from '../components/wallets/single';
import tranActions from '../actions/tranActions';
import { Container, Spinner, Content } from 'native-base';
import { filterTotalByMonth, filterTotalByDate, filterTransactionByDate } from '../selector/walletSelector';


class Wallets extends Component {

	static navigationOptions = {
	    tabBarLabel: "Wallets",
	    swipeEnabled: false,
	    tabBarIcon: () => <Icon size={24} name="account-balance-wallet" color="#3389EE" />
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
		const { wallet, actions, totalByMonth, totalByDate } = this.props;
		console.log('wallet', wallet);
		return (
			<View>
				<HeaderTop 
					title="Wallets"
					navigate={navigate}
				/>
				<View>
					<Text>
						Total This Month: { totalByMonth }
					</Text>	
				</View>
				<View>
					<Text>
						Total Today: { totalByDate }
					</Text>	
				</View>
				<FlatList
				  data={wallet}
				  renderItem={this._renderItem}
				  keyExtractor={item => item.id}
				/>
			</View>
		);
	}
}

//export default Wallets;

const mapStateToProps = ({ walletReducer }) => ({
	wallet: filterTransactionByDate(walletReducer),
	totalByMonth: filterTotalByMonth(walletReducer),
	totalByDate: filterTotalByDate(walletReducer),
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(tranActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallets);
