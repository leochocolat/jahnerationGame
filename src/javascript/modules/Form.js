import { TweenLite, TimelineLite, Power3 } from "gsap";
import bindAll from '../utils/bindAll';
import SplitText from '../vendors/SplitText';
import FormValidationComponent from '../components/FormValidationComponent';

const ACTIONURL = 'https://leomouraire.us5.list-manage.com/subscribe/post?u=865e089434b6e7d78112f0878&id=4a0729be21';

class Form {
    constructor(el) {
        this.el = el;

        this.form = this.el.querySelector('.js-form') 
        
        bindAll(this, '_submitHandler');
        
        this.ui = {
            backgroundTransitionContainer: document.querySelector('.js-bgContainer'),
            backgroundTransitionRed: document.querySelector('.js-bgContainer-red'),
            backgroundTransitionWhite: document.querySelector('.js-bgContainer-white'),
            formValidation: document.querySelector('.js-form-validation'),
            title: document.querySelector('.js-form-title'),
            playerLeft: document.querySelector('.js-player-form-left'),
            playerRight: document.querySelector('.js-player-form-right'),
            olympia: document.querySelector('.js-olympia-logo'),
            inputs: document.querySelectorAll('.js-input'),
            submit: document.querySelector('.js-submit'),
            legal: document.querySelector('.js-legal'),
            date: document.querySelector('.js-form-date')
        } 

        this.components = {
            formValidation: new FormValidationComponent(this.ui.formValidation)
        }
        
        this._setup();
    }

    _setup() {
        // this.form.setAttribute('action', ACTIONURL);
        this._setupSplitText();
        this._setupEventListener();
    }

    _setupSplitText() {
        // this.splitTitle = new SplitText(this.ui.title, {
        //     type: 'chars', 
        //     charsClass: `char char--++`,
        // }).chars;
    }

    transitionIn() {
        let timeline = new TimelineLite();

        timeline.set(this.ui.backgroundTransitionContainer, { autoAlpha: 1 }, 0);
        timeline.fromTo(this.ui.backgroundTransitionWhite, 1.6, { x: '0%' }, { x: '-200%', ease: Power4.easeInOut }, 0);
        timeline.fromTo(this.ui.backgroundTransitionRed, 1.6, { x: '0%' }, { x: '-200%', ease: Power4.easeInOut }, 0.1);
        timeline.set(this.el, { autoAlpha: 1, display: 'block' }, 0.8);

        let timelineIntro = new TimelineLite({ delay: 1 });
        timelineIntro.fromTo(this.ui.title, 1.5, { autoAlpha: 0 }, { autoAlpha: 1, ease: Power3.easeInOut }, 0);
        timelineIntro.fromTo(this.ui.olympia, 1.5, { autoAlpha: 0 }, { autoAlpha: 1, ease: Power3.easeInOut }, 0.2);
        timelineIntro.staggerFromTo(this.ui.inputs, 1, { y: 100, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: Power3.easeOut }, 0.1, 0.5);
        timelineIntro.fromTo(this.ui.submit, 1.5, { autoAlpha: 0 }, { autoAlpha: 1, ease: Power3.easeOut }, 0.8);
        timelineIntro.fromTo(this.ui.legal, 1.5, { autoAlpha: 0 }, { autoAlpha: 1, ease: Power3.easeOut }, 0.8);
        timelineIntro.fromTo(this.ui.date, 1.5, { autoAlpha: 0 }, { autoAlpha: 1, ease: Power3.easeOut }, 0.8);
        timelineIntro.from(this.ui.playerLeft, 1, { x: '-100%', ease: Power3.easeOut }, 0.3);
        timelineIntro.from(this.ui.playerRight, 1, { x: '100%', ease: Power3.easeOut }, 0.4);
        
    }

    transitionOut() {
        let timeline = new TimelineLite({
            // onComplete: () => { this.components.formValidation.transitionIn(); }
        });

        timeline.set(this.ui.backgroundTransitionContainer, { autoAlpha: 1 }, 0);
        timeline.fromTo(this.ui.backgroundTransitionWhite, 1.6, { x: '0%' }, { x: '-200%', ease: Power4.easeInOut }, 0);
        timeline.fromTo(this.ui.backgroundTransitionRed, 1.6, { x: '0%' }, { x: '-200%', ease: Power4.easeInOut }, 0.1);
        timeline.set(this.el, { autoAlpha: 1, display: 'none' }, 0.8);
        timeline.set(this.ui.formValidation, { autoAlpha: 1, display: 'block' }, 0.8);

        this.components.formValidation.transitionIn();
    }

    _setupEventListener() {
        this.form.addEventListener('submit', this._submitHandler);
    }

    _submitHandler(e) {
        this.transitionOut();
    }
}

export default Form;