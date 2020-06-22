import { USER_JOINED, MUTE_USER } from '../actions/actionTypes';
import { combineReducers } from 'redux';

export const byId = (state = {}, action) => {
    switch (action.type) {
        case USER_JOINED:
            var newState = {...state};
            newState[action.user.userId] = action.user;
            return newState;
        case MUTE_USER:
            var newState = {...state};
            var oldUser = state[action.user.userId]
            return {
                ...state,
                [action.user.userId]: {...oldUser,...action.user}
            };            
        default:
            return state;
    }
};

const allIds = (state = [], action) => {
    switch (action.type) {
        case USER_JOINED:
            return [...state, action.user.userId]
        default:
            return state;
    }
}

const user = combineReducers({
    byId,
    allIds
})

export default user;

export const getAllUsers = (state) => {
    return state.allIds.map(i => state.byId[i]);
}

export const getUserById = (state, id) => {
    return state.byId[id]
}