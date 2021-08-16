import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import * as modalActions from '../actions/modalActions';

const defaultState = fromJS({
  activeModal: null
});

export const reducer = handleActions({

  [modalActions.TOGGLE_MODAL]: (state, action) => {
    const { modalName, value } = action;
    if (value) return state.set('activeModal', modalName);
    return state.set('activeModal', null);
  }

}, defaultState)

export default reducer;
