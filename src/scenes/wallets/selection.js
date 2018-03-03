import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, List, ListItem, Card, CardItem  } from 'native-base';
import walletActions from '../../actions/walletActions';

class Selection extends Component {

	selectWallet = (id) => {
  		const { walletActions } = this.props;

  		walletActions.selectWallet(id, () => {
  			this.props.navigation.goBack(null);
  		});
  	}

	render() {

		const { wallets } = this.props.navigation.state.params.wallets;

		console.log('navigation', this.props.navigation);

		return (

			<Container>
				<Header style={{ backgroundColor: '#3bb84a' }}>
					<Left />
					<Body>
						<Title
							style={{ 
		            			alignSelf: 'center',
		            			color: 'white' 
		            		}}
						>
							Select Wallet
						</Title>
					</Body>
					<Right>
						<TouchableOpacity
							onPress={()=>this.props.navigation.goBack(null)}
						>
							<Icon 
								name='md-close'
								style={{
			          				color: 'white' 
			          			}}
							/>
						</TouchableOpacity>
					</Right>
				</Header>

				<Content>
					<Card>
					{
						wallets.map(wallet => {
							return(
								<TouchableHighlight
									onPress={() => { this.selectWallet({ id: wallet.id}) }}
								>
									<CardItem>
										<Icon active name="logo-googleplus" />
										<Text>{wallet.name}</Text>
										<Right>
							                <Text>{wallet.balance}</Text>
							            </Right>
									</CardItem>
								</TouchableHighlight>
							)
						})
					}
					</Card>
				</Content>
			</Container>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	walletActions: bindActionCreators(walletActions, dispatch),
});

export default connect(null, mapDispatchToProps)(Selection);