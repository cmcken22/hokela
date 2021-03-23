import { combineReducers } from 'redux-immutable';
import app from './appReducer';
import user from './userReducer';
import causes from './causeReducer';
import banner from './bannerReducer';
import filter from './filterReducer';

export default combineReducers({
  app,
  user,
  causes,
  banner,
  filter
});