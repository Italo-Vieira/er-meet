import { CLICK_UPDATE_VALUE, MEETING_FOUND, USER_JOINED, MUTE_USER } from './actionTypes';
import {Store} from '../store'
export const clickButton = value => ({
    type: CLICK_UPDATE_VALUE,
    newValue: value
});


export const meetingFound = value => ({
    type: MEETING_FOUND,
    newValue: value
});

export const userJoined = value => ({
    type: USER_JOINED,
    user: value
});

export const muteUser = (id, mute) => ({ 
    type: MUTE_USER,
    user: {
        userId: id,
        mute: mute
    }
});

export const muteUserPraValer = (id, mute) => Store.dispatch({ 
    type: MUTE_USER,
    user: {
        userId: id,
        mute: mute
    }
});