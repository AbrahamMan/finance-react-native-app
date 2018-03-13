import { combineReducers } from 'redux';
import AuthReducer from './authReducer';
import TransactionsReducer from './transactionsReducer';
import WalletReducer from './walletReducer';
import CategoryReducer from './categoryReducer';

export default combineReducers({
  AuthReducer,
  TransactionsReducer,
  WalletReducer,
  CategoryReducer,
}); 