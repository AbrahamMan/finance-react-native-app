import request from '../helpers/request';
import { 
	REQUEST_TRANS_LIST,
	REQUEST_TRANS_LIST_SUCCESS
} from '../actions/types';


const requestTransListSuccess = payload => ({ type: REQUEST_TRANS_LIST_SUCCESS, payload });

const requestTransList = callback => ((dispatch) => {
	request
		.get('/transactions')
		.then(async ({ data }) => {
			console.log('success', data);
			await dispatch(requestTransListSuccess({ trans: data }));
			callback && callback();
		})
		.catch(({ message }) => {
			callback && callbackError();
		});
});

export default {
	requestTransList,
};
