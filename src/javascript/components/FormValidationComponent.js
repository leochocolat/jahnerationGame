import { TimelineLite, Power3 } from 'gsap';
 
class FormValidationComponent {
    constructor(el) {
        this.el = el;

        this.ui = {
            players: this.el.querySelectorAll('.js-validation-player'),
            micros: this.el.querySelectorAll('.js-microphone'),
            buttons: this.el.querySelectorAll('.js-validation-button'),
            text: this.el.querySelector('.js-validation-text'),
            socialText: this.el.querySelector('.js-social-text'),

        }

        this._setup();
    }

    _setup() {
        
    }

    transitionIn() {
        let timeline = new TimelineLite({ delay: 1 });

        timeline.staggerFromTo(this.ui.players, 1, { autoAlpha: 0, y: '-40%' }, { autoAlpha: 1, y: '-50%', ease: Power3.easeOut }, 0.1, 0);
        timeline.staggerFromTo(this.ui.micros, 1, { autoAlpha: 0, y: '-40%' }, { autoAlpha: 1, y: '-50%', ease: Power3.easeOut }, 0.1, 0.2);
        timeline.fromTo(this.ui.text, 1, { autoAlpha: 0 }, { autoAlpha: 1, ease: Power3.easeInOut }, 0);
        timeline.fromTo(this.ui.socialText, 1, { autoAlpha: 0 }, { autoAlpha: 1, ease: Power3.easeInOut }, 0);
        timeline.staggerFromTo(this.ui.buttons, 1, { autoAlpha: 0 }, { autoAlpha: 1, ease: Power3.easeOut }, 0.05, 0.2);
    }

    transitionOut() {

    }
}

export default FormValidationComponent;