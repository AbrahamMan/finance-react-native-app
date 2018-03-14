import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Left, Button, Body, Right, Title, Content, Text, Form, Item, Input, Label } from 'native-base';

class AddCategory extends Component{

	// static navigationOptions = {
	//     title: 'Add wallet',
	// };

	constructor(props) {
		super(props);
		this.state = {
			balance: '0',
			name: 'Cash',
		};
		this.createWallet = this.createWallet.bind(this);
	}

	createWallet() {
		const { balance, name } = this.state;
		//const { authActionsCreator, navigation } = this.props;

		const payload = {
			balance,
			name,
		};

		console.log('payload', payload);

	// 	const resetAction = NavigationActions.reset({
	// 		index: 0,
	// 		actions: [
	// 			NavigationActions.navigate({
	// 				routeName: 'AddCategory',
	// 			}),
	// 		],
	// 	});

	// 	authActionsCreator.createNewUser({ payload }, () => {
	// 		navigation.dispatch(resetAction);
	// 	}, () => {
	// 		if (Platform.OS === 'Android') {
	// 			ToastAndroid.show('Email already exist!', ToastAndroid.SHORT);
	// 		} else {
	// 			this.refs.toast.show('Email already exist!');
	// 		}
	// 	});
	}

	render(){
		return(
			<Container style={{ backgroundColor: '#F6F7F9' }}>
				<Content padder>
					<Text style={{ alignSelf: 'center', fontSize: 24 }}>
						Create your first wallet
					</Text>
					<Text style={{ textAlign: 'center', fontSize: 12, color: '#9E9E9E', paddingVertical: 16 }}>
						Wallex help you to keep track of spending from wallets. Each wallet represents for a source of money such as Cash, Saving and Bank Account.
					</Text>
					<Item
						floatingLabel
					>
						<Label>Name</Label>
						<Input
							onChangeText={ (name) => this.setState({ name })}
							value={this.state.name}

						/>
					</Item>
					<Text style={{ alignSelf: 'center', fontSize: 24 }}>
						Balance
					</Text>
					<Text style={{ textAlign: 'center', fontSize: 12, color: '#9E9E9E', paddingVertical: 16 }}>
						How much do you have in wallet {this.state.name}
					</Text>
					<Item
						floatingLabel
					>
						<Label>Balance</Label>
						<Input
							onChangeText={ (balance) => this.setState({ balance })}
							value={this.state.balance}

						/>
					</Item>
					<Button full rounded success
						onPress={this.createWallet}
						style={{
							margin: 20,
							backgroundColor: '#3389EE',
						}}
					>
						<Text>Done</Text>
					</Button>
				</Content>
			</Container>
		)
	}
}

export default AddCategory;
