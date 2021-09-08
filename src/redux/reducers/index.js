import { combineReducers } from 'redux';
import userReducer from './user';
import playerReducer from './player';

const rootReducer = combineReducers({ userReducer, playerReducer });

export default rootReducer;
