import React, { Component } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import transactionsActions from '../../actions/transactionsActions';
import categoryActions from '../../actions/categoryActions';
import { NavigationActions } from 'react-navigation';
import moment from 'moment';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, List, ListItem, Card, CardItem, Text, Item, Input, Label, Thumbnail  } from 'native-base';

class Add extends Component {
	constructor(props) {
		super(props);
		this.state = { amount: '', description: '', date: moment().format('YYYY-MM-DD'), type: '', wallet_id: '1', category_id: '', wallet_id_transfer: '' };
	}

	componentWillMount() {
		const { selectedWalletId } = this.props.WalletReducer;
		const { categoryActions } = this.props;

		categoryActions.requestCategoriesList();

		this.setState({ wallet_id: selectedWalletId.toString() });
	}

	chooseWallet = (wallets) => {
		const { navigate } = this.props.navigation;

		navigate('WalletList', { wallets });
	}

	chooseCategory = (categories) => {
		const { navigate } = this.props.navigation;

		console.log('navigate', navigate);

		navigate('CategoryList', { categories });
	}

	chooseWalletTransfer = (wallets) => {
		const { navigate } = this.props.navigation;

		navigate('WalletTransfer', { wallets });
	}

	save = () => {
		const { transactionsActions, navigation } = this.props;

		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({
					routeName: 'Tabs',
				}),
			],
		});

		transactionsActions.storeTransaction({ state: this.state, navigation, resetAction });
	}

	render() {
		const { container, button } = styles;
		const { WalletReducer: wallets } = this.props;
		const { categories, selectedCategory } = this.props.CategoryReducer;
		console.log('selectedCategory', selectedCategory);
		console.log('wallets', wallets);
		return (
			<Container>

				<Header style={{ backgroundColor: '#3bb84a' }}>
					<Left>
						<TouchableOpacity
							onPress={()=>this.props.navigation.goBack(null)}
						>
							<Icon 
								name='md-close'
								style={{
			          				color: 'white' 
			          			}}
							/>
						</TouchableOpacity>
					</Left>
					<Body>
						<Title
							style={{ 
		            			alignSelf: 'center',
		            			color: 'white' 
		            		}}
						>
							Add Transaction
						</Title>
					</Body>
					<Right>
						<TouchableOpacity
							onPress={this.save}
						>
							<Text
								style={{ color: 'white' }}
							>
								Save
							</Text>
						</TouchableOpacity>
					</Right>
				</Header>

				<Content padder>
					<Item inlineLabel>
						<Label>RM</Label>
						<Input
							style={{ height: 70, fontSize: 30 }}
							onChangeText={ (amount) => this.setState({ amount })}
							placeholder="0"
							keyboardType="numeric"
						/>
					</Item>
					<ListItem onPress={()=>this.chooseCategory({ categories })} avatar style={{ paddingVertical: 5 }}>
						<Left>
							<Thumbnail source={{ uri: selectedCategory.url }} style={{ width: 40, height: 40 }}/>
						</Left>
						<Body>
							<Text>{selectedCategory.name}</Text>
						</Body>
						<Right />
					</ListItem>
					<Item>
						<Icon active name='ios-document-outline' style={{fontSize: 35}} />
						<Input placeholder='Note' onChangeText={(description) => this.setState({description})}/>
					</Item>
					<Item>
						<Icon active name='ios-calendar-outline' style={{fontSize: 30}} />
						<Input placeholder='Today' onChangeText={(date) => this.setState({date})} value={this.state.date}/>
					</Item>
					<TouchableOpacity
						onPress={() => { this.chooseWallet({ wallets: wallets.list })}}
					>
						<View style={{ flexDirection: 'row', paddingVertical: 10, }}>
							<Icon active name='ios-briefcase-outline' style={{fontSize: 30, flex: 1, alignSelf: 'center' }} />
							<Text style={{ flex: 9, alignSelf: 'center' }}>{wallets.name}</Text>
						</View>
					</TouchableOpacity>
					{	selectedCategory.type == 'transfer' &&
						<TouchableOpacity
							onPress={() => { this.chooseWalletTransfer({ wallets: wallets })}}
						>
							<View style={{ flexDirection: 'row', paddingVertical: 10, }}>
								<Icon active name='ios-briefcase-outline' style={{fontSize: 30, flex: 1, alignSelf: 'center' }} />
								<Text style={{ flex: 9, alignSelf: 'center' }}>{wallets.selectedWalletTransfer.name}</Text>
							</View>
						</TouchableOpacity>
					}
				</Content>
		    </Container>
		);
	}
}

const styles = {
	container: {
		padding: 16,
		flex: 1,
		backgroundColor: '#ffffff',
	},
	button: {
		marginTop: 10,
	}
}

const mapStateToProps = ({ WalletReducer, CategoryReducer }) => ({
	WalletReducer,
	CategoryReducer,
});

const mapDispatchToProps = dispatch => ({
	transactionsActions: bindActionCreators(transactionsActions, dispatch),
	categoryActions: bindActionCreators(categoryActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Add);
