import { fromJS, List, Map, OrderedMap } from 'immutable';
import { handleActions } from 'redux-actions';
import * as causeActions from '../actions/causeActions';

const defaultState = fromJS({
  "ALL": {
    pages: [],
    currentPage: 0
  },
  "HOKELA": {
    pages: [],
    currentPage: 0
  },
  "LATEST": {
    pages: [],
    currentPage: 0
  },
  info: {}
});

export const reducer = handleActions({

  [causeActions.INIT_CAUSES]: (state, action) => {
    const { payload: { type, causes, nextPageToken, metaData } } = action;
    let nextCauses = new OrderedMap({});
    if (causes && causes.length) {
      causes && causes.forEach(cause => {
        nextCauses = nextCauses.set(cause._id, fromJS(cause));
      });
    }

    let currentPages = state.getIn([type, 'pages']) || new List();
    currentPages = currentPages.push(fromJS({
      docs: nextCauses,
      nextPageToken,
      metaData
    }));

    return state
      .setIn([type, 'pages'], currentPages)
      .setIn([type, 'currentPage'], metaData.page - 1);
  },

  [causeActions.SET_FEATURED_CAUSES]: (state, action) => {
    const { payload: { type, causes } } = action;
    let nextCauses = new OrderedMap({});
    if (causes && causes.length) {
      causes && causes.forEach(cause => {
        nextCauses = nextCauses.set(cause._id, fromJS(cause));
      });
    }

    return state.setIn(['featured', type], nextCauses);
  },

  [causeActions.ADD_CAUSES]: (state, action) => {
    const { payload: { type, causes, nextPageToken, metaData } } = action;
    let currentCauses = state.getIn(['ALL', 'docs']) || new OrderedMap({});

    let nextCauses = new OrderedMap({});
    if (causes && causes.length) {
      causes && causes.forEach(cause => {
        nextCauses = nextCauses.set(cause._id, fromJS(cause));
      });
    }

    let currentPages = state.getIn([type, 'pages']) || new List();
    currentPages = currentPages.push(fromJS({
      docs: nextCauses,
      nextPageToken,
      metaData
    }));

    return state
      .setIn([type, 'pages'], currentPages)
      .setIn([type, 'currentPage'], metaData.page - 1);
  },

  [causeActions.UPDATE_PAGE]: (state, action) => {
    const { payload: { type, page } } = action;
    return state.setIn([type, 'currentPage'], page);
  },

  [causeActions.CLEAR_PAGES]: (state, action) => {
    const { payload: { type } } = action;
    return state
      .setIn([type, 'pages'], new List())
      .setIn([type, 'currentPage'], 0);
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
