import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Swiper from 'react-native-swiper';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, List, ListItem, Card, CardItem, Thumbnail  } from 'native-base';
import categoryActions from '../../actions/categoryActions';
import { filterByType } from '../../selector/categorySelector';

class CategoryList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			type: '',
		};
		//this.selectCategory = this.selectCategory.bind(this);
	}

	componentWillMount() {
		const { categories } = this.props.navigation.state.params.categories;
		const category = filterByType(categories);


		console.log('category', category);

		this.setState({ type: category.types, array: category.array });

		console.log('this.state.type', this.state.type);
	}

	selectCategory = (category) => {

		const { categoryActionsCreator } = this.props;
		console.log('category', category);
		categoryActionsCreator.selectCategory(category);

		this.props.navigation.goBack(null);
	}

	_renderItem = ({item}) => (
		<ListItem onPress={()=>this.selectCategory(item)} avatar style={{ paddingVertical: 5 }}>
			<Left>
				<Thumbnail source={{ uri: item.url }} style={{ width: 40, height: 40 }}/>
			</Left>
			<Body>
				<Text>{item.name}</Text>
			</Body>
			<Right />
		</ListItem>
	);

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

				<View style={{ flex: 1 }}>
					<Swiper 
						showsButtons={true}
						loop={false}
						onIndexChanged={this.changeDateSelection}
					>
						{
							this.state.array.map(categories => {
								return (
									<FlatList
										// ListHeaderComponent={this.renderHeader}
										style={{ flex: 6 }}
									  	data={categories}
									  	renderItem={this._renderItem}
									  	keyExtractor={item => item.id}
									/>
								)
							})
						}

					</Swiper>

				</View>
			</Container>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	categoryActionsCreator: bindActionCreators(categoryActions, dispatch),
});

export default connect(null, mapDispatchToProps)(CategoryList);
