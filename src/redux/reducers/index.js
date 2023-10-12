import {combineReducers} from 'redux';
import UserReducer from './UserReducer';
import AppReducer from './AppReducer';

export default combineReducers({
  UserReducer,
  AppReducer
});
