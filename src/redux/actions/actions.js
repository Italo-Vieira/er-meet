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
        ...value,
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

export const userCameraMuted = (userId, isCameraMuted) => ({
    type: actionTypes.USER_CAMERA_MUTE_CHANGED,
    user: {
        userId,
        isCameraMuted,
    }
})

export const userMicMuted = (userId, isMicMuted) => ({
    type: actionTypes.USER_CAMERA_MUTE_CHANGED,
    user: {
        userId,
        isMicMuted,
    }
})

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

export const videoTrackRemoved = (userId, videoTrackId) => ({
    type: actionTypes.VIDEO_TRACK_REMOVED,
    user: {
        userId,
        videoTrackId: undefined
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

export const myCameraMuted = (isCameraMuted) => ({
    type: actionTypes.MY_CAMERA_MUTED,
    user: {
        isCameraMuted
    }
})

export const screenShareStarted = (userId, desktopTrackId) => ({
    type: actionTypes.SCREEN_SHARE_STARTED,
    user: {
        userId: userId + "-desktop-track",
        videoTrackId: desktopTrackId,
        connected: true,
        username: "share"
    }
})

export const screenShareStopped = (userId, desktopTrackId) => ({
    type: actionTypes.SCREEN_SHARE_STOPPED,
    user: {
        userId: userId + "-desktop-track",
        videoTrackId: desktopTrackId,
        connected: true
    }
})

/* UI action creators */
export const partListToggled = (status) => ({
    type: actionTypes.PART_LIST_TOGGLED,
    status
})