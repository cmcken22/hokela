import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { getBaseHeader } from '../utils';
import cookies from 'react-cookies';

export const INIT_USER_INFO = 'userActions__INIT_USER_INFO';
export const SET_USER_INFO = 'userActions__SET_USER_INFO';
export const CLEAR_USER_INFO = 'userActions__CLEAR_USER_INFO';

export const initUserInfo = (accessToken) => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    const { email, name, scopes } = jwt_decode(accessToken);
    let isAdmin = false;
    if (scopes) isAdmin = scopes.some(scope => scope === 'ROLE_ADMIN');

    dispatch({
      type: INIT_USER_INFO,
      payload: {
        email,
        name,
        isAdmin
      }
    });
    return resolve();
  });
}

export const setUserInfo = (userInfo) => (dispatch, getState) => {
  return new Promise((resolve) => {
    const { email, accessToken } = userInfo;
    cookies.save('email', email, { path: '/' });
    cookies.save('accessToken', accessToken, { path: '/' });

    dispatch({
      type: SET_USER_INFO,
      payload: {
        ...userInfo
      }
    })
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
