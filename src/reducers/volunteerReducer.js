import { fromJS, toJS, Map, OrderedMap } from 'immutable';
import { handleActions } from 'redux-actions';
import * as volunteerActions from '../actions/volunteerActions';

const defaultState = fromJS({
  cause: null,
  successfullCause: null
});

export const reducer = handleActions({

  [volunteerActions.SET_CAUSE]: (state, action) => {
    const { payload: { cause } } = action;
    return state.set('cause', cause);
  },

  [volunteerActions.CLEAR_CAUSE]: (state, action) => {
    return state.delete('cause');
  },

  [volunteerActions.SET_SUCCESSFULL_CAUSE]: (state, action) => {
    const { payload: { cause } } = action;
    return state.set('successfullCause', cause);
  },

  [volunteerActions.CLEAR_SUCCESSFULL_CAUSE]: (state, action) => {
    return state.delete('successfullCause');
  },

}, defaultState)

export default reducer;
