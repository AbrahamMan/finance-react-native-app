import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, FlatList } from 'react-native';
import { Input } from '../components/forms';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HeaderTop } from '../components/layouts';
import Single from '../components/wallets/single';
import tranActions from '../actions/tranActions';
//import { Spinner } from '../components/animations';
import { Container, Spinner, Content } from 'native-base';


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
		const { wallet, actions } = this.props;
		return (
			<Container>
					<HeaderTop 
						title="Wallets"
						navigate={navigate}
					/>
				{
					wallet.isLoading ?

					<Content>
						<Spinner />
					</Content>	

					:

					<FlatList
					  data={wallet.trans}
					  renderItem={this._renderItem}
					/>
				}
				
			</Container>
		);
	}
}

//export default Wallets;

const mapStateToProps = ({ wallet }) => ({
	// console.log(wallet);
	// const { trans } = state.wallet;
	// return { trans };
	wallet,
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(tranActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallets);
