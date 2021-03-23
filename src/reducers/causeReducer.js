import { fromJS, Map, OrderedMap } from 'immutable';
import { handleActions } from 'redux-actions';
import * as causeActions from '../actions/causeActions';

const defaultState = fromJS({
  "ALL": {},
  "HOKELA": {},
  "LATEST": {},
  info: {}
});

export const reducer = handleActions({

  [causeActions.INIT_CAUSES]: (state, action) => {
    const { payload: { causes, type } } = action;
    let nextCauses = new OrderedMap({});
    if (causes && causes.length) {
      causes && causes.forEach(cause => {
        nextCauses = nextCauses.set(cause._id, fromJS(cause));
      });
    }
    return state.set(type, nextCauses);
  },

  [causeActions.ADD_CAUSE]: (state, action) => {
    const { payload: { cause } } = action;
    return state.set(cause._id, fromJS(cause));
  },

  [causeActions.DELETE_CAUSE]: (state, action) => {
    const { payload: { id } } = action;
    return state.delete(id);
  },

  [causeActions.SET_APPLICANTS]: (state, action) => {
    const { payload: { causeId, applicants } } = action;
    return state.setIn([causeId, 'applicants'], applicants);
  },

  [causeActions.UPDATE_APPLICANT]: (state, action) => {
    const { payload: { causeId, applicantId, applicant } } = action;
    return state.setIn([causeId, 'applicants', applicantId], fromJS(applicant));
  },

  [causeActions.UPDATE_CAUSE]: (state, action) => {
    const { payload: { cause } } = action;
    const currentCause = state.get(cause._id).toJS();
    const nextCause = {
      ...currentCause,
      ...cause
    };
    return state.set(cause._id, fromJS(nextCause));
  },

  [causeActions.UPDATE_TEMP_CAUSE]: (state, action) => {
    const { payload: { fieldName, value } } = action;
    // const currentCause = state.get(cause._id).toJS();
    // const nextCause = {
    //   ...currentCause,
    //   ...cause
    // };
    return state.setIn(["TEMP_ID", fieldName], value);
  },

  [causeActions.DELETE_TEMP_CAUSE]: (state, action) => {
    return state.delete('TEMP_ID');
  },

  [causeActions.SET_GENERAL_INFO]: (state, action) => {
    const { payload: { fieldName, data } } = action;
    return state.setIn(['info', fieldName], fromJS(data));
  },

}, defaultState)

export default reducer;
