import { addMiddleware} from 'redux-dynamic-middlewares'
import {CHANGE_PAGE} from '../redux/actions/actionTypes'

let conferenceProvider;

export function init(confProvider) {
    conferenceProvider = confProvider;
}

const conferenceProviderMiddleware = store => next => action => {
    switch(action.type) {
        case CHANGE_PAGE:
            console.log("it's alive")
    }
    return next(action)
}

export default conferenceProviderMiddleware;

addMiddleware(conferenceProviderMiddleware)