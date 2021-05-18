import { fromJS, toJS, Map, OrderedMap } from 'immutable';
import { handleActions } from 'redux-actions';
import * as volunteerActions from '../actions/volunteerActions';

const defaultState = fromJS({
  cause: null,
});

export const reducer = handleActions({

  [volunteerActions.SET_CAUSE]: (state, action) => {
    const { payload: { cause } } = action;
    return state.set('cause', cause);
  },

  [volunteerActions.CLEAR_CAUSE]: (state, action) => {
    return state.delete('cause');
  },

}, defaultState)

export default reducer;
