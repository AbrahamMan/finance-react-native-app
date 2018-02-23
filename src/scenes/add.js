import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Header, Card, CardSection, HeaderTop } from '../components/layouts';
import tranActions from '../actions/tranActions';
import { NavigationActions } from 'react-navigation';
import moment from 'moment';

class Add extends Component {
	constructor(props) {
	    super(props);
	    this.state = { amount: '', description: '', date: moment().format('YYYY-MM-DD') };
	}

	save = () =>{
	 	console.log('save');
	 	const { actions } = this.props;
	 	actions.storeTransaction({ state: this.state });
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.state.wallet.goToTransList){
			const { navigate } = this.props.navigation;

			const resetAction = NavigationActions.reset({
		        index: 0,
		        actions: [
		          NavigationActions.navigate({
		            routeName: "Tabs"
		          })
		        ]
		      });
			
        	this.props.navigation.dispatch(resetAction);
		}
	}

	render() {
		const { container, button } = styles;
		return (
			<View style={container}>
				<Text> Amount </Text>
				<TextInput
					style={{height: 40, borderColor: 'gray', borderWidth: 1}}
					onChangeText={(amount) => this.setState({amount})}
					underlineColorAndroid='transparent'
					value={this.state.amount}
			    />
			    <Text> Description </Text>
				<TextInput
					style={{height: 40, borderColor: 'gray', borderWidth: 1}}
					onChangeText={(description) => this.setState({description})}
					underlineColorAndroid='transparent'
					value={this.state.description}
			    />
			    <Text> Date </Text>
				<TextInput
					style={{height: 40, borderColor: 'gray', borderWidth: 1}}
					underlineColorAndroid='transparent'
					onChangeText={(date) => this.setState({date})}
					value={this.state.date}
			    />
			    <View style={button}>
				    <Button 
				    	onPress={this.save}
				    	title="Save"
	  					color="#3389EE"
				    />
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