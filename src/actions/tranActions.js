import request from '../helpers/request';
import { 
	REQUEST_TRANS_LIST_START,
	REQUEST_TRANS_LIST_SUCCESS,
	STORE_TRANSACTION_SUCCESS
} from '../actions/types';


const requestTransListStart = () => ({ type: REQUEST_TRANS_LIST_START });
const requestTransListSuccess = payload => ({ type: REQUEST_TRANS_LIST_SUCCESS, payload });

const requestTransList = callback => ((dispatch) => {
	dispatch(requestTransListStart());
	request
		.get('/transactions')
		.then(async ({ data }) => {
			console.log('success', data);
			await dispatch(requestTransListSuccess({ trans: data }));
			callback && callback();
		})
		.catch(({ message, ...others }) => {
			console.log('error', others);
			callback && callbackError();
		});

	console.log('end');	
});

const storeTransactionSuccess = payload => ({ type: STORE_TRANSACTION_SUCCESS, payload });

const storeTransaction = ({state} ,callback) => ((dispatch) => {
	console.log('storeTransaction', state);

	const payload = {
		description: state.description,
		amount: state.amount,
		date: state.date,
	};


	request
		.post('/transaction', payload)
		.then(async ({ data }) => {
			console.log('success', data);
			await dispatch(storeTransactionSuccess({ trans: data }));
			callback && callback();
		})
		.catch(({ message, ...others }) => {
			console.log('error', others);
			callback && callbackError();
		});
});

const changeDateSelection = ({index}) => ((dispatch) =>{
	console.log('changeDateSelection', index);
});
 
export default {
	requestTransList,
	storeTransaction,
	changeDateSelection,
};
