import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Header } from '../components/layouts';

class Dashboard extends Component {

	static navigationOptions = {
	    tabBarLabel: "Dashboard",
	    swipeEnabled: false,
	    tabBarIcon: () => <Icon size={24} name="dashboard" color="white" />
	}

	render() {
		const { params } = this.props.navigation.state;
		return (
			<View>
				<Header headerText="Dashboard" />
				<Text>
					Dashboard : 
				</Text>	
			</View>
		);
	}
}

export default Dashboard;
