import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Header, Card, CardSection } from '../components/layouts';
import { Calendar } from 'react-native-calendars';
import Date from './wallets/date';

class Edit extends Component {
    openDate = (Item) => {
        console.log('openDate',Item);
        const { navigate } = this.props.navigation;

        // open other pages to edit transactions
        navigate('Date', { Item } );
    }
	render() {
		const { Item } = this.props.navigation.state.params;
		return (
			<View>
				<CardSection>
					<Text style={styles.textStyle}>{ Item.description}</Text>
				</CardSection>
				<CardSection>
					<Text style={styles.textStyle}>{ Item.amount}</Text>
				</CardSection>
                <TouchableOpacity onPress={()=>{this.openDate({Item})}}>
				    <CardSection>
                        <Text style={styles.textStyle}>{ Item.date}</Text>
					{/*<Date Item={Item} />*/}
				    </CardSection>
                </TouchableOpacity>
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