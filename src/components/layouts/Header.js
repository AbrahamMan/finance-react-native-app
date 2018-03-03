// Import libraries for making a component
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, List, ListItem } from 'native-base';
import Modal from "react-native-modal";

// Make a component
class HeaderTop extends Component {
	state = {
    	isModalVisible: false
  	};

  	_toggleModal = (wallets) =>{
    	//this.setState({ isModalVisible: !this.state.isModalVisible });
    	
    	console.log('header', this.props.navigation );

    	console.log('wallets', wallets);

    	const { navigate } = this.props.navigation;

    	navigate('Selection', { wallets });
    }

    editWallet = (id) => {
    	console.log('editWallet', id);
  	}

  	selectWallet = (id) => {
  		const { walletActions } = this.props;

  		walletActions.selectWallet(id, () => {
  			this.setState({ isModalVisible: !this.state.isModalVisible });
  		});
  	}

	render(){
		const { wallet, walletName, walletActions } = this.props;
		console.log('walletActions', walletActions);
		return (
			<Header style={{ backgroundColor: '#3bb84a' }}>
	          	<Left>
	          	</Left>
	          	{
	          		wallet.balance !== null &&
	          		<Body 
		          		style={{ 
		          			flex: 1,
		          			justifyContent: 'center',
		          			alignItems: 'center',
		          		}}
		          	>

				        <TouchableOpacity 
			          		onPress={()=>{this._toggleModal({wallets: wallet.list})}}
			          		style={{ flexDirection: 'row'}}
			          	>
			          		<Icon 
			          			name='arrow-down' 
			          			style={{ paddingRight: 10,
			          				paddingTop: 5,
			          				color: 'white' 
			          			}}
			          		/>
			            	<Title 
			            		style={{ 
			            			alignSelf: 'center',
			            			color: 'white' 
			            		}}
			            	>
			            			{walletName}
			            	</Title>
			            </TouchableOpacity>	
		          	</Body>
	          	}
	          	<Right />
	        </Header>

		);
	}
}

// Make the component available to other parts of the app
export { HeaderTop };
