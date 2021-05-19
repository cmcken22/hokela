import { List, fromJS } from "immutable";

import * as causeActions from '../actions/causeActions';
export const SET_FILTER_VALUE = 'filterActions__SET_FILTER_VALUE';
export const SET_FILTER_VALUES = 'filterActions__SET_FILTER_VALUES';
export const INIT_FILTERS = 'filterActions__INIT_FILTERS';
export const CLEAR_FILTER_VALUES = 'filterActions__CLEAR_FILTER_VALUES';
export const CLEAR_ALL_FILTERS = 'filterActions__CLEAR_ALL_FILTERS';

export const setFilterValue = (type, value) => (dispatch, getState) => {
  const currentValues = getState().getIn(['filter', type]);
  let nextValues = currentValues || new List();

  if (type === 'search') {
    nextValues = value;
  } else {
    if (nextValues.indexOf(value) === -1) {
      nextValues = nextValues.push(value);
    } else {
      nextValues = nextValues.filter(x => x !== value);
    }
  }

  dispatch({
    type: SET_FILTER_VALUE,
    payload: {
      field: type,
      data: nextValues
    }
  });
}

export const setFilterValues = (type, values) => (dispatch, getState) => {
  if (type !== 'search') {
    const nextValues = fromJS(values);
    console.clear();
    console.log('values:', values);
    console.log('nextValues:', nextValues);
    dispatch({
      type: SET_FILTER_VALUES,
      payload: {
        field: type,
        data: nextValues
      }
    });
  }

}

export const clearFilterValue = (type) => (dispatch, getState) => {
  dispatch({
    type: CLEAR_FILTER_VALUES,
    payload: {
      type
    }
  })
}

export const clearAllFilters = () => (dispatch, getState) => {
  dispatch({ type: CLEAR_ALL_FILTERS });
}

export const generateQuery = () => (dispatch, getState) => {
  const currentValues = getState().get('filter');

  const keyMap = {
    locations: 'locations',
    organizations: 'organization',
    sectors: 'sector',
    timeOfDays: 'time_of_day',
    durations: 'duration',
    skills: 'skill',
    ages: 'ages',
    weekDays: 'days',
    idealFor: 'ideal_for',
    search: 'search'
  };

  const encode = (key, data) => {
    if (key === 'locations') {
      data = data.toJS();
      let res = '';
      for (let i = 0; i < data.length; i++) {
        const elm = data[i].replace(', ', ',');
        if (!res) res = `"${elm}"`;
        else res += `,"${elm}"`;
      }
      return `[${res}]`;
    }
    return encodeURIComponent(data.join(','));
  }

  let query = '';
  currentValues && currentValues.entrySeq().forEach(([key, data]) => {
    if (key === 'search') {
      if (!query && data.length) query = `${keyMap[key]}=${encodeURIComponent(data)}`;
      else if (data.length) query += `&${keyMap[key]}=${encodeURIComponent(data)}`;
    } else {
      if (!query && data.size) query = `${keyMap[key]}=${encode(key, data)}`;
      else if (data.size) query += `&${keyMap[key]}=${encode(key, data)}`;
    }
  });
  console.log('query:', query);

  return query;
}

export const performSearch = () => (dispatch, getState) => {
  const query = dispatch(generateQuery());
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