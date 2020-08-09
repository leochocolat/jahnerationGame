import bindAll from '../utils/bindAll';
import emitter from '../events/emitter';

import { TimelineMax, Power0 } from 'gsap';

class SoundButtonComponent {
    constructor(el) {
        this.el = el;

        this.ui = {
            lines: this.el.querySelectorAll('.js-line')
        }

        this.bindAll();

        this._isSoundActive = true;
        this._setup();   
    }

    _setup() {
        this._setupEventListeners();
        this._setupTimeline();
    }

    _setupTimeline() {
        this._timeline = new TimelineMax({
            paused: true,
            onComplete: this._onCompleteHandler
        });

        for (let i = 0; i < this.ui.lines.length; i++) {
            this._timeline.to(this.ui.lines[i], .3, { scaleY: 1 * Math.random(), ease: Power0.easeNone }, 0);
        };

        this._timeline.play();
    }

    bindAll() {
        bindAll(
            this,
            '_clickHandler',
            '_onCompleteHandler'
        );
    }

    _mute() {
        emitter.emit('sound:off', {});
        this._timeline.stop();
    }

    _onmute() {
        emitter.emit('sound:on', {});
        this._timeline.play();
    }

    _setupEventListeners() {
        this.el.addEventListener('click', this._clickHandler);
    }

    _clickHandler() {
        if (this._isSoundActive) {
            this._isSoundActive = false;
            this._mute()   
        } else {
            this._isSoundActive = true;
            this._onmute();
        }
    }

    _onCompleteHandler() {
        this._setupTimeline();
        this._timeline.play();
    }
}

export default SoundButtonComponent;