"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spinner_1 = require("./modules/spinner");
const dropdown_1 = require("./modules/dropdown");
const backToTop_1 = require("./modules/backToTop");
const counter_1 = require("./modules/counter");
const modalVideo_1 = require("./modules/modalVideo");
const testimonialsCarousel_1 = require("./modules/testimonialsCarousel");
(function ($) {
    "use strict";
    // Spinner
    (0, spinner_1.spinner)();
    // Dropdown on mouse hover
    (0, dropdown_1.setupDropdown)($);
    // Back to top button
    (0, backToTop_1.backToTop)($);
    // Facts counter
    (0, counter_1.setupCounter)($);
    // Modal Video
    (0, modalVideo_1.setupModalVideo)($);
    // Testimonials carousel
    (0, testimonialsCarousel_1.setupTestimonialsCarousel)($);
})(jQuery);