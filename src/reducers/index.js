import { combineReducers } from 'redux';
import AuthReducer from './authReducer';
import TransactionsReducer from './transactionsReducer';
import WalletReducer from './walletReducer';

export default combineReducers({
  AuthReducer,
  TransactionsReducer,
  WalletReducer,
}); 