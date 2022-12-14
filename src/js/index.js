import {getHomeURL} from './utils.js';
import {initialUISetup} from "./ui.js";
import {initialStorageSetup} from './localStorage.js';

window.onload = () => {
    document.querySelector('#homeLink').addEventListener('click', navigateHome);
    initialUISetup();
    initialStorageSetup();
}

export const navigateHome = () => {
    window.location = getHomeURL();
}
