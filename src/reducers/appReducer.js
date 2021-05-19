import { fromJS, toJS, Map, OrderedMap } from 'immutable';
import { handleActions } from 'redux-actions';
import * as appActions from '../actions/appActions';

const defaultState = fromJS({
  animate: false,
  mobile: false,
  currentPage: 'Home',
  cookiesAccepted: null
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

}, defaultState)

export default reducer;
