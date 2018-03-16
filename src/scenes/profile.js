import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Header, Left, Button, Body, Right, Title, Content, Text, Separator, ListItem } from 'native-base';
import authActions from '../actions/authActions';


class Profile extends Component {

	static navigationOptions = {
		tabBarLabel: 'Profile',
		swipeEnabled: false,
		tabBarIcon: () => <Icon size={24} name="person" color="#616161" />,
		activeLabelColor: '#3bb84a',
	}

	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this);
	}

	logout() {
		console.log('logout');
		const { navigation } = this.props;

		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({
					routeName: 'Login',
				}),
			],
		});
		this.props.userActionsCreator.logout({ navigation, resetAction });
	}

	shouldComponentUpdate(nextProps) {
		console.log('nextProps', nextProps);
		const { user } = nextProps.AuthReducer;

		return user !== null;
	}

	render() {
		const { navigate } = this.props.navigation;
		const { user } = this.props.AuthReducer;
		return (
			<Container style={{ backgroundColor: 'white' }}>
				<Header style={{ backgroundColor: '#3bb84a' }}>
					<Left />
					<Body>
						<Title
							style={{ color: 'white' }}
						>
							Profile
						</Title>
					</Body>
					<Right />
				</Header>
				<Content>
					<ListItem itemDivider>
						<Text>Name</Text>
					</ListItem>
					<ListItem >
						<Text>{user.name}</Text>
					</ListItem>
					<ListItem itemDivider>
						<Text>Email</Text>
					</ListItem>
					<ListItem >
						<Text>{user.email}</Text>
					</ListItem>
					<ListItem itemDivider />
					<ListItem onPress={this.logout}>
						<Text>Logout</Text>
					</ListItem>
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = ({ AuthReducer }) => ({
	AuthReducer,
});

const mapDispatchToProps = dispatch => ({
	userActionsCreator: bindActionCreators(authActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
