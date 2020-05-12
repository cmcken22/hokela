import { fromJS, Map } from 'immutable';
import { handleActions } from 'redux-actions';
import * as userActions from '../actions/userActions';

const defaultState = fromJS({
  email: null,
  name: null,
  isAdmin: false
});

export const reducer = handleActions({

  [userActions.INIT_USER_INFO]: (state, action) => {
    const { payload: { email, name, isAdmin } } = action;
    return state.set('email', email).set('name', name).set('isAdmin', isAdmin);
  },

  [userActions.CLEAR_USER_INFO]: (state, action) => {
    return defaultState;
  }

}, defaultState)

export default reducer;
