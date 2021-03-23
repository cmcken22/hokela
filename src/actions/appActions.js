export const SET_ANIMATION_STATUS = 'appActions__SET_ANIMATION_STATUS';
export const SET_MOBILE_VIEW = 'appActions__SET_MOBILE_VIEW';

export const setAnimationStatus = (value) => (dispatch, getState) => {
  dispatch({
    type: SET_ANIMATION_STATUS,
    value
  });
}

export const setMobileView = (value) => (dispatch, getState) => {
  dispatch({
    type: SET_MOBILE_VIEW,
    value
  });
}