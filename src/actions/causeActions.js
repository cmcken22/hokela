import axios from 'axios';
import { urlencoded } from 'body-parser';
import { fromJS, OrderedMap } from 'immutable';
import { getBaseHeader } from '../utils';

export const INIT_CAUSES = 'causeActions__INIT_CAUSES';
export const ADD_CAUSE = 'causeActions__ADD_CAUSE';
export const DELETE_CAUSE = 'causeActions__DELETE_CAUSE';
export const SET_APPLICANTS = 'causeActions__SET_APPLICANTS';
export const UPDATE_APPLICANT = 'causeActions__UPDATE_APPLICANT';
export const UPDATE_CAUSE = 'causeActions__UPDATE_CAUSE';
export const UPDATE_TEMP_CAUSE = 'causeActions__UPDATE_TEMP_CAUSE';
export const DELETE_TEMP_CAUSE = 'causeActions__DELETE_TEMP_CAUSE';
export const SET_GENERAL_INFO = 'causeActions__SET_GENERAL_INFO';

export const getCauses = (status = "ACTIVE,IN_REVIEW,REJECTED", query = null) => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    let URL = `${process.env.API_URL}/cause-api/v1/causes?status=${status}`;
    if (!!query) URL = `${URL}&${query}`;

    console.log('URL:', URL);
    
    axios.get(URL, getBaseHeader())
      .then(res => {
        console.log('GET CAUSES RES:', res);
        const { data } = res;
        dispatch({
          type: INIT_CAUSES,
          payload: {
            causes: data,
            type: "ALL"
          }
        });
        return resolve(res.data);
      })
      .catch(err => {
        console.log('GET CAUSES ERR:', err);
        return reject();
      });
  });
}

export const getCauseById = (id) => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    let URL = `${process.env.API_URL}/cause-api/v1/causes/${id}`;
    console.clear();
    console.log('URL:', URL);
    
    axios.get(URL, getBaseHeader())
      .then(res => {
        console.log('GET CAUSES RES:', res);
        const { data } = res;
        return resolve(data);
      })
      .catch(err => {
        console.log('GET CAUSES ERR:', err);
        return reject();
      });
  });
}

export const getHokelaCauses = (status = "ACTIVE,IN_REVIEW,REJECTED") => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    const URL = `${process.env.API_URL}/cause-api/v1/causes?status=${status}&organization=Hokela Technologies`;
    axios.get(URL, getBaseHeader())
      .then(res => {
        console.log('GET HOKELA CAUSES RES:', res);
        const { data } = res;
        dispatch({
          type: INIT_CAUSES,
          payload: {
            causes: data,
            type: "HOKELA"
          }
        });
        return resolve(res.data);
      })
      .catch(err => {
        console.log('GET CAUSES ERR:', err);
        return reject();
      });
  });
}

export const addCause = (cause) => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {  
    const body = {
      ...cause
    };

    // console.clear();
    console.log('URL:', `${process.env.API_URL}/cause-api/v1/causes`);
    console.log('CAUSE:', cause);
    console.log('body:', body);

    axios.post(`${process.env.API_URL}/cause-api/v1/causes`, body, getBaseHeader())
      .then(res => {
        console.log('ADD CAUSE RES:', res);
        if (res && res.data) {
          const { data: newCuase } = res;
          // dispatch({
          //   type: ADD_CAUSE,
          //   payload: {
          //     cause: newCuase
          //   }
          // });
          dispatch(getHokelaCauses());
          dispatch(getCauses());
          return resolve(newCuase);
        }
        return reject();
      })
      .catch(err => {
        console.log('ADD CAUSE ERR:', err);
        return reject();
      });
  });
}

export const deleteTempCause = () => (dispatch, getState) => {
  dispatch({
    type: DELETE_TEMP_CAUSE,
  });
}

export const deleteCause = (id) => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    const body = {
      status: 'ARCHIVED'
    };
    axios.patch(`${process.env.API_URL}/cause-api/v1/causes/${id}`, body, getBaseHeader())
      .then(res => {
        console.log('DELETE CAUSE RES:', res);
        if (res && res.data) {
          dispatch({
            type: DELETE_CAUSE,
            payload: {
              id: id
            }
          });
          return resolve();
        }
        return reject();
      })
      .catch(err => {
        console.log('DELETE CAUSE ERR:', err);
        return reject();
      });
  });
}

export const applyToCause = (id) => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    const body = {
      cause_id: id
    };

    axios.post(`${process.env.API_URL}/cause-api/v1/volunteer`, body, getBaseHeader())
      .then(res => {
        console.log('APPLY TO CAUSE RES:', res);
        if (res && res.data) {
          const { data } = res;
          dispatch({
            type: UPDATE_APPLICANT,
            payload: {
              causeId: id,
              applicantId: data._id,
              applicant: data,
            }
          })
          return resolve();
        }
        return reject();
      })
      .catch(err => {
        console.log('APPLY TO CAUSE ERR:', err);
        return reject();
      });
  });
}

export const getAllApplicants = () => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    let causes = getState().get('causes');
    if (!causes) return resolve();

    causes = causes.toJS();
    const entries = Object.entries(causes);
    if (!entries || entries.length === 0) return resolve();

    for (let i = 0; i < entries.length; i++) {
      const [id] = entries[i];
      let applicants = await dispatch(getApplicants(id));
      if (applicants && applicants.length) {
        let nextApplicants = new OrderedMap({});
        applicants.forEach(applicant => {
          nextApplicants = nextApplicants.set(applicant._id, fromJS(applicant));
        });
        dispatch({
          type: SET_APPLICANTS,
          payload: {
            causeId: id,
            applicants: nextApplicants
          }
        });
      }
    }
    return resolve();
  });
}

