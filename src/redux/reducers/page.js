import { CHANGE_PAGE } from '../actions/actionTypes'

const initialState = {
    currentPage: "login"
}

const page = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_PAGE:
            var newState = { ...state };
            newState.currentPage = action.nextPage;
            return newState;

        default:
            return state;
    }
};

export default page;

export function getCurrentPage(state) {
    return state.currentPage;
}