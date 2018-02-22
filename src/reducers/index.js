import { combineReducers } from 'redux';
import AuthReducer from './authReducer';
import WalletReducer from './walletReducer';

export default combineReducers({
  //auth: AuthReducer,
  walletReducer: WalletReducer,
}); 