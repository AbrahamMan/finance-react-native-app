import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Input } from '../components/forms';

class LoginForm extends Component {
	render() {
		const { navigate } = this.props.navigation;
		return (
			<View>
				<Input />

				<Button
			      onPress={() => navigate('Details', { name: 'Jane'} )}
			      title="Go to details"
			    />
			</View>
		);
	}
}

export default LoginForm;
