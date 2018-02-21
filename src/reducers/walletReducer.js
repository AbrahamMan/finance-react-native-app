import { 
	REQUEST_TRANS_LIST,
	REQUEST_TRANS_LIST_SUCCESS,
	STORE_TRANSACTION_SUCCESS
} from '../actions/types';

const INITIAL_STATE = { 
	trans: [],
	goToTransList: false,
};

export default (state = INITIAL_STATE, action) => {
	const { type, payload } = action;
	switch (type) {
		case REQUEST_TRANS_LIST:
			return { 
				...state, 
				...payload 
			};
		case REQUEST_TRANS_LIST_SUCCESS:
			return { 
				...state,
				...payload
			};
		case STORE_TRANSACTION_SUCCESS:
			return {
				...state,
				...payload,
				goToTransList: true
			}				
		default:
		  return state;
	}
}