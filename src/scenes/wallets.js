import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Input } from '../components/forms';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HeaderTop } from '../components/layouts';
import Single from '../components/wallets/single';
import transactionsActions from '../actions/transactionsActions';
import walletActions from '../actions/walletActions';
import { Container, Spinner, Content, Fab } from 'native-base';
import { filterTotalByWeek, filterTotalByDate, filterYesterdayTransaction, filterTodayTransaction } from '../selector/walletSelector';
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

		moment.updateLocale('en', {
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

		const { transactionsActions, walletActions, walletsGroupByDates, wallet } = this.props;

		// @ need to store id in redux 
		walletActions.requestWalletList({ id : wallet.selectedWalletId });
		transactionsActions.requestTransList({ id : wallet.selectedWalletId });

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
		const { yesterdayWallet, todayWallet, totalByWeek, walletsGroupByDates, wallet, walletActions, navigation } = this.props;
		const { walletContainer, totalMonth, walletBalance, spendingMonth, walletBackground, dateContainer, totalStyle, dateStyle } = styles;
		console.log('walletsGroupByDates', walletsGroupByDates);
		return (
			<View style={walletBackground}>
				<HeaderTop 
					walletName={wallet.name}
					navigate={navigate}
					wallet={wallet}
					walletActions={walletActions}
					navigation={navigation}
				/>
				{
					(wallet.balance !== null) ?
				
					<View style={walletContainer}>
						<View style={totalMonth}>
							<View style={walletBalance}>
								<Text>{ wallet.balance }</Text>
								<Text>Wallet balance</Text>
							</View>	
							<View style={spendingMonth}>
								<Text>{ totalByWeek } </Text>
								<Text>Weekly change </Text>
							</View>	
						</View>

						{

							walletsGroupByDates.arrayDates.length != 0 ?

							<View style={{ flex: 1 }}>
								<View style={dateContainer}>	
									<View style={dateStyle}>
										<Text>{moment(walletsGroupByDates.dates[this.state.activeIndex]).calendar()}</Text>
									</View>
									<View style={totalStyle}>
										<Text>{ walletsGroupByDates.totalByDates[this.state.activeIndex] }</Text>
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
							</View>

							:

							<Text>
								Start tracking your transactions for this week
							</Text>
						}
						<Fab
							containerStyle={{ left: '44%' }}
							active={this.state.active}
							style={{ backgroundColor: '#3bb84a',  }}
							onPress={() => navigate('Add')}
							position="bottomLeft"
						>
							<Icon name="add" />
						</Fab>	
					</View>

					:

					<View style={walletContainer}>
						<Text>
							No transaction found
						</Text>	
						<Fab
							containerStyle={{ left: '44%' }}
							active={this.state.active}
							style={{ backgroundColor: '#3bb84a',  }}
							onPress={() => navigate('Add')}
							position="bottomLeft"
						>
							<Icon name="add" />
						</Fab>	
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
		flex: 1,
		padding: 7,
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

const mapStateToProps = ({ TransactionsReducer, WalletReducer }) => ({
	wallet: WalletReducer,
	yesterdayWallet: filterYesterdayTransaction(TransactionsReducer),
	todayWallet: filterTodayTransaction(TransactionsReducer),
	totalByWeek: filterTotalByWeek(TransactionsReducer),
	walletsGroupByDates: filterTotalByDate(TransactionsReducer),
});

const mapDispatchToProps = dispatch => ({
	walletActions: bindActionCreators(walletActions, dispatch),
	transactionsActions: bindActionCreators(transactionsActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallets);