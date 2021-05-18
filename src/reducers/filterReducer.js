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
    const storage = window.localStorage;
    storage.setItem('filters', JSON.stringify(nextState.toJS()));
    return nextState;
  },

  [filterActions.CLEAR_FILTER_VALUES]: (state, action) => {
    const { payload: { type } } = action;
    return state.delete(type);
  }

}, defaultState)

export default reducer;
