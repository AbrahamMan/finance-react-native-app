import { 
	REQUEST_TRANS_LIST_START,
	REQUEST_TRANS_LIST_SUCCESS,
	STORE_TRANSACTION_SUCCESS,
	USER_LOGOUT
} from '../actions/types';

const INITIAL_STATE = { 
	transactions: [],
	wallet: [],
	goToTransList: false,
	isLoading: false,
};

export default (state = INITIAL_STATE, action) => {
	const { type, payload } = action;
	switch (type) {
		case REQUEST_TRANS_LIST_START:
			return { 
				...state, 
				...payload,
				isLoading: true 
			};
		case REQUEST_TRANS_LIST_SUCCESS:
			return { 
				...state,
				...payload,
				isLoading: false
			};
		case STORE_TRANSACTION_SUCCESS:
			return {
				...state,
				goToTransList: true
			};
		case USER_LOGOUT:
			console.log('Logging out');
			return { ...INITIAL_STATE };			
		default:
		  return state;
	}
}