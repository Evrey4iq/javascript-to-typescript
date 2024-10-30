"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spinner = void 0;
const spinner = () => {
    setTimeout(() => {
        if ($('#spinner').length > 0) {
            $('#spinner').removeClass('show');
        }
    }, 1);
};
exports.spinner = spinner;
