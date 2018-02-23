import React from 'react';
import Login from './scenes/login';
import Dashboard from './scenes/dashboard';
import Profile from './scenes/profile';
import Wallets from './scenes/wallets';
import Edits from './scenes/edit';
import Add from './scenes/add';
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
      labelColor: '#3389EE',
      rippleColor: '#3389EE',
      tabs: {
        Dashboard: {
          barBackgroundColor: '#ffffff'
        },
        Wallets: {
          barBackgroundColor: '#ffffff'
        },
        Profile: {
          barBackgroundColor: '#ffffff'
        }
      }
    }
  },
  animationEnabled: false,
});

const Router = StackNavigator({
  Tabs: {
    screen: Tabs,
    navigationOptions:()=>({
            header:null,
        }),
  },
  Edits: {
    screen: Edits,
  },
  Date: {
    screen: Date,
  },
  Add: {
    screen: Add,
  },
});




export default Router;