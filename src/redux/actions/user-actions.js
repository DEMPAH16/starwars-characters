const LOGIN = 'LOGIN';
const REGISTER = 'REGISTER';
const LOGOUT = 'LOGOUT';
const UPDATE_PROFILE = 'UPDATE_PROFILE';
const UPDATE_THEME = 'UPDATE_THEME';

function logOut() {
    return { type: LOGOUT };
}

function updateTheme(theme) {
    return {
        type: UPDATE_THEME,
        payload: Promise.resolve(theme),
    };
}

export {
    LOGIN,
    REGISTER,
    LOGOUT,
    UPDATE_PROFILE,
    UPDATE_THEME,
    
    logOut,
    updateTheme
};