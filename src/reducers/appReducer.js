import { fromJS, toJS, Map, OrderedMap } from 'immutable';
import { handleActions } from 'redux-actions';
import * as appActions from '../actions/appActions';

const defaultState = fromJS({
  animate: false,
});

export const reducer = handleActions({

  [appActions.SET_ANIMATION_STATUS]: (state, action) => {
    const { value } = action;
    return state.set('animate', value);
  },

}, defaultState)

export default reducer;
