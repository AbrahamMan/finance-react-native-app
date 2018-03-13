import React, { Component } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import transactionsActions from '../../actions/transactionsActions';
import categoryActions from '../../actions/categoryActions';
import { NavigationActions } from 'react-navigation';
import moment from 'moment';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, List, ListItem, Card, CardItem, Text, Item, Input, Label  } from 'native-base';

class Add extends Component {
	constructor(props) {
		super(props);
		this.state = { amount: '', description: '', date: moment().format('YYYY-MM-DD'), type: 'debit', wallet_id: '1' };
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

	save = () => {
		const { transactionsActions, navigation } = this.props;

		const { selectedWalletId } = this.props.WalletReducer;

		this.setState({ wallet_id: selectedWalletId.toString() });

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
		console.log('CategoryReducer', this.props.CategoryReducer);
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
		              	style={{height: 70, fontSize: 30 }}
		              	onChangeText={(amount) => this.setState({amount})}
		              	placeholder="0"
		              />
		            </Item>
		            <TouchableOpacity
		            	onPress={()=>{this.chooseCategory({categories})}}
		            >
				        <View style={{ flexDirection: 'row', paddingVertical: 10, }}>
				            <Icon active name='ios-briefcase-outline' style={{fontSize: 30, flex: 1, alignSelf: 'center' }} />
				            <Text style={{ flex: 9, alignSelf: 'center' }}>{wallets.name}</Text>
				        </View>
			        </TouchableOpacity>
				    <Item>
			            <Icon active name='ios-help-circle-outline' style={{fontSize: 30}} />
			            <Input placeholder='Category' onChangeText={(category) => this.setState({category})}/>
			        </Item>
			        <Item>
			            <Icon active name='ios-help-circle-outline' style={{fontSize: 30}} />
			            <Input placeholder='Type' onChangeText={(type) => this.setState({type})} value={this.state.type}/>
			        </Item>
				    <Item>
			            <Icon active name='ios-document-outline' style={{fontSize: 35}} />
			            <Input placeholder='Note' onChangeText={(description) => this.setState({description})}/>
			        </Item>
				    <Item>
			            <Icon active name='ios-calendar-outline' style={{fontSize: 30}} />
			            <Input placeholder='Today' onChangeText={(date) => this.setState({date})} value={this.state.date}/>
			        </Item>
			        <TouchableOpacity
		            	onPress={()=>{this.chooseWallet({wallets: wallets.list})}}
		            >
				        <View style={{ flexDirection: 'row', paddingVertical: 10, }}>
				            <Icon active name='ios-briefcase-outline' style={{fontSize: 30, flex: 1, alignSelf: 'center' }} />
				            <Text style={{ flex: 9, alignSelf: 'center' }}>{wallets.name}</Text>
				        </View>
			        </TouchableOpacity>
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

export default connect(mapStateToProps,mapDispatchToProps)(Add);