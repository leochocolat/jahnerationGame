import bindAll from '../utils/bindAll';
import emitter from '../events/emitter';

import { Howl, Howler } from 'howler';
import DeviceUtils from '../utils/DeviceUtils';

class AudioManager {
    constructor() {
        this._bindAll();
        this._setup();

        window.play = this._playSoundHandler;
    }

    _setup() {
        // if (DeviceUtils.isMobile() || DeviceUtils.isTouch()) {
        //     Howler.volume(0);
        // }

        this._setupSounds();
        this._loadAudios();
        this._setupHowler();
        this._setupEventListeners();
    }

    _setupSounds() {
        this._sounds = {};

        this._sounds.ambiance = new Howl({
            src: ['./assets/audios/loop.mp3'],
            loop: true,
            volume: 0.5
        })

        this._sounds.win = new Howl({
            src: ['./assets/audios/win.mp3'],
            loop: false,
            volume: 0.5
        })

        this._sounds.loose = new Howl({
            src: ['./assets/audios/loose.mp3'],
            loop: false,
            volume: 0.5
        })
    }

    _loadAudios() {
        
    }

    _setupHowler() {

    }

    _bindAll() {
        bindAll(
            this,
            '_playAmbianceHandler',
            '_stopAmbianceHandler',
            '_playSoundHandler',
            '_muteSoundHandler',
            '_unmuteSoundHandler'
        )
    }

    _setupEventListeners() {
        emitter.on('play:ambiance', this._playAmbianceHandler);
        emitter.on('stop:ambiance', this._stopAmbianceHandler);
        emitter.on('play:sound', this._playSoundHandler);
        emitter.on('sound:on', this._unmuteSoundHandler);
        emitter.on('sound:off', this._muteSoundHandler);
    }

    _playAmbianceHandler(e) {
        this._sounds.ambiance.play();
    }

    _stopAmbianceHandler(e) {
        this._sounds.ambiance.stop();
    }

    _playSoundHandler(e = {}) {
        const name = e.name || 'win';
        this._sounds[name].play();
    }

    _muteSoundHandler(e) {
        Howler.volume(0);
    }

    _unmuteSoundHandler(e) {
        Howler.volume(1);
    }
}

export default new AudioManager();