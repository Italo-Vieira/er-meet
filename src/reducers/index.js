import { clickReducer } from './clickReducer';
import { combineReducers } from 'redux';
import { conferenceFoundReducer} from './clickReducer';
import users,* as fromUserById from './userById'

export const Reducers = combineReducers({
  clickState: clickReducer,
  users,
  conferenceFoundReducer
});

export const getAllUsers = (state) => fromUserById.getAllUsers(state.users );

export const getUserById = (state, id) => fromUserById.getUserById(state.users, id);