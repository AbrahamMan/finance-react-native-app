import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Header, Card, CardSection } from '../components/layouts';
import { Calendar } from 'react-native-calendars';

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
					<Calendar
			          style={styles.calendar}
			          current={'2018-01-15'}
			          markingType={'multi-dot'}
			          markedDates={{
			          	'2018-01-15': {selected: true, marked: true},
			            '2018-01-17': {dots: [{key: 'vacation', color: 'blue', selectedDotColor: 'white'}, {key: 'massage', color: 'red', selectedDotColor: 'white'}], selected: true},
			            '2018-01-19': {dots: [{key: 'vacation', color: 'blue', selectedColor: 'red'}, {key: 'massage', color: 'red', selectedColor: 'blue'}], disabled: true}
			          }}
			          onDayPress={(day)=>{console.log('day pressed',day)}}
			          hideArrows={false}
			          minDate={'2017-12-01'}
			          maxDate={'2018-02-28'}
			        />
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