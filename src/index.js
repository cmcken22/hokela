import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Map } from 'immutable';

import './index.css';
import App from './App';
import configureStore from './store';

require('./styles/main.scss');

const initialState = Map({});
const store = configureStore(initialState);

document.addEventListener('DOMContentLoaded', () => {
  render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
});

export default store;
