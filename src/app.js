import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import Router from './router';

class App extends Component{

  render(){
    return(
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;