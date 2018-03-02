import { 
	REQUEST_WALLET_LIST_START,
	REQUEST_WALLET_LIST_SUCCESS,
	REQUEST_WALLET_LIST_FAILURE,
	USER_LOGOUT,
	REQUEST_TRANS_LIST_SUCCESS
} from '../actions/types';

const INITIAL_STATE = { 
	balance: '',
	isLoading: false,
};

export default (state = INITIAL_STATE, action) => {
	const { type, payload } = action;
	switch (type) {
		case REQUEST_WALLET_LIST_START:
			return { 
				...state, 
				...payload,
				isLoading: true 
			};
		case REQUEST_WALLET_LIST_SUCCESS:
			return { 
				...state,
				...payload,
				isLoading: false
			};
		case REQUEST_WALLET_LIST_FAILURE:
			return {
				...state,
			};

		case REQUEST_TRANS_LIST_SUCCESS:
			return { 
				...state,
				...payload,
				isLoading: false
			};	
		case USER_LOGOUT:
			return { ...INITIAL_STATE };			
		default:
		  return state;
	}
}