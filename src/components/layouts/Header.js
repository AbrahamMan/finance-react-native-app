// Import libraries for making a component
import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import Modal from "react-native-modal";

// Make a component
class HeaderTop extends Component {
	state = {
    isModalVisible: false
  };
  	_toggleModal = () =>{
    this.setState({ isModalVisible: !this.state.isModalVisible });
    }
	render(){
		const { wallets } = this.props;
		return (
			<Header style={{ backgroundColor: '#3bb84a' }}>
	          <Left>
	          </Left>
	          <Body>
	          	<TouchableOpacity onPress={this._toggleModal} style={{ flexDirection: 'row'}}>
	          		<Icon name='arrow-down' style={{ paddingRight: 10, paddingTop: 5 }}/>
	            	<Title style={{ alignSelf: 'center' }}>{this.props.walletName}</Title>
	            </TouchableOpacity>	
	          </Body>
	          <Right />
	          <Modal isVisible={this.state.isModalVisible}>
          <View style={{ flex: 1 }}>
            <Text>Hello!</Text>
            <TouchableOpacity onPress={this._toggleModal}>
              <Text>Hide me!</Text>
            </TouchableOpacity>
          </View>
        </Modal>
	        </Header>

		);
	}
}

// Make the component available to other parts of the app
export { HeaderTop };
