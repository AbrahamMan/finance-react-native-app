import React, { Component } from 'react';
import { ToastAndroid, Platform, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { Container, Header, Left, Button, Body, Right, Title, Content, Text, Form, Item, Input } from 'native-base';
import Toast from 'react-native-easy-toast';
import authActions from '../actions/authActions';

class Login extends Component {

	static navigationOptions = {
	    title: 'Sign In',
	};

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			showToast: false,
		};
		this.login = this.login.bind(this);
		this.signup = this.signup.bind(this);
	}

	componentWillMount() {
		const { isLoggedIn, authActionsCreator, navigation } = this.props;

		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({
					routeName: 'Tabs',
				}),
			],
		});

		if (isLoggedIn) {
			authActionsCreator.doInitialLoad();
			navigation.dispatch(resetAction);
		}
	}

	login() {
		const { email, password } = this.state;
		const { authActionsCreator, navigation } = this.props;

		const payload = {
			email,
			password,
		};

		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({
					routeName: 'Tabs',
				}),
			],
		});

		authActionsCreator.loginUser({ payload }, () => {
			navigation.dispatch(resetAction);
		}, () => {
			if (Platform.OS === 'Android') {
				ToastAndroid.show('Wrong email or password!', ToastAndroid.SHORT);
			} else {
				this.refs.toast.show('Wrong email or password!');
			}
		});
	}

	signup(){
		const { navigate } = this.props.navigation;

		navigate('Signup');
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
							onPress={this.login}
							style={{
								margin: 20,
								backgroundColor: '#3389EE',
							}}
						>
							<Text>Login</Text>
						</Button>
						<TouchableOpacity 
							style={signupStyle}
							onPress={this.signup}
						>
							<Text style={signupTextStyle}>
								Don't have an account? Sign up
							</Text>
						</TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
