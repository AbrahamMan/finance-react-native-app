import { 
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  USER_LOGOUT
} from './types';
import request from '../helpers/request';

const loginUserSuccess = payload => ({ type: LOGIN_USER_SUCCESS, payload });

const loginUser = ({ payload, navigation, resetAction }) => (dispatch) =>{

  console.log('payload loginUser', payload);

  request
  .post('/login', payload)
  .then(async ({ data }) => {
    console.log('success', data);
    request.defaults.headers.common.Authorization = data.secret;
    await dispatch(loginUserSuccess(data));
    navigation.dispatch(resetAction);
    //callback && callback();
  })
  .catch(({ message, ...others }) => {
    console.log('error', others);
    //callback && callbackError();
  });
};

const doInitialLoad = () => (async (dispatch, getState) => {
  const user = getState().AuthReducer;
  if (user.isLoggedIn) {
    /* Modify headers to append authorization key */
    request.defaults.headers.common.Authorization = user.secret;
  }
});

const logoutStart = () => ({ type: USER_LOGOUT });

const logout = ({ navigation, resetAction }) => (dispatch) => {
  dispatch(logoutStart());
  navigation.dispatch(resetAction);
};

export default {
  loginUser,
  doInitialLoad,
  logout,
};