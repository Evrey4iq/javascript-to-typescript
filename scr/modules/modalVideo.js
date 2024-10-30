"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupModalVideo = void 0;
const setupModalVideo = ($) => {
    let $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $().data("src");
    });
    $('#videoModal').on('shown.bs.modal', function () {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    });
    $('#videoModal').on('hide.bs.modal', function () {
        $("#video").attr('src', $videoSrc);
    });
};
exports.setupModalVideo = setupModalVideo;
