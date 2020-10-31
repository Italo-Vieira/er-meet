import { createStore, compose, applyMiddleware } from 'redux';
import { Reducers } from '../reducers';
import dynamicMiddlewares from 'redux-dynamic-middlewares'

export const Store = createStore(Reducers,
    compose(
            applyMiddleware(dynamicMiddlewares),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    )
);