export const getApplicants = (id, status) => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    let url = `${process.env.API_URL}/cause-api/v1/volunteer?cause_id=${id}`;
    if (status) {
      url = `${url}&status=${status}`;
    }
    axios.get(url, getBaseHeader())
      .then(res => {
        console.log('GET APPLICANTS RES:', res);
        if (res && res.data) {
          return resolve(res.data);
        }
        return reject();
      })
      .catch(err => {
        console.log('GET APPLICANTS ERR:', err);
        return reject();
      });
  });
}

export const acceptApplicant = (causeId, applicantId) => (dispatch, getState) => {
  dispatch(updateApplicant(causeId, applicantId, 'ACCEPTED'));
}

export const rejectApplicant = (causeId, applicantId) => (dispatch, getState) => {
  dispatch(updateApplicant(causeId, applicantId, 'REJECTED'));
}

export const updateApplicant = (causeId, applicantId, status) => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    const body = {
      cause_id: causeId,
      status
    };

    axios.patch(`${process.env.API_URL}/cause-api/v1/volunteer/${applicantId}`, body, getBaseHeader())
      .then(res => {
        console.log('UPDATED APPLICANT RES:', res);
        if (res && res.data && res.data._id) {
          const { data } = res;
          dispatch({
            type: UPDATE_APPLICANT,
            payload: {
              causeId,
              applicantId,
              applicant: data,
            }
          })
          return resolve();
        }
        return resolve();
      })
      .catch(err => {
        console.log('UPDATED APPLICANT ERR:', err);
        return reject();
      });
  });
}

export const approveCause = (causeId) => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    const data = {
      status: 'ACTIVE'
    };
    const res = await dispatch(updateCause(causeId, data));
    resolve(res);
  });
}

export const rejectCause = (causeId) => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    const data = {
      status: 'REJECTED'
    };
    const res = await dispatch(updateCause(causeId, data));
    resolve(res);
  });
}

export const updateCause = (causeId, data) => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    const body = {
      ...data
    };

    axios.patch(`${process.env.API_URL}/cause-api/v1/causes/${causeId}`, body, getBaseHeader())
      .then(res => {
        console.log('UPDATED CAUSE RES:', res);
        if (res && res.data && res.data._id) {
          const { data } = res;
          // dispatch({
          //   type: UPDATE_CAUSE,
          //   payload: {
          //     cause: data,
          //   }
          // })
          return resolve(data);
        }
        return resolve();
      })
      .catch(err => {
        console.log('UPDATED CAUSE ERR:', err);
        return reject();
      });
  });
}

export const updateTempCause = (fieldName, value) => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    dispatch({
      type: UPDATE_TEMP_CAUSE,
      payload: {
        fieldName: fieldName,
        value: value
      }
    })
  });
}

export const uploadFile = (file, org, type) => (dispatch, getState) => {
  return new Promise(async (resolve) => {
    const formData = new FormData();
    const fileName = file.name.split(' ').join('');
    file.originalFilename = fileName;
    formData.append('file', file, file.originalFilename);

    const URL = `${process.env.API_URL}/cause-api/v1/causes/upload-image?org=${encodeURIComponent(org)}&type=${type}&name=${fileName}`;
    await axios.post(URL, formData, getBaseHeader())
      .then((res) => {
        console.log('res:', res);
        if (res.status === 200 && res.data) {
          const { data } = res;
          return resolve(data);
        }
        return resolve(false);
      })
      .catch((err) => {
        console.log('ERROR uploading file:', err);
        return resolve(false);
      });
  });
}

export const getTypeAheadOptions = () => (dispatch, getState) => {
  return new Promise(async (resolve) => {
    const URL1 = `${process.env.API_URL}/cause-api/v1/causes/info?field=organization`;
    const URL2 = `${process.env.API_URL}/cause-api/v1/causes/info?field=locations`;

    const promise1 = axios.get(URL1, getBaseHeader());
    const promise2 = axios.get(URL2, getBaseHeader());

    let res = {
      organizations: [],
      cities: [],
      provinces: [],
      countries: [],
    };
    
    Promise.all([promise1, promise2]).then((values) => {
      // console.clear();
      // console.log('values:', values);
      for (let i = 0; i < values.length; i++) {
        const value = values[i];
        if (value.status === 200) {
          if (i === 0) {
            res = {
              ...res,
              organizations: [...value.data]
            }
          }
          if (i === 1) {
            // console.log('value:', value);
            const { cities, provinces, countries, addresses } = value.data;
            // console.log('cities:', cities);
            // console.log('provinces:', provinces);
            // console.log('countries:', countries);
            // console.log('addresses:', addresses);
            res = {
              ...res,
              cities,
              provinces,
              countries,
              addresses
            }
          }
        }
      }

      dispatch({
        type: SET_GENERAL_INFO,
        payload: {
          fieldName: 'organizations',
          data: res.organizations
        }
      });
      dispatch({
        type: SET_GENERAL_INFO,
        payload: {
          fieldName: 'cities',
          data: res.cities
        }
      });
      dispatch({
        type: SET_GENERAL_INFO,
        payload: {
          fieldName: 'provinces',
          data: res.provinces
        }
      });
      dispatch({
        type: SET_GENERAL_INFO,
        payload: {
          fieldName: 'countries',
          data: res.countries
        }
      });
      dispatch({
        type: SET_GENERAL_INFO,
        payload: {
          fieldName: 'addresses',
          data: res.addresses
        }
      });

      return resolve(res);
    });
  });
}