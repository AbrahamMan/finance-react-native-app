import React, { Component } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Header, Card, CardSection, HeaderTop } from '../components/layouts';
import tranActions from '../actions/tranActions';
import { NavigationActions } from 'react-navigation';
import moment from 'moment';
import { Button, Text, Item, Input, Label } from 'native-base';

class Add extends Component {
	constructor(props) {
	    super(props);
	    this.state = { amount: '', description: '', date: moment().format('YYYY-MM-DD'), type: 'debit' };
	}

	save = () =>{
	 	console.log('save');
	 	const { actions, navigation } = this.props;

	 	const resetAction = NavigationActions.reset({
	        index: 0,
	        actions: [
	          NavigationActions.navigate({
	            routeName: "Tabs"
	          })
	        ]
	      });

	 	actions.storeTransaction({ state: this.state , navigation, resetAction});
	 	
	}

	render() {
		const { container, button } = styles;
		return (
			<View style={container}>
			    <Item inlineLabel>
	              <Label>RM</Label>
	              <Input 
	              	style={{height: 70, fontSize: 30 }}
	              	onChangeText={(amount) => this.setState({amount})}
	              	placeholder="0"
	              />
	            </Item>
			    <Item>
		            <Icon active name='help' style={{fontSize: 30}} />
		            <Input placeholder='Category' onChangeText={(category) => this.setState({category})}/>
		        </Item>
		        <Item>
		            <Icon active name='event' style={{fontSize: 30}} />
		            <Input placeholder='Type' onChangeText={(type) => this.setState({type})} value={this.state.type}/>
		        </Item>
			    <Item>
		            <Icon active name='subject' style={{fontSize: 25}} />
		            <Input placeholder='Note' onChangeText={(description) => this.setState({description})}/>
		        </Item>
			    <Item>
		            <Icon active name='event' style={{fontSize: 30}} />
		            <Input placeholder='Today' onChangeText={(date) => this.setState({date})} value={this.state.date}/>
		        </Item>
			    <View style={button}>
				    <Button 
				    	onPress={this.save}
				    >
				    	<Text>Save </Text>
				    </Button>
			    </View>
		    </View>
		);
	}
}

const styles = {
	container: {
		padding: 16,
		flex: 1,
		backgroundColor: '#ffffff',
	},
	button: {
		marginTop: 10,
	}
}

const mapStateToProps = (state) => {
	console.log(state);
	return { state };
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(tranActions, dispatch),
});

export default connect(mapStateToProps,mapDispatchToProps)(Add);