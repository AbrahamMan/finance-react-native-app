import {
	REQUEST_CATEGORIES_LIST_SUCCESS,
	SELECT_CATEGORY,
} from '../actions/types';

const INITIAL_STATE = {
	categories: [],
	selectedCategory: '',
};

export default (state = INITIAL_STATE, action) => {
	const { type, payload } = action;
	switch (type) {
	case REQUEST_CATEGORIES_LIST_SUCCESS:
		return {
			...state,
			...payload,
		};
	case SELECT_CATEGORY:
		return {
			...state,
			selectedCategory: payload,
		};
	default:
		return state;
	}
};
