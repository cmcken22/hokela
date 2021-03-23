import { fromJS, toJS, Map, OrderedMap } from 'immutable';
import { handleActions } from 'redux-actions';
import * as filterActions from '../actions/filterActions';

const defaultState = fromJS({
  locations: ["Remote"]
});

export const reducer = handleActions({

  [filterActions.SET_FILTER_VALUE]: (state, action) => {
    const { payload: { field, data } } = action;
    console.log(field, data);
    return state.set(field, data);
  },

  // [appActions.SET_MOBILE_VIEW]: (state, action) => {
  //   const { value } = action;
  //   return state.set('mobile', value);
  // },

}, defaultState)

export default reducer;
