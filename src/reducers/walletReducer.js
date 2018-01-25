import { 
	REQUEST_TRANS_LIST,
	REQUEST_TRANS_LIST_SUCCESS
} from '../actions/types';

const INITIAL_STATE = { 
	trans: [],
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
		default:
		  return state;
	}
}