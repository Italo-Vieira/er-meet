import { CLICK_UPDATE_VALUE } from '../actions/actionTypes';
import { MEETING_FOUND } from '../actions/actionTypes';
import { USER_JOINED } from '../actions/actionTypes';

const initialState = {
    newValue: 'Atualizado via Redux!',
    conference: {},
  
};

const userInitialState = {
    users: []
}

export const clickReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLICK_UPDATE_VALUE:
            return {
                ...state,
                newValue: action.newValue
            };
        default:
            return state;
    }
};

export const conferenceFoundReducer = (state = initialState, action) => {
    switch (action.type) {
        case MEETING_FOUND:
            return {
                ...state,
                conference: action.newValue
            };
        default:
            return state;
    }
};
