import { CLICK_UPDATE_VALUE, MEETING_FOUND, USER_JOINED, MUTE_USER, CHANGE_PAGE, USER_NAME_CHANGED, USER_LEFT, VIDEO_TRACK_ADDED, FOCUSED_USER_CHANGED } from './actionTypes';
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

export const userNameChanged = (id, name) => ({
    type: USER_NAME_CHANGED,
    user: {
        userId: id,
        username: name
    }
});

export const changePage = (nextPage) => ({
    type: CHANGE_PAGE,
    nextPage
});

export const videoTrackAdded = (userId, videoTrackId) => ({
    type: VIDEO_TRACK_ADDED,
    user: {
        userId,
        videoTrackId
    }
})

export const focusedUserChanged = (userId) => ({
    type: FOCUSED_USER_CHANGED,
    userId
})