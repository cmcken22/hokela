import { combineReducers } from 'redux-immutable';
import app from './appReducer';
import user from './userReducer';
import causes from './causeReducer';
import banner from './bannerReducer';
import filter from './filterReducer';
import volunteer from './volunteerReducer';
import loading from './loadingReducer';

export default combineReducers({
  app,
  user,
  causes,
  banner,
  filter,
  volunteer,
  loading
});