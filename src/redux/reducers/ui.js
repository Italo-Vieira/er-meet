import { PART_LIST_TOGGLED } from '../actions/actionTypes';
import { combineReducers } from 'redux';

const partListInitialState = {
    isOpen: true
};

export const participantList = (state = partListInitialState, action) => {
    switch (action.type) {
        case PART_LIST_TOGGLED:
            return { isOpen: !state.isOpen };
        default:
            return state;
    }
};

const ui = combineReducers({
    participantList,
})

export default ui;

export const getPartListState = (state) => {
    return state.participantList.isOpen;
}