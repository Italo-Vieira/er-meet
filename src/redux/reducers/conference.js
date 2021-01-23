import * as types from '../actions/actionTypes';
import { combineReducers } from 'redux';

const infoInitialState = {
    conferenceId: "",
}

export const info = (state = infoInitialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case types.CONFERENCE_ID_SET:
            return {...newState, ...action.payload}
        default:
            return state;
    }
};

const conference = combineReducers({
    info,
})

export default conference;

export const getConferenceId = (state) => {
    return state.info.conferenceId
}