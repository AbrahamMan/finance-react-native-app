import { 
  REQUEST_CATEGORIES_LIST_SUCCESS,
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

export default {
  requestCategoriesList,
};