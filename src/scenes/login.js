import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import authActions from '../actions/authActions';
import { NavigationActions } from 'react-navigation';
import { Container, Header, Left, Button, Icon, Body, Right, Title, Content, Text,  Form, Item, Input, Label } from 'native-base';

class Login extends Component {

	constructor(props){
		super(props);
    	this.state = {email: '', password: ''};
    	this.login = this.login.bind(this);
	}

	componentWillMount() {
		const { isLoggedIn, authActionsCreator, navigation } = this.props;

		const resetAction = NavigationActions.reset({
	        index: 0,
	        actions: [
	          NavigationActions.navigate({
	            routeName: "Tabs"
	          })
	        ]
	      });

		if (isLoggedIn) {
			authActionsCreator.doInitialLoad();
			navigation.dispatch(resetAction);
		}
	}

	login(){
		const { email, password } = this.state;
		const { authActionsCreator, navigation } = this.props;

		const payload = {
			email,
			password,
		}

		const resetAction = NavigationActions.reset({
	        index: 0,
	        actions: [
	          NavigationActions.navigate({
	            routeName: "Tabs"
	          })
	        ]
	      });

		authActionsCreator.loginUser({payload, navigation, resetAction});
	}

	render() {
		const { navigate } = this.props.navigation;
		const { itemStyle, buttonStyle, headerStyle } = styles;
		return (
			<Container>
				<Header 
					style={{ backgroundColor: '#3bb84a' }}
				>
		          <Left />
		          <Body>
		            <Title
		            	style={{ color: 'white' }}
		            >
		            	Sign In
		            </Title>
		          </Body>
		          <Right />
		        </Header>
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
		              	onChangeText={(email) => this.setState({email})}
		              	placeholder="email"
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
		              	placeholder="password"
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
		          </Form>
		        </Content>
			</Container>
		);
	}
}

styles = {
	headerStyle:{
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
	}
};

const mapStateToProps = ({ AuthReducer }) => ({
	isLoggedIn: AuthReducer.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
	authActionsCreator: bindActionCreators(authActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
