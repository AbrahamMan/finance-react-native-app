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
			console.log('data', data);
			await dispatch(requestTransListSuccess(data));
			callback && callback();
		})
		.catch(({ message, ...others }) => {
			callback && callbackError();
		});
});

const storeTransactionSuccess = payload => ({ type: STORE_TRANSACTION_SUCCESS, payload });

const storeTransaction = ({state, navigation, resetAction} ,callback) => ((dispatch, getState) => {

	const category = getState().CategoryReducer;
	const type = category.selectedCategory.type;
	const category_id = category.selectedCategory.id;
	const category_image = category.selectedCategory.url;

	const payload = {
		description: state.description,
		amount: state.amount,
		date: state.date,
		type,
		wallet_id: state.wallet_id,
		wallet_id_transfer: state.wallet_id_transfer,
		category_id,
		category_image,
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
