import { CLICK_UPDATE_VALUE, MEETING_FOUND, USER_JOINED } from './actionTypes';

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
    newValue: value
});