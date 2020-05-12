import { combineReducers } from 'redux-immutable';
import user from './userReducer';
import causes from './causeReducer';
import banner from './bannerReducer';

export default combineReducers({
  user,
  causes,
  banner
});