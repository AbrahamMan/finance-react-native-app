import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Header, Card, CardSection, HeaderTop } from '../components/layouts';
import tranActions from '../actions/tranActions';
import { NavigationActions } from 'react-navigation';

class Add extends Component {
	constructor(props) {
	    super(props);
	    this.state = { amount: '', description: '', date: '' };
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

        	// open other pages to edit transactions
        	//navigate('Wallets',);
        	//
        	this.props.navigation.dispatch(resetAction);
		}
	}

	render() {
		const { container } = styles;
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
			    <Button 
			    	onPress={this.save}
			    	title="Save"
  					color="#3389EE"
			    />
		    </View>
		);
	}
}

const styles = {
	container: {
		padding: 16,
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