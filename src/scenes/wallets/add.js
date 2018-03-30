import React, { Component } from 'react';
import { View, ToastAndroid, Platform } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Toast from 'react-native-easy-toast';
import { NavigationActions } from 'react-navigation';
import { Container, Header, Left, Button, Body, Right, Title, Content, Text, Form, Item, Input, Label, Fab, Icon } from 'native-base';
import walletActions from '../../actions/walletActions';

class AddWallet extends Component{

	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;
		return{
		    title: 'Add wallet',
		    headerRight: <Button title="Save" onPress={() => params.handleSave()} />
        };
	};

	constructor(props) {
		super(props);
		this.state = {
			balance: '0',
			name: 'Cash',
		};
		this.createWallet = this.createWallet.bind(this);
	}

	createWallet = () => {
		const { balance, name } = this.state;
		const { walletActionsCreator, navigation } = this.props;

		const payload = {
			balance,
			name,
		};

		console.log('payload', payload);

		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({
					routeName: 'Tabs',
				}),
			],
		});

		walletActionsCreator.createWallet({ payload }, () => {
			navigation.dispatch(resetAction);
		}, () => {
			if (Platform.OS === 'Android') {
				ToastAndroid.show('Failed to create wallet', ToastAndroid.SHORT);
			} else {
				this.refs.toast.show('Failed to create wallet');
			}
		});
	}

	componentDidMount() {
      this.props.navigation.setParams({ handleSave: this.createWallet });
    }

	

	render(){
		return(
			<Container style={{ backgroundColor: '#F6F7F9' }}>
				<Content padder>
					<Item
						floatingLabel
					>
						<Label>Name</Label>
						<Input
							onChangeText={ (name) => this.setState({ name })}
							value={this.state.name}

						/>
					</Item>
					<Item
						floatingLabel
					>
						<Label>Balance</Label>
						<Input
							onChangeText={ (balance) => this.setState({ balance })}
							value={this.state.balance}

						/>
					</Item>
				</Content>
				<Fab
						active={this.state.active}
						style={{ backgroundColor: '#3bb84a',  }}
						onPress={this.createWallet}
					>
						<Icon name="check" />
					</Fab>	
				<Toast ref="toast"/>
			</Container>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	walletActionsCreator: bindActionCreators(walletActions, dispatch),
});

export default connect(null, mapDispatchToProps)(AddWallet);
