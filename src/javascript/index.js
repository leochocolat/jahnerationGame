import SelectPlayer from './components/SelectPlayer';
import DeviceUtils from './utils/DeviceUtils';
import AudioManager from './managers/AudioManager';
import ResizeManager from './managers/ResizeManager';
import SoundButtonComponent from './components/SoundButtonComponent';

let width, height;
let orientationMessage = document.querySelector('.js-orientation-message');
let links = document.querySelectorAll('[data-link]');
let selectPlayer;

let webviewButton = document.querySelector('.js-webview-button');
// let log = document.querySelector('.js-log');
// let i = 0;

document.addEventListener('DOMContentLoaded', () => {
    setup();
});

function setup() {
    selectPlayer = new SelectPlayer();
    new SoundButtonComponent(document.querySelector('.js-sound-button'))
    
    checkSize();
    setupEventListeners();
}

function checkSize() {
    // if (!DeviceUtils.isMobile() && !DeviceUtils.isTouch()) return;
    
    width = window.innerWidth;
    height = window.innerHeight;

    if (width < height) {
        displayOrientationMessage();
    } else {
        removeOrientationMessage();
    }
}

function displayOrientationMessage() {
    if (!orientationMessage.classList.contains('isDisable')) return;

    orientationMessage.classList.remove('isDisable');
}

function removeOrientationMessage() {
    if (orientationMessage.classList.contains('isDisable')) return;
    
    orientationMessage.classList.add('isDisable');
}

function setupEventListeners() {
    // window.addEventListener('orientationchange', orientationchangeHandler);
    ResizeManager.addEventListener('resize:end', resizeOrientationHandler);
    webviewButton.addEventListener('click', clickWebviewLinkHandler);
    
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', clickLinkHandler);
    }
}

function clickLinkHandler() {
    location.reload();
}

function clickWebviewLinkHandler() {

}

// function orientationchangeHandler(e) {
//     ResizeManager.addEventListener('resize:end', resizeOrientationHandler);
// }

function resizeOrientationHandler() {
    checkSize();
    // window.removeEventListener('resize', resizeOrientationHandler);
}