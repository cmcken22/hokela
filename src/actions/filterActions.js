import { List } from "immutable";

import * as causeActions from '../actions/causeActions';
export const SET_FILTER_VALUE = 'filterActions__SET_FILTER_VALUE';

export const setFilterValue = (type, value) => (dispatch, getState) => {
  console.clear();
  console.log('type:', type);
  console.log('value:', value);
  const currentValues = getState().getIn(['filter', type]);
  console.log('currentValues:', currentValues);

  let nextValues = currentValues || new List();
  console.log('nextValues:', nextValues);

  if (nextValues.indexOf(value) === -1) {
    nextValues = nextValues.push(value);
  } else {
    nextValues = nextValues.filter(x => x !== value);
  }

  console.log('nextValues:', nextValues);

  dispatch({
    type: SET_FILTER_VALUE,
    payload: {
      field: type,
      data: nextValues
    }
  });
}

export const performSearch = () => (dispatch, getState) => {
  const currentValues = getState().get('filter');
  console.clear();
  console.log('currentValues:', currentValues);

  const keyMap = {
    locations: 'location',
    organizations: 'organization'
  };

  let query = '';
  currentValues && currentValues.entrySeq().forEach(([key, data]) => {
    console.log(keyMap[key], data);
    if (!query && data.size) query = `${keyMap[key]}=${encodeURIComponent(data.join(','))}`;
    else if (data.size) query += `&${keyMap[key]}=${encodeURIComponent(data.join(','))}`;
  });
  console.log('query:', query);

  dispatch(causeActions.getCauses("ACTIVE,IN_REVIEW,REJECTED", query));

}