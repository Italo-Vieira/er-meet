import { clickReducer } from './clickReducer';
import { combineReducers } from 'redux';
import { conferenceFoundReducer} from './clickReducer';
import users,* as fromUserById from './user'
import page,* as fromPage from './page'
import ui, * as fromUI from './ui'
import conference, * as fromConference from './conference'

export const Reducers = combineReducers({
  clickState: clickReducer,
  users,
  conferenceFoundReducer,
  page,
  ui,
  conference
});

let _userStore = {};

Object.values(fromUserById).map((f) => f?.name).filter( name => name.startsWith("get")).forEach((fName) => {
  _userStore[fName] = (state, ...rest) => fromUserById[fName](state.users, ...rest)
});

export const userSelectors = _userStore;

export const getAllUsers = (state) => fromUserById.getAllUsers(state.users );

export const getUserById = (state, id) => fromUserById.getUserById(state.users, id);

/* Page selectors */
export const getCurrentPage = (state) => fromPage.getCurrentPage(state.page);

/* UI selectors */
export const getPartListState = (state) => fromUI.getPartListState(state.ui); 

export const getConferenceId = (state) => fromConference.getConferenceId(state.conference);