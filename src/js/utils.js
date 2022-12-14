import { urlConstants } from "./constants.js";

export const getHomeURL = () => {
    return window.location.origin + window.location.pathname.match(/(\/[a-z]*)/gi)[0] + urlConstants.HOME;
}

export const generateID = (idLength) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( let i = 0; i < idLength; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}