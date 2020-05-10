import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App'

require('./styles/main.scss');

document.addEventListener('DOMContentLoaded', function () {
  render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>,
    document.getElementById('root')
  );
});
