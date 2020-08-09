import SelectPlayer from './components/SelectPlayer';
import DeviceUtils from './utils/DeviceUtils';
import AudioManager from './managers/AudioManager';
import SoundButtonComponent from './components/SoundButtonComponent';

let width, height;
let orientationMessage = document.querySelector('.js-orientation-message');

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
    if (!DeviceUtils.isMobile() && !DeviceUtils.isTablet()) return;
    
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
}

function orientationchangeHandler(e) {
    window.addEventListener('resize', resizeOrientationHandler);
}

function resizeOrientationHandler() {
    checkSize();
    window.removeEventListener('resize', resizeOrientationHandler);
}