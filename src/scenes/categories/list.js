import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, List, ListItem, Card, CardItem  } from 'native-base';
import walletActions from '../../actions/walletActions';

class CategoryList extends Component {

	selectCategory = (id) => {
  		const { walletActions } = this.props;

  		walletActions.selectWallet(id, () => {
  			this.props.navigation.goBack(null);
  		});
  	}

	render() {

		const { categories } = this.props.navigation.state.params.categories;

		console.log('categories in list', categories);

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
							Select Category
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
						categories.map(category => {
							return(
								<TouchableHighlight
									onPress={() => { this.selectCategory({ id: category.id}) }}
								>
									<CardItem>
										<Icon active name="logo-googleplus" />
										<Text>{category.name}</Text>
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

export default connect(null, mapDispatchToProps)(CategoryList);