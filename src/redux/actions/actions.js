import * as actionTypes from './actionTypes';

export const clickButton = value => ({
    type: actionTypes.CLICK_UPDATE_VALUE,
    newValue: value
});


export const meetingFound = value => ({
    type: actionTypes.MEETING_FOUND,
    newValue: value
});

export const userJoined = value => ({
    type: actionTypes.USER_JOINED,
    user: {
        connected: true,
        ...value
    }
});

export const userLeft = id => ({
    type: actionTypes.USER_LEFT,
    user: {
        userId: id,
        connected: false
    }
})

export const muteUser = (id, mute) => ({
    type: actionTypes.MUTE_USER,
    user: {
        userId: id,
        mute: mute
    }
});

export const userNameChanged = (id, name) => ({
    type: actionTypes.USER_NAME_CHANGED,
    user: {
        userId: id,
        username: name
    }
});

export const changePage = (nextPage) => ({
    type: actionTypes.CHANGE_PAGE,
    nextPage
});

export const videoTrackAdded = (userId, videoTrackId) => ({
    type: actionTypes.VIDEO_TRACK_ADDED,
    user: {
        userId,
        videoTrackId
    }
})

export const focusedUserChanged = (userId) => ({
    type: actionTypes.FOCUSED_USER_CHANGED,
    userId
})

export const meUserCreated = (userId) => ({
    type: actionTypes.ME_USER_CREATED,
    user: {
        userId
    }
})

/* UI action creators */
export const partListToggled = (status) => ({
    type: actionTypes.PART_LIST_TOGGLED,
    status
})