export const setupModalVideo = ($: any): void => {
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
};
export{};