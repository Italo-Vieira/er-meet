import { USER_JOINED, USER_CAMERA_MUTE_CHANGED, USER_NAME_CHANGED, USER_LEFT, VIDEO_TRACK_ADDED, FOCUSED_USER_CHANGED, ME_USER_CREATED, SCREEN_SHARE_STARTED, SCREEN_SHARE_STOPPED, VIDEO_TRACK_REMOVED } from '../actions/actionTypes';
import { combineReducers } from 'redux';
import conferenceProvider from '../../conference'

export const byId = (state = {}, action) => {
    let newState = {...state};
    switch (action.type) {
        case USER_JOINED:
            newState[action.user.userId] = action.user;
            return newState;
        case USER_LEFT:
        case USER_CAMERA_MUTE_CHANGED:
        case USER_NAME_CHANGED:
        case VIDEO_TRACK_ADDED:
        case VIDEO_TRACK_REMOVED:
            let oldUser = state[action.user.userId]
            return {
                ...state,
                [action.user.userId]: { ...oldUser, ...action.user }
            };
        case SCREEN_SHARE_STARTED:
            newState[action.user.userId] = action.user;
            
            return newState;
        case SCREEN_SHARE_STOPPED:
            delete newState[action.user.userId]
            return newState;
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
            return { ...state, ...action.user};
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
// TODO: Deep copying all users might have a peformance impact
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

export const getMeUser = (state) => {
    return {...state.byId[state.me.userId], ...state.me}
}