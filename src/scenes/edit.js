import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Header } from '../components/layouts';

class Edit extends Component {

	render() {
		const { Item } = this.props.navigation.state.params;
		return (
			<View>
				<Text>
					{ Item.description}
				</Text>
				<Text>
					{ Item.value}
				</Text>
				<Text>
					{ Item.date}
				</Text>		
			</View>
		);
	}
}

export default Edit;