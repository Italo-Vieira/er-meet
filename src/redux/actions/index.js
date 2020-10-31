import { CLICK_UPDATE_VALUE, MEETING_FOUND, USER_JOINED, MUTE_USER, CHANGE_PAGE, USER_NAME_CHANGE, USER_LEFT } from './actionTypes';
import { Store } from '../store'
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
    user: {
        connected: true,
        ...value
    }
});

export const userLeft = id => ({
    type: USER_LEFT,
    user: {
        userId: id,
        connected: false
    }
})

export const muteUser = (id, mute) => ({
    type: MUTE_USER,
    user: {
        userId: id,
        mute: mute
    }
});

export const changeUsername = (id, name) => ({
    type: USER_NAME_CHANGE,
    user: {
        userId: id,
        username: name
    }
});

export const muteUserPraValer = (id, mute) => Store.dispatch({
    type: MUTE_USER,
    user: {
        userId: id,
        mute: mute
    }
});

export const changePage = (nextPage) => ({
    type: CHANGE_PAGE,
    nextPage
});