import axios from 'axios';
import { getBaseHeader } from '../utils';


export const SET_CAUSE = 'volunteerActions__SET_CAUSE';
export const CLEAR_CAUSE = 'volunteerActions__CLEAR_CAUSE';
export const SET_SUCCESSFULL_CAUSE = 'volunteerActions__SET_SUCCESSFULL_CAUSE';
export const CLEAR_SUCCESSFULL_CAUSE = 'volunteerActions__CLEAR_SUCCESSFULL_CAUSE';

export const applyToCause = (user, causeId, locationId) => (dispatch, getState) => {
  return new Promise(resolve => {
    const URL = `${process.env.API_URL}/cause-api/v1/apply`;
    const body = {
      cause_id: causeId,
      location_id: locationId,
      user
    };
  
    axios.post(URL, body, getBaseHeader())
      .then(res => {
        console.log('applyToCause res:', res);
        const currentCause = getState().getIn(['volunteer', 'cause']);
        dispatch(clearCause());
        dispatch(setSuccessfulCause(currentCause));
        return resolve(true);
      })
      .catch(err => {
        console.log('applyToCause err:', err);
        return resolve(false);
      });
  });
}

export const checkIfUserAppliedToCause = (causeId, email) => (dispatch, getState) => {
  return new Promise(resolve => {
    const URL = `${process.env.API_URL}/cause-api/v1/apply?cause_id=${causeId}&email=${email}`;
    axios.get(URL, getBaseHeader())
      .then(res => {
        console.log('checkIfUserAppliedToCause res:', res);
        if (res.status === 200 && res.data) {
          const { data: { locations, applied_all: appliedAll } } = res;
          return resolve({
            locations,
            appliedAll
          });
        }
        return resolve({
          locations: [],
          appliedAll: false
        });
      })
      .catch(err => {
        console.log('checkIfUserAppliedToCause err:', err);
        return resolve({
          locations: [],
          appliedAll: false
        });
      });
  });
}

export const setCause = (cause) => (dispatch, getState) => {
  dispatch({
    type: SET_CAUSE,
    payload: {
      cause
    }
  });
}

export const clearCause = () => (dispatch, getState) => {
  dispatch({ type: CLEAR_CAUSE });
}

export const setSuccessfulCause = (cause) => (dispatch, getState) => {
  dispatch({
    type: SET_SUCCESSFULL_CAUSE,
    payload: {
      cause
    }
  });
}

export const clearSuccessfulCause = () => (dispatch, getState) => {
  dispatch({ type: CLEAR_SUCCESSFULL_CAUSE });
}