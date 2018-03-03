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
		const { wallets, walletName, walletActions } = this.props;
		console.log('walletActions', walletActions);
		return (
			<Header style={{ backgroundColor: '#3bb84a' }}>
	          	<Left>
	          	</Left>
	          	<Body 
	          		style={{ 
	          			flex: 1,
	          			justifyContent: 'center',
	          			alignItems: 'center',
	          		}}
	          	>
	          	<TouchableOpacity 
	          		onPress={()=>{this._toggleModal({wallets})}}
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
	          	<Right />
	          	<Modal isVisible={this.state.isModalVisible}>
		          	<View style={{ height: 300, backgroundColor: 'white' }}>
		            	<Header style={{ paddingTop: 0 }}>
		            		<Left>
		            			<TouchableOpacity onPress={this._toggleModal}>
				              		<Icon name='close' style={{ color: 'black' }}/>
				            	</TouchableOpacity>
		            		</Left>
		            		<Body>
		            			<Title>Select Wallet</Title>
		            		</Body>
		            		<Right />
		            	</Header>
		            	<Content style={{ flex: 1 }}>
						{
							wallets &&
							wallets.map(wallet=>{
								return(
									<List>
										<ListItem icon>
											<Left>
												<Icon name="md-briefcase" />
											</Left>
											<Body>
												<TouchableHighlight 
													onPress={() => { this.selectWallet({ id: wallet.id}) }}
													activeOpacity={0.9}
													underlayColor="#EEEEEE"
												>
													<View>
														<Text>{wallet.name}</Text>
														<Text>{wallet.balance}</Text>
													</View>
												</TouchableHighlight>
											</Body>
											<TouchableOpacity 
												onPress={() => { this.editWallet({ id: wallet.id}) }}
												activeOpacity={0.1}
											>
												<Right>
													<Icon name="md-more" />
												</Right>
											</TouchableOpacity>
										</ListItem>
									</List>									
								)
							})
						}
		            	</Content>
		          	</View>
		        </Modal>
	        </Header>

		);
	}
}

// Make the component available to other parts of the app
export { HeaderTop };
