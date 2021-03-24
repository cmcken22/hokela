import { List, fromJS } from "immutable";

import * as causeActions from '../actions/causeActions';
export const SET_FILTER_VALUE = 'filterActions__SET_FILTER_VALUE';
export const INIT_FILTERS = 'filterActions__INIT_FILTERS';

export const setFilterValue = (type, value) => (dispatch, getState) => {
  // console.clear();
  // console.log('type:', type);
  // console.log('value:', value);
  const currentValues = getState().getIn(['filter', type]);
  // console.log('currentValues:', currentValues);

  let nextValues = currentValues || new List();
  // console.log('nextValues:', nextValues);

  if (nextValues.indexOf(value) === -1) {
    nextValues = nextValues.push(value);
  } else {
    nextValues = nextValues.filter(x => x !== value);
  }

  // console.log('nextValues:', nextValues);

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
    locations: 'locations',
    organizations: 'organization'
  };

  const encode = (key, data) => {
    if (key === 'locations') {
      data = data.toJS();
      let res = '';
      console.log('data:', data);
      for (let i = 0; i < data.length; i++) {
        const elm = data[i].replace(' ', '');
        console.log('elm:', elm);
        if (!res) res = `"${elm}"`;
        else res += `,"${elm}"`;
      }
      console.log('res:', res);
      
      return `[${res}]`;
    }
    return encodeURIComponent(data.join(','));
  }

  let query = '';
  currentValues && currentValues.entrySeq().forEach(([key, data]) => {
    // console.log(keyMap[key], data);
    if (!query && data.size) query = `${keyMap[key]}=${encode(key, data)}`;
    else if (data.size) query += `&${keyMap[key]}=${encode(key, data)}`;
  });
  console.log('query:', query);

  dispatch(causeActions.getCauses("ACTIVE,IN_REVIEW,REJECTED", query));
}

export const loadFiltersFromStorage = () => (dispatch, getState) => {
  const storage = window.localStorage;
  const values = storage.getItem('filters');
  if (!!values) {
    // dispatch({
    //   type: INIT_FILTERS,
    //   payload: {
    //     data: fromJS(JSON.parse(values))
    //   }
    // })
  }
}