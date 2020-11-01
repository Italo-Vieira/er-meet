import { clickReducer } from './clickReducer';
import { combineReducers } from 'redux';
import { conferenceFoundReducer} from './clickReducer';
import users,* as fromUserById from './user'
import page,* as fromPage from './page'

export const Reducers = combineReducers({
  clickState: clickReducer,
  users,
  conferenceFoundReducer,
  page
});

let _userStore = {};

Object.values(fromUserById).map((f) => f.name).filter( name => name.startsWith("get")).forEach((fName) => {
  _userStore[fName] = (state, ...rest) => fromUserById[fName](state.users, ...rest)
});

export const userStore = _userStore;
export const getAllUsers = (state) => fromUserById.getAllUsers(state.users );

export const getUserById = (state, id) => fromUserById.getUserById(state.users, id);

export const getCurrentPage = (state) => fromPage.getCurrentPage(state.page);