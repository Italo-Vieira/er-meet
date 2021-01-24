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


export const userSelectors = new Proxy(fromUserById
  , {
  get (receiver, name) {
      return function(...args) {
          let [state, ...rest] = args;
          if(!state) {
            throw Error("Expected Store state but found undefined, did you forget to pass the State to the selector?")
          }
          return (receiver[name](state.users, ...rest))
      }
  }
});


export const getAllUsers = (state) => fromUserById.getAllUsers(state.users );

export const getUserById = (state, id) => fromUserById.getUserById(state.users, id);

/* Page selectors */
export const getCurrentPage = (state) => fromPage.getCurrentPage(state.page);

/* UI selectors */
export const getPartListState = (state) => fromUI.getPartListState(state.ui); 

export const getConferenceId = (state) => fromConference.getConferenceId(state.conference);