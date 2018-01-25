// Import libraries for making a component
import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

// Make a component
class HeaderTop extends Component {
	render(){
		const { navigate } = this.props;

		return (
			<Header style={{ backgroundColor: '#00796B' }}>
	          <Left>
	          </Left>
	          <Body>
	            <Title>{this.props.title}</Title>
	          </Body>
	          <Right>
	            <Button transparent onPress={() => navigate('Add')}>
	              <Icon name='add' style={{ color: '#ffffff'}}/>
	            </Button>
	          </Right>
	        </Header>
		);
	}
}

// Make the component available to other parts of the app
export { HeaderTop };
