import { 
	REQUEST_CATEGORIES_LIST_SUCCESS
} from '../actions/types';

const INITIAL_STATE = { 
	categories: [],
};

export default (state = INITIAL_STATE, action) => {
	const { type, payload } = action;
	switch (type) {
		case REQUEST_CATEGORIES_LIST_SUCCESS:
			return { 
				...state,
				...payload,
			};			
		default:
		  return state;
	}
}