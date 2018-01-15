import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Header, Card, CardSection } from '../components/layouts';
import { Calendar } from 'react-native-calendars';
import Date from './wallets/date';

class Edit extends Component {
	render() {
		const { Item } = this.props.navigation.state.params;
		return (
			<View>
				<CardSection>
					<Text style={styles.textStyle}>{ Item.description}</Text>
				</CardSection>
				<CardSection>
					<Text style={styles.textStyle}>{ Item.value}</Text>
				</CardSection>
				<CardSection>
					<Date Item={Item} />
				</CardSection>
			</View>

		);
	}
}

const styles = {
	textStyle: {
		padding: 16,
	},calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350
  },
};


export default Edit;