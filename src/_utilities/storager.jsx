const currentToken = "currentToken";
const currentUser = "currentUser";
const currentUserId = "currentUserId";

// set token to localStorage
export function setTokenToLocalStorage(token) {
    return localStorage.setItem(currentToken, token);
};

// get token from localStorage
export function getTokenFromLocalStorage() {
    return localStorage.getItem(currentToken);
}


// ?User

// set user to localStorage
export function setUserToLocalStorage(user) {
    localStorage.setItem(currentUserId, JSON.stringify(user._id));
    return localStorage.setItem(currentUser, JSON.stringify(user));
};

// get user from localStorage
export function getUserFromLocalStorage() {
    return JSON.parse(localStorage.getItem(currentUser));
}

// get userId from localStorage
export function getUserIdFromLocalStorage() {
    return JSON.parse(localStorage.getItem(currentUserId));
}

// !Clear Storage 

// remove user from localStorage
export function clearLocalStorage() {
    return localStorage.clear();
};