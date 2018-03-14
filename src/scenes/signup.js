import React, { Component } from 'react';
import { ToastAndroid, Platform, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { Container, Header, Left, Button, Body, Right, Title, Content, Text, Form, Item, Input } from 'native-base';
import Toast from 'react-native-easy-toast';
import authActions from '../actions/authActions';

class Signup extends Component {

	static navigationOptions = {
	    title: 'Create new account',
	};

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			name: '',
		};
		this.createAccount = this.createAccount.bind(this);
	}

	createAccount() {
		const { email, password, name } = this.state;
		const { authActionsCreator, navigation } = this.props;

		const payload = {
			email,
			password,
			name,
		};

		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({
					routeName: 'Vertical',
				}),
			],
		});

		authActionsCreator.createNewUser({ payload }, () => {
			navigation.dispatch(resetAction);
		}, () => {
			if (Platform.OS === 'Android') {
				ToastAndroid.show('Email already exist!', ToastAndroid.SHORT);
			} else {
				this.refs.toast.show('Email already exist!');
			}
		});
	}

	render() {
		const { navigate } = this.props.navigation;
		const { itemStyle, buttonStyle, headerStyle, signupStyle, signupTextStyle } = styles;
		return (
			<Container style={{ backgroundColor: '#F6F7F9' }}>
				<Content padder>
					<Form padder>
						<Item
							rounded
							style={{
								marginLeft: 10,
								margin: 10,
								paddingHorizontal: 10,
							}}
						>
							<Input
								onChangeText={ (name) => this.setState({ name })}
								placeholder="Name"
								value={this.state.name}

							/>
						</Item>
						<Item
							rounded
							style={{
								marginLeft: 10,
								margin: 10,
								paddingHorizontal: 10,
							}}
						>
							<Input
								onChangeText={ (email) => this.setState({ email })}
								placeholder="Email Address"
								value={this.state.email}

							/>
						</Item>
					    <Item 
					    	style={{ 
					    		marginLeft: 10,
								margin: 10,
								paddingHorizontal: 10,
							}}
					    	rounded 
					    	last
					    >
							<Input 
								onChangeText={(password) => this.setState({password})}
								placeholder="Password"
								value={this.state.password}
								secureTextEntry={true}
								
							/>
					    </Item>
						<Button full rounded success
							onPress={this.createAccount}
							style={{
								margin: 20,
								backgroundColor: '#3389EE',
							}}
						>
							<Text>Sign Up</Text>
						</Button>
					</Form>
				</Content>
				<Toast ref="toast"/>
			</Container>
		);
	}
}

const styles = {
	headerStyle: {
		backgroundColor: '#3389EE',
	},
	itemStyle: {
		marginLeft: 10,
		margin: 10,
		paddingHorizontal: 10,
	},
	inputStyle: {
		margin: 10,
	},
	buttonStyle: {
		margin: 20,
		backgroundColor: '#3389EE',
	},
	signupStyle: {
		alignItems: 'center',
		paddingTop: 16,
	},
	signupTextStyle: {
		color: '#9ea8b5',
	}
};

const mapStateToProps = ({ AuthReducer }) => ({
	isLoggedIn: AuthReducer.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
	authActionsCreator: bindActionCreators(authActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
