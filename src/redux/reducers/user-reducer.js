import { LOGIN, REGISTER, LOGOUT, UPDATE_THEME } from "../actions/user-actions";


function currentUser(user = {}, action) {
    switch (action.type) {
        case LOGIN:
        case REGISTER:
            return action.payload;
        
        case LOGOUT:
            return {};
        
        default:
            return user;
    }
}

function currentUserName(username = '', action) {
    switch (action.type) {
        case LOGIN:
        case REGISTER:
            return action.payload.username;
        
        case LOGOUT:
            return '';
        
        default:
            return username;
    }
}

function headerBackgroundColor(color = 'black', action) {
    switch (action.type) {
        case `${UPDATE_THEME}_FULFILLED`:
            return action.payload.headerBackgroundColor;
        
        default:
            return color;
    }
}

function defaultButtonColor(color = 'gray', action) {
    console.log(action.payload);
    
    switch (action.type) {
        case `${UPDATE_THEME}_FULFILLED`:
            return action.payload.defaultButtonColor;
        
        default:
            return color;
    }
}

export {
    currentUser,
    currentUserName,
    headerBackgroundColor,
    defaultButtonColor,
};
