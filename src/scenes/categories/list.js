import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, List, ListItem, Card, CardItem  } from 'native-base';
import categoryActions from '../../actions/categoryActions';

class CategoryList extends Component {

	selectCategory = ({ category }) => {

		const { categoryActionsCreator } = this.props;

		categoryActionsCreator.selectCategory(category);

		this.props.navigation.goBack(null);
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
								color: 'white',
							}}
						>
							Select Category
						</Title>
					</Body>
					<Right>
						<TouchableOpacity
							onPress={() => this.props.navigation.goBack(null)}
						>
							<Icon
								name="md-close"
								style={{
									color: 'white',
								}}
							/>
						</TouchableOpacity>
					</Right>
				</Header>

				<Content>
					<Card>
						{
							categories.map(category => {
								return (
									<TouchableHighlight
										onPress={() => { this.selectCategory({ category }); }}
									>
										<CardItem>
											<Icon active name="logo-googleplus" />
											<Text>{category.name}</Text>
										</CardItem>
									</TouchableHighlight>
								);
							})
						}
					</Card>
				</Content>
			</Container>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	categoryActionsCreator: bindActionCreators(categoryActions, dispatch),
});

export default connect(null, mapDispatchToProps)(CategoryList);
