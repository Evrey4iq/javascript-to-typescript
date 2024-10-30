"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupDropdown = void 0;
const setupDropdown = ($) => {
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    $(window).on("load resize", function () {
        if (window.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(function () {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            }, function () {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            });
        }
        else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
};
exports.setupDropdown = setupDropdown;
