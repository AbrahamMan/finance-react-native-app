import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import authActions from '../actions/authActions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HeaderTop } from '../components/layouts';
import request from '../helpers/request';
import { Container, Header, Left, Button, Body, Right, Title, Content, Text,  Form, Item, Input, Label, Separator, ListItem } from 'native-base';
import { NavigationActions } from 'react-navigation';

class Profile extends Component {

	static navigationOptions = {
	    tabBarLabel: "Profile",
	    swipeEnabled: false,
	    tabBarIcon: () => <Icon size={24} name="person" color="#616161" />,
	    activeLabelColor: '#3bb84a'
	}

	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this);
	}

	logout(){
		console.log('logout');
		const { navigation } = this.props;

		const resetAction = NavigationActions.reset({
	        index: 0,
	        actions: [
	          NavigationActions.navigate({
	            routeName: "Login"
	          })
	        ]
	      });
		this.props.userActionsCreator.logout({navigation, resetAction});
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
		            <Title>Profile</Title>
		          </Body>
		          <Right />
		        </Header>
		        <Content>
					<Separator bordered>
						<Text>FORWARD</Text>
					</Separator>
					<ListItem >
						<Text>Aaron Bennet</Text>
					</ListItem>
					<ListItem>
						<Text>Claire Barclay</Text>
					</ListItem>
					<ListItem last>
						<Text>Kelso Brittany</Text>
					</ListItem>
					<Separator bordered>
						<Text>MIDFIELD</Text>
					</Separator>
					<ListItem>
						<Text>Caroline Aaron</Text>
					</ListItem>
					<Button 
						onPress={this.logout}
					>
						<Text>
							Logout
						</Text>
					</Button>		
		        </Content>
			</Container>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	userActionsCreator: bindActionCreators(authActions, dispatch),
});

export default connect(null,mapDispatchToProps)(Profile);
