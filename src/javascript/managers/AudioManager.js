import bindAll from '../utils/bindAll';
import emitter from '../events/emitter';

import { Howl, Howler } from 'howler';


class AudioManager {
    constructor() {
        this._bindAll();
        this._setup();
    }

    _setup() {
        this._setupSounds();
        this._loadAudios();
        this._setupHowler();
        this._setupEventListeners();
    }

    _setupSounds() {
        this._sounds = {};

        this._sounds.ambiance = new Howl({
            src: ['./assets/audios/boyfriend.mp3'],
            loop: true,
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
        emitter.on('sound:on', this._muteSoundHandler);
        emitter.on('sound:off', this._unmuteSoundHandler);
    }

    _playAmbianceHandler(e) {
        this._sounds.ambiance.play();
    }

    _stopAmbianceHandler(e) {
        this._sounds.ambiance.stop();
    }

    _playSoundHandler(e) {
        
    }

    _muteSoundHandler(e) {

    }

    _unmuteSoundHandler(e) {

    }
}

export default new AudioManager();