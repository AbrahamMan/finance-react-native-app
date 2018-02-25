import { 
  LOGIN_USER
} from './types';
import request from '../helpers/request';

const loginUser = ({ payload }) => (dispatch) =>{

  console.log('payload loginUser', payload);

  request
  .post('/login', payload)
  .then(async ({ data }) => {
    console.log('success', data);
    //await dispatch(requestTransListSuccess({ trans: data }));
    //callback && callback();
  })
  .catch(({ message, ...others }) => {
    console.log('error', others);
    //callback && callbackError();
  });
};

export default {
  loginUser,
};