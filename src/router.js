import React from 'react';
import Login from './scenes/login';
import Dashboard from './scenes/dashboard';
import Profile from './scenes/profile';
import Wallets from './scenes/wallets';
import { TabNavigator } from 'react-navigation';
import { NavigationComponent } from 'react-native-material-bottom-navigation'

const Router = TabNavigator({
  Dashboard: { screen: Dashboard },
  Wallets: { screen: Wallets },
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

export default Router;