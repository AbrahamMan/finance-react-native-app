import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import authActions from '../actions/authActions';
import { Container, Header, Left, Button, Icon, Body, Right, Title, Content, Text,  Form, Item, Input, Label } from 'native-base';

class Login extends Component {

	constructor(props){
		super(props);
    	this.state = {email: 'm.ridhwan.daud@gmail.com', password: 'password'};
    	this.login = this.login.bind(this);
	}

	login(){
		const { email, password } = this.state;
		const { authActionsCreator } = this.props;

		const payload = {
			email,
			password,
		}

		authActionsCreator.loginUser({payload});
	}

	render() {
		const { navigate } = this.props.navigation;
		return (
			<Container>
				<Header>
		          <Left>
		            <Button transparent>
		              <Icon name='menu' />
		            </Button>
		          </Left>
		          <Body>
		            <Title>Header</Title>
		          </Body>
		          <Right />
		        </Header>
		        <Content>
		          <Form>
		            <Item floatingLabel>
		              <Label>Email</Label>
		              <Input 
		              	onChangeText={(email) => this.setState({email})}
		              	value={this.state.email}
		              />
		            </Item>
		            <Item floatingLabel last>
		              <Label>Password</Label>
		              <Input 
		              	onChangeText={(password) => this.setState({password})}
		              	value={this.state.password}
		              />
		            </Item>
		            <Button full success
		            	onPress={this.login}
		            >
			            <Text>Login</Text>
			        </Button>
		          </Form>
		        </Content>
			</Container>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	authActionsCreator: bindActionCreators(authActions, dispatch),
});

export default connect(null, mapDispatchToProps)(Login);
