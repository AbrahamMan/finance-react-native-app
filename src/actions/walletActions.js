import request from '../helpers/request';

import { 
	REQUEST_WALLET_LIST_START,
	REQUEST_WALLET_LIST_SUCCESS,
	REQUEST_WALLET_LIST_FAILURE,
	REQUEST_TRANS_LIST_SUCCESS
} from '../actions/types';


const requestWalletListStart = () => ({ type: REQUEST_WALLET_LIST_START });
const requestWalletListSuccess = payload => ({ type: REQUEST_WALLET_LIST_SUCCESS, payload });
const requestWalletListFailure = () => ({ type: REQUEST_WALLET_LIST_FAILURE });
const requestTransListSuccess = payload => ({ type: REQUEST_TRANS_LIST_SUCCESS, payload });

const requestWalletList = ({id}, callback) => ((dispatch) => {
	console.log('id', id);
	dispatch(requestWalletListStart());
	request
		.get(`/wallet/${id}`)
		.then(({ data }) => {
			console.log('success', data);
			dispatch(requestWalletListSuccess(data));
		})
		.catch(({ message, ...others }) => {
			console.log('failure', others);
			dispatch(requestWalletListFailure(message));
		});
});

const selectWallet = ({ id }, callback, callbackError) => ((dispatch) => {
	dispatch(requestWalletList({ id }));
	request
		.get(`/transactions/${id}`)
		.then(async ({ data }) => {
			await dispatch(requestTransListSuccess(data));
			callback && callback();
		})
		.catch(({ message, ...others }) => {
			console.log('failure', others);
			callback && callbackError();
		});
});

const createWallet = ({ payload }, callback, callbackError) => ((dispatch) => {
	console.log('createWallet');
	request
		.post('/wallet/create', payload)
		.then(async ({ data }) => {
			console.log('success', data);
			callback && callback();
		})
		.catch(({ message, ...others }) => {
			console.log('failure', others);
			callback && callbackError();
		});
});

export default {
	requestWalletList,
	selectWallet,
	createWallet,
};
