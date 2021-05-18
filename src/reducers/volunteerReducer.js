import { fromJS, toJS, Map, OrderedMap } from 'immutable';
import { handleActions } from 'redux-actions';
import * as volunteerActions from '../actions/volunteerActions';

const defaultState = fromJS({
  cause: null,
  successfullCause: null,
  failedCause: null,
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

  [volunteerActions.SET_FAILED_CAUSE]: (state, action) => {
    const { payload: { cause } } = action;
    return state.set('failedCause', cause);
  },

  [volunteerActions.CLEAR_FAILED_CAUSE]: (state, action) => {
    return state.delete('failedCause');
  },

}, defaultState)

export default reducer;
