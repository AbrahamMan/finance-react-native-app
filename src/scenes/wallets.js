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
  },
  paginationStyle: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  paginationText: {
    color: 'white',
    fontSize: 20
  },

})

const renderPagination = (index, total, context) => {
  return (
    <View style={styles.paginationStyle}>
      <Text style={{ color: 'grey' }}>
        <Text style={styles.paginationText}>{index + 1}</Text>/{total}
      </Text>
    </View>
  )
}

class Wallets extends Component {

	static navigationOptions = {
	    tabBarLabel: "Wallets",
	    swipeEnabled: false,
	    tabBarIcon: () => <Icon size={24} name="account-balance-wallet" color="#3389EE" />
	}

	constructor(props) {
		super(props);
		//this.renderHeader = this.renderHeader.bind(this);
		this.changeDateSelection = this.changeDateSelection.bind(this);
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
		const { actions, walletsGroupByDates } = this.props;

		const { arrayDates, dates } = walletsGroupByDates;

		actions.requestTransList();

		this.setState({ activeIndex: arrayDates.length - 1 });
	}

	changeDateSelection(index){
		this.setState({ activeIndex: index });
	}

	render() {
		const { navigate } = this.props.navigation;
		const { yesterdayWallet, todayWallet, totalByMonth, walletsGroupByDates } = this.props;
		const { arrayDates, totalByDates, dates } = walletsGroupByDates;
		const { walletContainer, totalMonth, walletBalance, spendingMonth, walletBackground, dateContainer, totalStyle, dateStyle } = styles;
		return (
			<View style={walletBackground}>
				<HeaderTop 
					title="Wallets"
					navigate={navigate}
				/>
				<View style={walletContainer}>
					<View style={totalMonth}>
						<View style={walletBalance}>
							<Text>{ totalByMonth }</Text>
							<Text>Wallet balance</Text>
						</View>	
						<View style={spendingMonth}>
							<Text>{ totalByMonth } </Text>
							<Text>Month change </Text>
						</View>	
					</View>
					<View style={dateContainer}>	
						<View style={dateStyle}>
							<Text>{ dates[this.state.activeIndex]}</Text>
						</View>
						<View style={totalStyle}>
							<Text>{ totalByDates[this.state.activeIndex] }</Text>
						</View>	
					</View>
					<Swiper 
						style={styles.wrapper} 
						showsButtons={false}
						loop={false}
						onIndexChanged={this.changeDateSelection}
						index={arrayDates.length-1}
					>
						{
							arrayDates.map(wallet =>{
								return (
									<FlatList
										// ListHeaderComponent={this.renderHeader}
										style={{ flex: 6 }}
									  	data={wallet}
									  	renderItem={this._renderItem}
									  	keyExtractor={wallet => wallet.id}
									/>
								)
							})
						}

					</Swiper>
				</View>
			</View>
		);
	}
}

styles = {
	walletBackground: {
		flex: 1,
	},
	walletContainer: {
		padding: 10,
		flex: 1,
	},
	totalMonth : {
		padding: 10,
		backgroundColor: 'white',
		flexDirection: 'row',
	},
	walletBalance: {
		flex: 1,
		alignItems: 'center',
	},
	spendingMonth: {
		flex: 1,
		alignItems: 'center',
	},
	dateStyle: {
		flex: 1,
		alignItems: 'flex-start',
	},
	totalStyle: {
		flex: 1,
		alignItems: 'flex-end',
	},
	dateContainer: {
		marginTop: 10,
		paddingVertical: 10,
		paddingHorizontal: 20,
		backgroundColor: 'white',
		flexDirection: 'row',
	}

}

//export default Wallets;

const mapStateToProps = ({ walletReducer }) => ({
	yesterdayWallet: filterYesterdayTransaction(walletReducer),
	todayWallet: filterTodayTransaction(walletReducer),
	totalByMonth: filterTotalByMonth(walletReducer),
	walletsGroupByDates: filterTotalByDate(walletReducer),
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(tranActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallets);
