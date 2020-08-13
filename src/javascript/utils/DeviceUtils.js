class DeviceUtils {
    isTouch() {
        return 'ontouchstart' in document.documentElement;
    }

    isScrollBehaviorSupported() {
        return 'scrollBehavior' in document.documentElement.style;
    }

    isMobile() {
        const UA = this._getUA();
        return !this.isTablet() && /[^-]mobi/i.test(UA);
    }

    isTablet() {
        const UA = this._getUA();

        return /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(UA);
    }

    _getUA() {
        return typeof navigator !== 'undefined' ? navigator.userAgent || '' : '';
    }
}

export default new DeviceUtils();