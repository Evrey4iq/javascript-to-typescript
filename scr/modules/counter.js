"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupCounter = void 0;
const setupCounter = ($) => {
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });
};
exports.setupCounter = setupCounter;
