"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.backToTop = void 0;
const backToTop = ($) => {
    $(window).scroll(() => {
        if ($().scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        }
        else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(() => {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });
};
exports.backToTop = backToTop;
