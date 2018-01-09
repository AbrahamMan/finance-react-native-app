import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';

class App extends Component{

  render(){

    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return(
      <Provider store={store}>
        <View>
        	<Text>
        		HELLO WORLD
        	</Text>	
        </View>
      </Provider>
    );
  }
}

export default App;