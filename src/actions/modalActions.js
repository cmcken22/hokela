export const TOGGLE_MODAL = 'modalActions__TOGGLE_MODAL';

export const toggleModal = (modalName, value = true) => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_MODAL,
    modalName,
    value
  });
}
