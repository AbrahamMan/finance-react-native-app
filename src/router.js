import React from 'react';
import Login from './scenes/login';
import Dashboard from './scenes/dashboard';
import Profile from './scenes/profile';
import Wallets from './scenes/wallets';
import Edits from './scenes/edit';
import Date from './scenes/wallets/date';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { NavigationComponent } from 'react-native-material-bottom-navigation'


const Tabs = TabNavigator({
  Wallets: { screen: Wallets },
  Dashboard: { screen: Dashboard },
  Profile: { screen: Profile },
},{
  tabBarComponent: NavigationComponent,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    bottomNavigationOptions: {
      labelColor: 'white',
      rippleColor: 'white',
      tabs: {
        Dashboard: {
          barBackgroundColor: '#00796B'
        },
        Wallets: {
          barBackgroundColor: '#37474F'
        },
        Profile: {
          barBackgroundColor: '#5D4037'
        }
      }
    }
  }
});

const Router = StackNavigator({
  Tabs: {
    screen: Tabs,
    navigationOptions:()=>({
            header:null
        }),
  },
  Edits: {
    screen: Edits,
  },
  Date: {
    screen: Date,
  },
});




export default Router;