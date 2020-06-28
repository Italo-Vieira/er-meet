import { clickReducer } from './clickReducer';
import { combineReducers } from 'redux';
import { conferenceFoundReducer} from './clickReducer';
import users,* as fromUserById from './userById'
import page,* as fromPage from './page'

export const Reducers = combineReducers({
  clickState: clickReducer,
  users,
  conferenceFoundReducer,
  page
});

export const getAllUsers = (state) => fromUserById.getAllUsers(state.users );

export const getUserById = (state, id) => fromUserById.getUserById(state.users, id);

export const getCurrentPage = (state) => fromPage.getCurrentPage(state.page);