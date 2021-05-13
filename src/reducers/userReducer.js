import { fromJS, Map } from 'immutable';
import { handleActions } from 'redux-actions';
import * as userActions from '../actions/userActions';

const defaultState = fromJS({
  email: null,
  firstName: null,
  lastName: null,
  accessToken: null
});

export const reducer = handleActions({

  [userActions.INIT_USER_INFO]: (state, action) => {
    const { payload: { email, name, isAdmin } } = action;
    return state
      .set('email', email)
      .set('name', name)
      .set('isAdmin', isAdmin);
  },

  [userActions.SET_USER_INFO]: (state, action) => {
    const { payload: { email, firstName, lastName, accessToken } } = action;
    return state
      .set('email', email)
      .set('firstName', firstName)
      .set('lastName', lastName)
      .set('accessToken', accessToken);
  },

  [userActions.SET_ADMIN_STATUS]: (state, action) => {
    const { payload: { isAdmin } } = action;
    return state.set('isAdmin', isAdmin);
  },

  [userActions.CLEAR_USER_INFO]: (state, action) => {
    return defaultState;
  }

}, defaultState)

export default reducer;
