import { 
  REQUEST_CATEGORIES_LIST_SUCCESS,
  SELECT_CATEGORY
} from './types';
import request from '../helpers/request';

const requestCategoriesListSuccess = payload => ({ type: REQUEST_CATEGORIES_LIST_SUCCESS, payload });

const requestCategoriesList = () => (dispatch) =>{
  request
  .get('/categories')
  .then(async ({ data }) => {
    await dispatch(requestCategoriesListSuccess(data));
  })
  .catch(({ message, ...others }) => {
    console.log('error', others);
  });
};

const selectCategory = payload => ({ type: SELECT_CATEGORY, payload });

export default {
	requestCategoriesList,
	selectCategory,
};
