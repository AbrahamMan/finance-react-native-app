import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Input } from '../components/forms';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HeaderTop } from '../components/layouts';
import request from '../helpers/request';

class Profile extends Component {

	static navigationOptions = {
	    tabBarLabel: "Profile",
	    swipeEnabled: false,
	    tabBarIcon: () => <Icon size={24} name="person" color="#3389EE" />
	}

	componentWillMount(){
 		  request
 			.get('/transactions')
 			.then(({ data }) => {
 				console.log('welcome.then', data);
 			})
 			.catch(({ message, ...others }) => {
 				console.log('welcome.catch', others);
 			});
 	}

	render() {
		const { navigate } = this.props.navigation;
		return (
			<View>
				<HeaderTop title="Profile"/>
				<Text>
					profile here
				</Text>
			</View>
		);
	}
}

export default Profile;
