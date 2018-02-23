import React from 'react';
import Login from './scenes/login';
import Dashboard from './scenes/dashboard';
import Profile from './scenes/profile';
import Wallets from './scenes/wallets';
import Edits from './scenes/edit';
import Add from './scenes/add';
import Date from './scenes/wallets/date';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { NavigationComponent } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tabs = TabNavigator({
  Wallets: { screen: Wallets },
  Dashboard: { screen: Dashboard },
  Profile: { screen: Profile },
},{
  tabBarComponent: NavigationComponent,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    bottomNavigationOptions: {
      labelColor: '#616161',
      rippleColor: '#3bb84a',
      tabs: {
        Dashboard: {
          barBackgroundColor: '#ffffff',
          activeIcon: <Icon size={24} color="#3bb84a" name="dashboard" />,
          activeLabelColor: '#3bb84a'
        },
        Wallets: {
          barBackgroundColor: '#ffffff',
          activeIcon: <Icon size={24} color="#3bb84a" name="account-balance-wallet" />,
          activeLabelColor: '#3bb84a'
        },
        Profile: {
          barBackgroundColor: '#ffffff',
          activeIcon: <Icon size={24} color="#3bb84a" name="person" />,
          activeLabelColor: '#3bb84a'
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