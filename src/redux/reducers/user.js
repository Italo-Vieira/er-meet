import * as types from '../actions/actionTypes';
import { combineReducers } from 'redux';
import conferenceProvider from '../../conference'

export const byId = (state = {}, action) => {
    let newState = {...state};
    switch (action.type) {
        case types.USER_JOINED:
            newState[action.user.userId] = action.user;
            return newState;
        case types.USER_LEFT:
        case types.USER_CAMERA_MUTE_CHANGED:
        case types.USER_MIC_MUTE_CHANGED:
        case types.USER_NAME_CHANGED:
        case types.VIDEO_TRACK_ADDED:
        case types.VIDEO_TRACK_REMOVED:
        case types.AUDIO_TRACK_ADDED:
        case types.AUDIO_TRACK_REMOVED:

            let oldUser = state[action.user.userId]
            return {
                ...state,
                [action.user.userId]: { ...oldUser, ...action.user }
            };
        case types.SCREEN_SHARE_STARTED:
            newState[action.user.userId] = action.user;
            
            return newState;
        case types.SCREEN_SHARE_STOPPED:
            delete newState[action.user.userId]
            return newState;
        default:
            return state;
    }
};

const allIds = (state = [], action) => {
    switch (action.type) {
        case types.USER_JOINED:
            return [...state, action.user.userId]
        default:
            return state;
    }
}

const focused = (state = {}, action) => {
    switch (action.type) {
        case types.FOCUSED_USER_CHANGED:
            return { userId: action?.userId };
        case types.VIDEO_TRACK_ADDED:
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
        case types.ME_USER_CREATED:
        case types.LOCAL_USER_NAME_CHANGED:
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
    users.forEach(u =>  {
        u.videoTrack = conferenceProvider.getTrack(u.videoTrackId);
        u.audioTrack = conferenceProvider.getTrack(u.audioTrackId);
    });
    return users;
}

export const getFocusedMediaUser = (state) => {

    let user = getFocusedUser(state)
    if (user === undefined || user.userId == undefined)
        return;
    user = JSON.parse(JSON.stringify(user));

    user.videoTrack = conferenceProvider.getTrack(user.videoTrackId);
    user.audioTrack = conferenceProvider.getTrack(user.audioTrackId);
    return user;
}

export const getMeUser = (state) => {
    return {...state.byId[state.me.userId], ...state.me}
}

export const getMeUsername = (state) => {
    return state.me.username;
}