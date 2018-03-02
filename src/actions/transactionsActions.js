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
			await dispatch(requestTransListSuccess(data));
			callback && callback();
		})
		.catch(({ message, ...others }) => {
			callback && callbackError();
		});
});

const storeTransactionSuccess = payload => ({ type: STORE_TRANSACTION_SUCCESS, payload });

const storeTransaction = ({state, navigation, resetAction} ,callback) => ((dispatch, getState) => {

	const payload = {
		description: state.description,
		amount: state.amount,
		date: state.date,
		type: state.type,
		wallet_id: state.wallet_id,
	};

	request
		.post('/transaction', payload)
		.then(async ({ data }) => {
			await dispatch(storeTransactionSuccess(data));
			callback && callback();
			navigation.dispatch(resetAction)
		})
		.catch(({ message, ...others }) => {
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
