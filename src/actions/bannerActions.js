import React from 'react';

export const SET_BANNER_MESSAGE = 'bannerActions__SET_BANNER_MESSAGE';
export const CLEAR_BANNER = 'bannerActions__CLEAR_BANNER';

export const setMessage = (message, actions, options = {}) => (dispatch, getState) => {
  // let [beggining, middle, end] = message.split(/(\@\{\{[A-z\s]+\}\})/g);
  // if (beggining && middle && end) {
  //   middle = middle.replace(/[@\{\}]/g, '');
  //   formattedMessage = () => (
  //     <span>
  //       {beggining}&nbsp;
  //       <a className="banner__action" onClick={action}>
  //         {middle}
  //       </a>
  //       &nbsp;{end}
  //     </span>
  //   );
  // }

  const nextOptions = {
    delay: 0,
    status: 'INFO',
    ...options
  };
  setTimeout(() => {
    dispatch({
      type: SET_BANNER_MESSAGE,
      payload: {
        status: nextOptions.status,
        message,
        actions
      }
    });
  }, nextOptions.delay);
}

export const clearBanner = () => (dispatch, getState) => {
  dispatch({
    type: CLEAR_BANNER
  });
}