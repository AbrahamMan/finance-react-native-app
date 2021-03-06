import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { NavigationComponent } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Login from './scenes/login';
import Signup from './scenes/signup';
import Dashboard from './scenes/dashboard';
import Profile from './scenes/profile';
import Wallets from './scenes/wallets';
import Edits from './scenes/transactions/edit';
import Add from './scenes/transactions/add';
import Date from './scenes/transactions/date';
import WalletList from './scenes/wallets/list';
import WalletTransfer from './scenes/transactions/transfer';
import CategoryList from './scenes/categories/list';
import AddFirstWallet from './scenes/wallets/firstWallet';
import AddWallet from './scenes/wallets/add';

const Tabs = TabNavigator({
	Wallets: { screen: Wallets },
	Dashboard: { screen: Dashboard },
	Profile: { screen: Profile },
}, {
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
					activeLabelColor: '#3bb84a',
				},
				Wallets: {
					barBackgroundColor: '#ffffff',
					activeIcon: <Icon size={24} color="#3bb84a" name="account-balance-wallet" />,
					activeLabelColor: '#3bb84a',
				},
				Profile: {
					barBackgroundColor: '#ffffff',
					activeIcon: <Icon size={24} color="#3bb84a" name="person" />,
					activeLabelColor: '#3bb84a',
				},
			},
		},
	},
	animationEnabled: false,
});

const Router = StackNavigator({
	Login: {
		screen: Login,
	},
	Signup: {
		screen: Signup,
	},
	AddFirstWallet: {
		screen: AddFirstWallet,
	},
	AddWallet: {
		screen: AddWallet,
	},
	Tabs: {
		screen: Tabs,
		navigationOptions: () => ({
			header: null,
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
		navigationOptions: () => ({
			header: null,
		}),
	},
	WalletList: {
		screen: WalletList,
		navigationOptions: () => ({
			header: null,
		}),
	},
	WalletTransfer: {
		screen: WalletTransfer,
		navigationOptions: () => ({
			header: null,
		}),
	},
	CategoryList: {
		screen: CategoryList,
		navigationOptions: () => ({
			header: null,
		}),
	},
}, {
	mode: 'modal',
});

export default Router;
