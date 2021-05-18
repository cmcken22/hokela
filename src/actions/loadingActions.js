export const SET_LOADING = 'loadingActions__SET_LOADING';

export const setLoading = (type, value) => (dispatch, getState) => {
  dispatch({
    type: SET_LOADING,
    payload: {
      type,
      value
    }
  });
}