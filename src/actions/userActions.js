import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { getBaseHeader } from '../utils';
import cookies from 'react-cookies';

export const INIT_USER_INFO = 'userActions__INIT_USER_INFO';
export const SET_USER_INFO = 'userActions__SET_USER_INFO';
export const SET_ADMIN_STATUS = 'userActions__SET_ADMIN_STATUS';
export const CLEAR_USER_INFO = 'userActions__CLEAR_USER_INFO';

export const initUserInfo = (accessToken) => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    const { email, name } = jwt_decode(accessToken);
    // let isAdmin = false;
    // if (scopes) isAdmin = scopes.some(scope => scope === 'ROLE_ADMIN');
    dispatch(detectAdmin());

    dispatch({
      type: INIT_USER_INFO,
      payload: {
        email,
        name,
        // isAdmin
      }
    });
    return resolve();
  });
}

export const detectAdmin = () => (dispatch, getState) => {
  axios.get(`${process.env.API_URL}/cause-api/v1/auth`, getBaseHeader())
    .then(res => {
      console.clear();
      console.log('res:', res);
      dispatch({
        type: SET_ADMIN_STATUS,
        payload: {
          isAdmin: res.data
        }
      });
    })
    .catch(err => {
      console.log('err:', err);
    })
}

export const setUserInfo = (userInfo) => (dispatch, getState) => {
  return new Promise((resolve) => {
    const { email, accessToken } = userInfo;
    cookies.save('email', email, { path: '/' });
    cookies.save('accessToken', accessToken, { path: '/' });
    
    dispatch(detectAdmin());

    dispatch({
      type: SET_USER_INFO,
      payload: {
        ...userInfo
      }
    });
    return resolve();
  });
}

export const cleaUserInfo = () => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    cookies.remove('email', { path: '/' });
    cookies.remove('accessToken', { path: '/' });

    dispatch({
      type: CLEAR_USER_INFO,
    });
    return resolve();
  });
}
