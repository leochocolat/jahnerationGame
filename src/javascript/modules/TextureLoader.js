import _ from 'underscore';
import Pixi from '../components/Pixi';
import DeviceUtils from '../utils/DeviceUtils';
import SplitText from '../vendors/SplitText';
import emitter from '../events/emitter';

import { TweenLite, Power3, Power4, TweenMax } from 'gsap';

class TextureLoader {
    constructor(playerIndex) {
        this._playerIndex = playerIndex;

        _.bindAll(this, '_onTextureLoaded', '_fullScreenButtonHandler');

        this._spritesheetsUrl = [
            'assets/spriteheets/bikeSpritesheet.json',
            'assets/spriteheets/skateSpritesheet.json',
            'assets/spriteheets/buildingSpritesheet.json',
            'assets/spriteheets/obstaclesSpritesheet.json',
            'assets/spriteheets/objectsSpritesheet.json',
            'assets/spriteheets/shadowSpritesheet.json'
        ]

        this._loaderSectionContainer = document.querySelector('.js-loader');
        this._canvas = document.querySelector('.js-canvas');

        this._ui = {
            loaderProgress: this._loaderSectionContainer.querySelector('.js-loader-progress'),
            logoLoader: this._loaderSectionContainer.querySelector('.js-loader-logo'),
            playerText: document.querySelector('.js-player-text'),
            playerTextSpans: document.querySelectorAll('.js-player-text-span'),
            players: document.querySelectorAll('.js-player'),
            fullScreenButton: document.querySelector('.js-full-screen-button'),
            timer: document.querySelector('.js-infos-timer'),
            contestOver: document.querySelector('.js-contest-over'),
            form: document.querySelector('.js-form'),
        }
        
        this._setup();
        this._setupSplitAnimtation();
        this._setupEventListeners();

    }

    _setup() {
        this._progressValue = 0;

        this._textureLoader = new PIXI.loaders.Loader();
        this._textureLoader.add('animationSpritesheetBike', this._spritesheetsUrl[0]);
        this._textureLoader.add('animationSpritesheetSkate', this._spritesheetsUrl[1]);
        this._textureLoader.add('buildingSpritesheet', this._spritesheetsUrl[2]);
        this._textureLoader.add('obstaclesSpritesheet', this._spritesheetsUrl[3]);
        this._textureLoader.add('objectsSpritesheet', this._spritesheetsUrl[4]);
        this._textureLoader.add('shadowSpritesheet', this._spritesheetsUrl[5]);
        //covid
        this._textureLoader.add('covidObstacle', 'assets/sprites/covid.png');

        this._textureLoader.onProgress.add((loader) => this._updateProgress(loader.progress))

        this._loaderEnterAnimation();
    }

    _setupSplitAnimtation() {
        for (let i = 0; i < this._ui.playerTextSpans.length; i++) {
            const element = this._ui.playerTextSpans[i];
            new SplitText(element, 
                {
                    type: 'chars', 
                    charsClass: `char char--++`,
                }
            )
        }
    }

    _setupEventListeners() {
        this._textureLoader.load(this._onTextureLoaded);
        this._ui.fullScreenButton.addEventListener('click', this._fullScreenButtonHandler);
    }

    _fullScreenButtonHandler() {
        this._toggleFullScreenButton();
        this._requestFullScreen();
        this._requestFullScreenIos();
    }

    _onTextureLoaded(e) {
        this._start();
    }

    _updateProgress(progress) {
        this._ui.loaderProgress.innerHTML = progress.toFixed(0);
    }

    _loaderEnterAnimation() {
        TweenLite.to(this._ui.loaderProgress, 1.3, { autoAlpha: 1, y: 0 })
    }

    _loaderOutAnimation() {
        TweenLite.to(this._ui.loaderProgress, 0.8, { autoAlpha: 0, y: "-100%", ease: Power4.easeOut, delay: 1 });
        TweenLite.to(this._loaderSectionContainer, 1, { height: 0, ease: Power4.easeInOut, delay: 1.2 });
        TweenMax.staggerFrom(this._ui.players, 1.3, { y: 50, autoAlpha: 0, ease: Power4.easeOut, delay: 1.6 }, 0.1);

        setTimeout(() => {
            this._ui.playerText.classList.add('transitionIn');
        }, 1800);

        if (this._isContestOver()) {
            setTimeout(() => {
                this._ui.contestOver.classList.add('transitionIn');
            }, 2700);

            // Disable form
            this._ui.form.style.pointerEvents = 'none';
            this._ui.form.setAttribute('action', '');
        } else {
            this._ui.contestOver.classList.add('transitionOut');
        }
    }

    _isContestOver() {
        const endDate = new Date('February 20, 2022 00:00:00');
        const timeRemaining = endDate - Date.now();

        return timeRemaining < 0;
    }

    loadedPlayerTexture(index) {
        let spritesheet = this._textureLoader.resources;
        // this._textureLoader.add('animationSpritesheet', this._spritesheetsUrl[index]);
        this._requestFullScreen();
        this._requestFullScreenIos();
        this._toggleFullScreenButton();
        this.pixiComponent.setupPlayer(index, spritesheet)
        emitter.emit('play:ambiance', {}, { passive: true });
    }

    _toggleFullScreenButton() {
        if (this._ui.fullScreenButton.classList.contains('is-active')) {
            this._ui.fullScreenButton.classList.remove('is-active');
        } else {
            this._ui.fullScreenButton.classList.add('is-active');
        }
    }

    _enableFullScreenOption() {
        this._ui.fullScreenButton.classList.add('is-enable');
        this._ui.timer.classList.add('is-fullscreen-enable');
    }

    _requestFullScreen() {
        if(DeviceUtils.isMobile()) {
            this._enableFullScreenOption();
            if ( document.body.requestFullscreen) {
                document.body.requestFullscreen()
            } else if ( document.body.mozRequestFullScreen) { /* Firefox */
                document.body.mozRequestFullScreen()
            } else if ( document.body.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                document.body.webkitRequestFullscreen()
            } else if ( document.body.msRequestFullscreen) { /* IE/Edge */
                document.body.msRequestFullscreen() 
            }
        }
    }

    _requestFullScreenIos() {
        if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
            window.scrollTo(0, 1);
        }
    }

    _exitFullScreen() {
        if(DeviceUtils.isMobile()) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { /* Firefox */
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE/Edge */
                document.msExitFullscreen();
            }
        }
    }

    _start() {
        let spritesheet = this._textureLoader.resources;
        this.pixiComponent = new Pixi(spritesheet);

        this._loaderOutAnimation();
    }

}

export default TextureLoader; 