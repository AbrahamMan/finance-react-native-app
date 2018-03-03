import React, { Component } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import transactionsActions from '../../actions/transactionsActions';
import { NavigationActions } from 'react-navigation';
import moment from 'moment';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, List, ListItem, Card, CardItem, Text, Item, Input, Label  } from 'native-base';

class Add extends Component {
	constructor(props) {
	    super(props);
	    this.state = { amount: '', description: '', date: moment().format('YYYY-MM-DD'), type: 'debit', wallet_id: '1' };
	}

	save = () =>{
	 	console.log('save');
	 	const { transactionsActions, navigation } = this.props;

	 	const resetAction = NavigationActions.reset({
	        index: 0,
	        actions: [
	          NavigationActions.navigate({
	            routeName: "Tabs"
	          })
	        ]
	      });

	 	transactionsActions.storeTransaction({ state: this.state , navigation, resetAction});
	 	
	}

	render() {
		const { container, button } = styles;
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
			        <Item>
			            <Icon active name='ios-briefcase-outline' style={{fontSize: 30}} />
			            <Input placeholder='Wallet Id' onChangeText={(wallet_id) => this.setState({wallet_id})} value={this.state.wallet_id}/>
			        </Item>
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

const mapStateToProps = (state) => {
	console.log(state);
	return { state };
};

const mapDispatchToProps = dispatch => ({
	transactionsActions: bindActionCreators(transactionsActions, dispatch),
});

export default connect(mapStateToProps,mapDispatchToProps)(Add);