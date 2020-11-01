import { createStore, compose, applyMiddleware } from 'redux';
import { Reducers } from '../reducers';
import dynamicMiddlewares from 'redux-dynamic-middlewares'
let enhancers;
if(window.__REDUX_DEVTOOLS_EXTENSION__ ) {
    enhancers = compose(
        applyMiddleware(dynamicMiddlewares),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
} else {
    enhancers = applyMiddleware(dynamicMiddlewares);
}
export const Store = createStore(Reducers, enhancers);