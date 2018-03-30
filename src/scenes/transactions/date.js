import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

class Date extends Component {

	constructor(props) {
      super(props);
      this.state = {
        isFromDatePicked: false,
        isToDatePicked: false,
        FromDate: '',
        ToDate: '',
        markedDates: {}
      };
    }

    componentWillMount(){
    	const { Item } = this.props.navigation.state.params.Item;

    	console.log('Item', Item);

    	let markedDates = {...this.state.markedDates};

    	markedDates[Item.date] = {selected: true};

        this.setState({
          markedDates: markedDates
        });
    }

	onDayPress(day) {
        let markedDates = {...this.state.markedDates};

        markedDates[day.dateString] = {selected: true};

        this.setState({
          isFromDatePicked: true,
          FromDate: day.dateString,
          markedDates: markedDates
        });
    }

	render() {
		const { Item } = this.props.navigation.state.params;
		console.log('this.state.markedDates', this.state.markedDates);
		return (
			<Calendar
	          style={styles.calendar}
	          current={Item.date}
	          markingType={'multi-dot'}
              markedDates={this.state.markedDates}
	          // markedDates={{
	          // 	'2018-01-15': {selected: true, marked: true},
	          // }}
	          //onDayPress={(day)=>{console.log('day pressed',day)}}
	          onDayPress={(day) => {this.onDayPress(day)}}
	          hideArrows={false}
	          minDate={'2017-12-01'}
	          maxDate={'2018-02-28'}
	        />
		);
	}
}

const styles = {
	calendar: {
	    borderTopWidth: 1,
	    paddingTop: 5,
	    borderBottomWidth: 1,
	    borderColor: '#eee',
	    height: 350
	},
};


export default Date;
