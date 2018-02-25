// Import libraries for making a component
import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

// Make a component
class HeaderTop extends Component {
	render(){
		return (
			<Header style={{ backgroundColor: '#3bb84a' }}>
	          <Left>
	          </Left>
	          <Body>
	            <Title>{this.props.title}</Title>
	          </Body>
	          <Right>
	          </Right>
	        </Header>
		);
	}
}

// Make the component available to other parts of the app
export { HeaderTop };
