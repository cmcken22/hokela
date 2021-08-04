import { fromJS, toJS, Map, OrderedMap } from 'immutable';
import { handleActions } from 'redux-actions';
import cookies from 'react-cookies';

import * as appActions from '../actions/appActions';

const getReadyState = () => {
  const ready = cookies.load('ready');
  if (!!ready && JSON.parse(ready) === true) return true;

  return window.location.origin.indexOf('localhost') !== -1 || window.location.origin.indexOf('test-hokela') !== -1 ? false : true;
}

const defaultState = fromJS({
  animate: false,
  mobile: false,
  currentPage: 'Home',
  cookiesAccepted: null,
  ready: getReadyState()
});

export const reducer = handleActions({

  [appActions.SET_ANIMATION_STATUS]: (state, action) => {
    const { value } = action;
    return state.set('animate', value);
  },

  [appActions.SET_MOBILE_VIEW]: (state, action) => {
    const { value } = action;
    return state.set('mobile', value);
  },

  [appActions.SET_CURRENT_PAGE]: (state, action) => {
    const { value } = action;
    return state.set('currentPage', value);
  },

  [appActions.ALLOW_COOKIES]: (state, action) => {
    const { value } = action;
    return state.set('cookiesAccepted', value);
  },

  [appActions.SET_READY]: (state, action) => {
    const { value } = action;
    return state.set('ready', value);
  },

}, defaultState)

export default reducer;
