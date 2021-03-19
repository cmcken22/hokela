export const SET_ANIMATION_STATUS = 'appActions__SET_ANIMATION_STATUS';

export const setAnimationStatus = (value) => (dispatch, getState) => {
  dispatch({
    type: SET_ANIMATION_STATUS,
    value
  });
}