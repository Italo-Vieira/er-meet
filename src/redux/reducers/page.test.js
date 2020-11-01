import page, * as pageGetters from './page'
import * as actions from '../actions';

describe('page reducer tests', () => {
    let initialState;
    beforeEach(() => {
        initialState = {
            currentPage: "login"
        }
    });

    it('should return initial stae', () => {
        expect(page(undefined, {})).toEqual({currentPage: "login"})
    })

    it('should change page to conference', () => {
        let action = actions.changePage("conference");
        expect(page(initialState, action)).toEqual({currentPage: "conference"})
    })
});

describe('page Store getters', () => {
    let initialState;
    beforeEach(() => {
        initialState = {
            currentPage: "login"
        }
    });
    
    it('should return current page', () => {
        initialState.currentPage = "conference"
        let currentPage = pageGetters.getCurrentPage(initialState);
        expect(currentPage).toEqual("conference")
    })
});
