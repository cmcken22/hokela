import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import * as loadingActions from '../actions/loadingActions';

const defaultState = fromJS({});

export const reducer = handleActions({

  [loadingActions.SET_LOADING]: (state, action) => {
    const { payload: { type, value } } = action;

    let nextState = state;
    if (value) {
      nextState = nextState.set(type, value);
    } else {
      nextState = nextState.delete(type);
    }
    return nextState;
  },

}, defaultState)

export default reducer;
