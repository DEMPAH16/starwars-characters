import {
    createStore,
    combineReducers,
    compose,
    applyMiddleware
} from 'redux';
import reduxPromiseMiddleware from 'redux-promise-middleware';

import * as userReducer from './reducers/user-reducer';

// function reducer(state = {}, action) {
    
//     switch (action.type) {
//         case LOGIN:
//         case REGISTER:
//             return {
//                 ...state,
//                 currentUser: action.payload,
//             };
        
//         case LOGOUT:
//             return {};
        
//         default:
//             return state;
//     }
// }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
    combineReducers({
        ...userReducer,
    }),
    composeEnhancers(
        applyMiddleware(reduxPromiseMiddleware())
    ),
);