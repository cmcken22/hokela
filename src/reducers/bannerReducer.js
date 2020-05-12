import { fromJS, toJS, Map, OrderedMap } from 'immutable';
import { handleActions } from 'redux-actions';
import * as bannerActions from '../actions/bannerActions';

const defaultState = fromJS({
  active: false,
  message: null,
  status: 'INFO',
  actions: null
});

export const reducer = handleActions({

  [bannerActions.SET_BANNER_MESSAGE]: (state, action) => {
    const { payload: { status, message, actions } } = action;
    return state
      .set('active', true)
      .set('message', message)
      .set('status', status)
      .set('actions', actions);
  },

  [bannerActions.CLEAR_BANNER]: (state, action) => {
    return state
      .set('active', false)
      .set('message', null)
      .set('status', null)
      .set('actions', null);
  },

}, defaultState)

export default reducer;
