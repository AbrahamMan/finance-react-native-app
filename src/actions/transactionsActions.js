import request from '../helpers/request';
import { 
	REQUEST_TRANS_LIST_START,
	REQUEST_TRANS_LIST_SUCCESS,
	STORE_TRANSACTION_SUCCESS
} from '../actions/types';


const requestTransListStart = () => ({ type: REQUEST_TRANS_LIST_START });
const requestTransListSuccess = payload => ({ type: REQUEST_TRANS_LIST_SUCCESS, payload });

const requestTransList = ({id}, callback) => ((dispatch) => {
	console.log('requestTransList id', id);
	dispatch(requestTransListStart());
	request
		.get(`/transactions/${id}`)
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
			console.log('success', data);
			await dispatch(storeTransactionSuccess(data));
			callback && callback();
			navigation.dispatch(resetAction)
		})
		.catch(({ message, ...others }) => {
			console.log('errors', others);
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
