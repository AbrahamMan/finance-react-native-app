import React from 'react';
import LoginForm from './scenes/loginForm';
import Details from './scenes/details';
import { StackNavigator } from 'react-navigation';

const Router = StackNavigator({
  LoginForm: { 
  	screen: LoginForm,
  	navigationOptions: {
      headerTitle: 'Login',
    }, 
  },
  Details: { 
  	screen: Details,
  	navigationOptions: {
      headerTitle: 'Details',
    }, 
  },
});

export default Router;