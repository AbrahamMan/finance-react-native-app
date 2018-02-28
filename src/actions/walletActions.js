import request from '../helpers/request';

import { 
	REQUEST_WALLET_LIST_START,
	REQUEST_WALLET_LIST_SUCCESS,
	REQUEST_WALLET_LIST_FAILURE
} from '../actions/types';


const requestWalletListStart = () => ({ type: REQUEST_WALLET_LIST_START });
const requestWalletListSuccess = payload => ({ type: REQUEST_WALLET_LIST_SUCCESS, payload });
const requestWalletListFailure = () => ({ type: REQUEST_WALLET_LIST_FAILURE });

const requestWalletList = callback => ((dispatch) => {
	dispatch(requestWalletListStart());
	request
		.get('/wallet/list')
		.then(({ data }) => {
			console.log('success', data);
			dispatch(requestWalletListSuccess(data));
		})
		.catch(({ message, ...others }) => {
			console.log('failure', others);
			dispatch(requestWalletListFailure(message));
		});
});

export default {
	requestWalletList,
};
