import { clickReducer } from './clickReducer';
import { combineReducers } from 'redux';
import { conferenceFoundReducer, userJoinedReducer } from './clickReducer';

export const Reducers = combineReducers({
  clickState: clickReducer,
  conferenceFoundReducer,
  usersState: userJoinedReducer
});