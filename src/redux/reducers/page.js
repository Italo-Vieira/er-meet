import { CHANGE_PAGE, CONFERENCE_ID_SET, PRE_JOIN_COMPLETED } from '../actions/actionTypes'

const initialState = {
    currentPage: "login"
}

const page = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case CHANGE_PAGE:
            newState.currentPage = action.nextPage;
            return newState;
        case CONFERENCE_ID_SET:
            newState.currentPage = "preJoin"
            return newState;
        case PRE_JOIN_COMPLETED:
            newState.currentPage = "loading"
            return newState;
        default:
            return state;
    }
};

export default page;

export function getCurrentPage(state) {
    return state.currentPage;
}