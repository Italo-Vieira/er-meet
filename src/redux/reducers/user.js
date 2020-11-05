import { USER_JOINED, MUTE_USER, USER_NAME_CHANGED, USER_LEFT, VIDEO_TRACK_ADDED, FOCUSED_USER_CHANGED, ME_USER_CREATED } from '../actions/actionTypes';
import { combineReducers } from 'redux';
import conferenceProvider from '../../conference'

export const byId = (state = {}, action) => {
    switch (action.type) {
        case USER_JOINED:
            var newState = { ...state };
            newState[action.user.userId] = action.user;
            return newState;
        case USER_LEFT:
        case MUTE_USER:
        case USER_NAME_CHANGED:
        case VIDEO_TRACK_ADDED:
            newState = { ...state };
            var oldUser = state[action.user.userId]
            return {
                ...state,
                [action.user.userId]: { ...oldUser, ...action.user }
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

const focused = (state = {}, action) => {
    switch (action.type) {
        case FOCUSED_USER_CHANGED:
            return { userId: action?.userId };
        case VIDEO_TRACK_ADDED:
            if (state.userId === undefined)
                return { userId: action.user.userId }
            else
                return state
        default:
            return state;
    }
}

const me = (state = {}, action) => {
    switch (action.type) {
        case ME_USER_CREATED:
            return { id: action.user.id };
        default:
            return state;
    }
}

const user = combineReducers({
    byId,
    allIds,
    focused,
    me
})

export default user;

export const getAllUsers = (state) => {
    return state.allIds.map(i => state.byId[i]);
}

export const getUserById = (state, id) => {
    return state.byId[id]
}

export const getFocusedUser = (state) => {
    return state.byId[state.focused.userId];
}

export const getConnectedUsers = (state) => {
    return state.allIds.map(id => state.byId[id]).filter(u => u.connected) || [];
}

export const getMediaUsers = (state) => {
    let users = getConnectedUsers(state).map(u => JSON.parse(JSON.stringify(u)));
    users.forEach(u => u.videoTrack = conferenceProvider.getTrack(u.videoTrackId));
    return users;
}

export const getFocusedMediaUser = (state) => {

    let user = getFocusedUser(state)
    if (user === undefined || user.userId == undefined)
        return;
    user = JSON.parse(JSON.stringify(user));

    user.videoTrack = conferenceProvider.getTrack(user.videoTrackId);
    return user;
}