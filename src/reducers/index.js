import { combineReducers } from 'redux-immutable';
import user from './userReducer';
import causes from './causeReducer';

export default combineReducers({
  user,
  causes
});