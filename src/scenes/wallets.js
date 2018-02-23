import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Input } from '../components/forms';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HeaderTop } from '../components/layouts';
import Single from '../components/wallets/single';
import tranActions from '../actions/tranActions';
import { Container, Spinner, Content } from 'native-base';
import { filterTotalByMonth, filterTotalByDate, filterYesterdayTransaction, filterTodayTransaction } from '../selector/walletSelector';
import Swiper from 'react-native-swiper';

const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})

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
		const { yesterdayWallet, todayWallet, totalByMonth, totalByDate } = this.props;
		return (
			<View style={{ flex: 1 }}>
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
				<Swiper style={styles.wrapper} showsButtons={false}>
					<FlatList
						style={{ flex: 6 }}
					  	data={yesterdayWallet}
					  	renderItem={this._renderItem}
					  	keyExtractor={item => item.id}
					/>
					<FlatList
						style={{ flex: 6 }}
					  	data={todayWallet}
					  	renderItem={this._renderItem}
					  	keyExtractor={item => item.id}
					/>
				</Swiper>
				
			</View>
		);
	}
}

//export default Wallets;

const mapStateToProps = ({ walletReducer }) => ({
	yesterdayWallet: filterYesterdayTransaction(walletReducer),
	todayWallet: filterTodayTransaction(walletReducer),
	totalByMonth: filterTotalByMonth(walletReducer),
	totalByDate: filterTotalByDate(walletReducer),
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(tranActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallets);
