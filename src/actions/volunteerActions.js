import axios from 'axios';
import { getBaseHeader } from '../utils';


export const SET_CAUSE_ID = 'volunteerActions__SET_CAUSE_ID';

export const applyToCause = (causeId, locationId) => (dispatch, getState) => {
  return new Promise(resolve => {
    const URL = `${process.env.API_URL}/cause-api/v1/apply`;
    const body = {
      cause_id: causeId,
      location_id: locationId
    };
  
    axios.post(URL, body, getBaseHeader())
      .then(res => {
        console.log('applyToCause res:', res);
        return resolve(true);
      })
      .catch(err => {
        console.log('applyToCause err:', err);
        return resolve(false);
      });
  });
}

export const checkIfUserAppliedToCause = (causeId, locationId) => (dispatch, getState) => {
  return new Promise(resolve => {
    const URL = `${process.env.API_URL}/cause-api/v1/apply?cause_id=${causeId}`;
    axios.get(URL, getBaseHeader())
      .then(res => {
        console.log('checkIfUserAppliedToCause res:', res);
        if (res.status === 200 && res.data) {
          return resolve(true);
        }
        return resolve(false);
      })
      .catch(err => {
        console.log('checkIfUserAppliedToCause err:', err);
        return resolve(false);
      });
  });
}

export const setCauseId = (causeId) => (dispatch, getState) => {
  dispatch({
    type: SET_CAUSE_ID,
    payload: {
      causeId
    }
  })
}