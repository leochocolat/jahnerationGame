import SelectPlayer from './components/SelectPlayer';
import DeviceUtils from './utils/DeviceUtils';
import AudioManager from './managers/AudioManager';
import ResizeManager from './managers/ResizeManager';
import SoundButtonComponent from './components/SoundButtonComponent';

let width, height;
let orientationMessage = document.querySelector('.js-orientation-message');
let links = document.querySelectorAll('[data-link]');

document.addEventListener('DOMContentLoaded', () => {
    setup();
});

function setup() {
    new SelectPlayer();
    new SoundButtonComponent(document.querySelector('.js-sound-button'))
    
    checkSize();
    setupEventListeners();
}

function checkSize() {
    if (!DeviceUtils.isMobile() && !DeviceUtils.isTouch()) return;
    
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
    window.addEventListener('orientationchange', orientationchangeHandler);
    
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', clickLinkHandler);
    }
}

function clickLinkHandler() {
    location.reload();
}


function orientationchangeHandler(e) {
    window.addEventListener('resize', resizeOrientationHandler);
}

function resizeOrientationHandler() {
    checkSize();
    window.removeEventListener('resize', resizeOrientationHandler);
}