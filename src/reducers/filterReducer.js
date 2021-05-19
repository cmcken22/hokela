import { fromJS, toJS, Map, OrderedMap } from 'immutable';
import { handleActions } from 'redux-actions';
import * as filterActions from '../actions/filterActions';

const defaultState = fromJS({

});

export const reducer = handleActions({

  [filterActions.INIT_FILTERS]: (state, action) => {
    const { payload: { data } } = action;
    return data;
  },

  [filterActions.SET_FILTER_VALUE]: (state, action) => {
    const { payload: { field, data } } = action;
    const nextState = state.set(field, data);
    return nextState;
  },

  [filterActions.SET_FILTER_VALUES]: (state, action) => {
    const { payload: { field, data } } = action;
    const nextState = state.set(field, data);
    return nextState;
  },

  [filterActions.CLEAR_FILTER_VALUES]: (state, action) => {
    const { payload: { type } } = action;
    return state.delete(type);
  },

  [filterActions.CLEAR_ALL_FILTERS]: (state, action) => {
    return defaultState;
  }

}, defaultState)

export default reducer;
