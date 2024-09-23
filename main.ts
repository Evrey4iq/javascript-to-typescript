// Оголошення WOW.js
declare var WOW: any;

(function ($: any) {
    "use strict";

    // Spinner
    const spinner = function (): void {
        setTimeout(function (): void {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    // Initiate the wowjs
    new WOW().init();
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function (this: Window): void {
        if (window.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function (this: HTMLElement): void {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function (this: HTMLElement): void {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    // Back to top button
    $(window).scroll(function (): void {
        if ($().scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    // Заміна на стрілкову функцію, щоб уникнути проблем з типом `this`
    $('.back-to-top').click((): boolean => {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // Facts counter
    ($('[data-toggle="counter-up"]') as any).counterUp({
        delay: 10,
        time: 2000
    });

    // Modal Video
    $(document).ready(function (): void {
        let $videoSrc: string;
        $('.btn-play').click(function (): void {
            $videoSrc = $().data("src");
        });
        
        $('#videoModal').on('shown.bs.modal', function (): void {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        });

        $('#videoModal').on('hide.bs.modal', function (): void {
            $("#video").attr('src', $videoSrc);
        });
    });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            }
        }
    });

})(jQuery);
