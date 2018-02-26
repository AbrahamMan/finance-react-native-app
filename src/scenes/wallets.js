import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Input } from '../components/forms';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HeaderTop } from '../components/layouts';
import Single from '../components/wallets/single';
import tranActions from '../actions/tranActions';
import { Container, Spinner, Content, Fab } from 'native-base';
import { filterTotalByMonth, filterTotalByDate, filterYesterdayTransaction, filterTodayTransaction } from '../selector/walletSelector';
import Swiper from 'react-native-swiper';
import moment from 'moment';

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
	    tabBarIcon: () => <Icon size={24} name="account-balance-wallet" color="#616161" />
	}

	constructor(props) {
		super(props);
		//this.renderHeader = this.renderHeader.bind(this);
		this.changeDateSelection = this.changeDateSelection.bind(this);
		this.state = {
	      active: 'true'
	    };
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

		// moment().calendar(null,{
		//     lastDay : '[Yesterday]',
		//     sameDay : '[Today]',
		//     nextDay : '[Tomorrow]',
		//     lastWeek : '[last] dddd',
		//     nextWeek : 'dddd',
		//     sameElse : 'L'
		// })

		moment.locale('en', {
		    calendar: {
		        lastDay: function () {
		            return '[Yesterday]';
		        },
		        sameDay: function () {
		            return '[Today]';
		        },
		        lastWeek: function () {
		            return 'ddd, DD MMM YYYY';
		        },
		        nextDay: function () {
		            return '[Future], DD MMM YYYY';
		        },
		        nextWeek: function () {
		            return '[Future], DD MMM YYYY';
		        },
		        sameElse: function () {
		            return 'ddd, DD MMM YYYY';
		        }
		    }
		});

		const { actions, walletsGroupByDates } = this.props;

		actions.requestTransList();

		if(walletsGroupByDates)
		{
			console.log('activeIndex');
			this.setState({ activeIndex: walletsGroupByDates.arrayDates.length - 1 });
		}else{
			this.setState({ activeIndex: 0 });
		}
		
	}

	changeDateSelection(index){
		this.setState({ activeIndex: index });
	}

	render() {
		const { navigate } = this.props.navigation;
		const { yesterdayWallet, todayWallet, totalByMonth, walletsGroupByDates } = this.props;
		console.log('walletsGroupByDates', walletsGroupByDates);
		//const { arrayDates, totalByDates, dates } = walletsGroupByDates;
		const { walletContainer, totalMonth, walletBalance, spendingMonth, walletBackground, dateContainer, totalStyle, dateStyle } = styles;
		return (
			<View style={walletBackground}>
				<HeaderTop 
					title="Wallets"
					navigate={navigate}
				/>
				{
					walletsGroupByDates ?
				
					<View style={walletContainer}>
						<View style={totalMonth}>
							<View style={walletBalance}>
								<Text>{ totalByMonth.toFixed(2) }</Text>
								<Text>Wallet balance</Text>
							</View>	
							<View style={spendingMonth}>
								<Text>{ totalByMonth.toFixed(2) } </Text>
								<Text>Month change </Text>
							</View>	
						</View>
						<View style={dateContainer}>	
							<View style={dateStyle}>
								<Text>{moment(walletsGroupByDates.dates[this.state.activeIndex]).calendar()}</Text>
							</View>
							<View style={totalStyle}>
								<Text>{ walletsGroupByDates.totalByDates[this.state.activeIndex].toFixed(2) }</Text>
							</View>	
						</View>
						<Swiper 
							style={styles.wrapper} 
							showsButtons={false}
							loop={false}
							onIndexChanged={this.changeDateSelection}
							index={walletsGroupByDates.arrayDates.length-1}
						>
							{
								walletsGroupByDates.arrayDates.map(wallet =>{
									return (
										<FlatList
											// ListHeaderComponent={this.renderHeader}
											style={{ flex: 6 }}
										  	data={wallet}
										  	renderItem={this._renderItem}
										  	keyExtractor={item => item.id}
										/>
									)
								})
							}

						</Swiper>
						<Fab
							active={this.state.active}
							style={{ backgroundColor: '#3bb84a' }}
							onPress={() => navigate('Add')}
						>
							<Icon name="add" />
						</Fab>	
					</View>

					:

					<View>
						<Text>
							No transaction found
						</Text>	
					</View>
				}
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

const mapStateToProps = ({ WalletReducer }) => ({
	yesterdayWallet: filterYesterdayTransaction(WalletReducer),
	todayWallet: filterTodayTransaction(WalletReducer),
	totalByMonth: filterTotalByMonth(WalletReducer),
	walletsGroupByDates: filterTotalByDate(WalletReducer),
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(tranActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallets);
