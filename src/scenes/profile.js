import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Input } from '../components/forms';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Header } from '../components/layouts';

class Profile extends Component {

	static navigationOptions = {
	    tabBarLabel: "Profile",
	    tabBarIcon: () => <Icon size={24} name="person" color="white" />
	}

	render() {
		const { navigate } = this.props.navigation;
		return (
			<View>
				<Header headerText="Profile" />
				<Text>
					profile here
				</Text>
			</View>
		);
	}
}

export default Profile;
