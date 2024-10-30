import { spinner } from './modules/spinner';
import { setupDropdown } from './modules/dropdown';
import { backToTop } from './modules/backToTop';
import { setupCounter } from './modules/counter';
import { setupModalVideo } from './modules/modalVideo';
import { setupTestimonialsCarousel } from './modules/testimonialsCarousel';

(function ($: any) {
    "use strict";

    // Spinner
    spinner();

    // Dropdown on mouse hover
    setupDropdown($);

    // Back to top button
    backToTop($);

    // Facts counter
    setupCounter($);

    // Modal Video
    setupModalVideo($);

    // Testimonials carousel
    setupTestimonialsCarousel($);
})(jQuery);
