import { fromJS, toJS, Map, OrderedMap } from 'immutable';
import { handleActions } from 'redux-actions';
import * as volunteerActions from '../actions/volunteerActions';

const defaultState = fromJS({
  causeId: null,
});

export const reducer = handleActions({

  [volunteerActions.SET_CAUSE_ID]: (state, action) => {
    const { payload: { causeId } } = action;
    return state.set('causeId', causeId);
  },

  // [volunteerActions.SET_MOBILE_VIEW]: (state, action) => {
  //   const { value } = action;
  //   return state.set('mobile', value);
  // },

  // [volunteerActions.SET_CURRENT_PAGE]: (state, action) => {
  //   const { value } = action;
  //   return state.set('currentPage', value);
  // },

}, defaultState)

export default reducer;
