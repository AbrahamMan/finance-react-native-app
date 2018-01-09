import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Detail extends Component {
	render() {
		const { params } = this.props.navigation.state;
		return (
			<View>
				<Text>
					Detail : { params.name }
				</Text>	
			</View>
		);
	}
}

export default Detail;
