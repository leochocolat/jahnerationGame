import { TweenLite, TimelineLite } from "gsap";
import bindAll from '../utils/bindAll';

const ACTIONURL = 'https://leomouraire.us5.list-manage.com/subscribe/post?u=865e089434b6e7d78112f0878&amp;id=4a0729be21';

class Form {
    constructor(el) {
        this.el = el;

        this.form = this.el.querySelector('.js-form') 
        
        bindAll(this, '_submitHandler');
        
        this.ui = {
            backgroundTransitionContainer: document.querySelector('.js-bgContainer'),
            backgroundTransitionRed: document.querySelector('.js-bgContainer-red'),
            backgroundTransitionWhite: document.querySelector('.js-bgContainer-white'),
            formValidation: document.querySelector('.js-form-validation')
        } 
        
        this._setup();
    }

    _setup() {
        this.form.action = ACTIONURL;
        this._setupEventListener();
    }

    transitionIn() {
        let timeline = new TimelineLite();

        timeline.set(this.ui.backgroundTransitionContainer, { autoAlpha: 1 }, 0);
        timeline.fromTo(this.ui.backgroundTransitionWhite, 1.6, { x: '0%' }, { x: '-200%', ease: Power4.easeInOut }, 0);
        timeline.fromTo(this.ui.backgroundTransitionRed, 1.6, { x: '0%' }, { x: '-200%', ease: Power4.easeInOut }, 0.1);
        timeline.set(this.el, { autoAlpha: 1, display: 'block' }, 0.8);
    }

    transitionOut() {
        let timeline = new TimelineLite();

        timeline.set(this.ui.backgroundTransitionContainer, { autoAlpha: 1 }, 0);
        timeline.fromTo(this.ui.backgroundTransitionWhite, 1.6, { x: '0%' }, { x: '-200%', ease: Power4.easeInOut }, 0);
        timeline.fromTo(this.ui.backgroundTransitionRed, 1.6, { x: '0%' }, { x: '-200%', ease: Power4.easeInOut }, 0.1);
        timeline.set(this.el, { autoAlpha: 1, display: 'none' }, 0.8);
        timeline.set(this.ui.formValidation, { autoAlpha: 1, display: 'block' }, 0.8);
    }

    _setupEventListener() {
        this.form.addEventListener('submit', this._submitHandler);
    }

    _submitHandler(e) {
        this.transitionOut();
    }
}

export default Form;