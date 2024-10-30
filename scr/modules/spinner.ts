export const spinner = (): void => {
    setTimeout(() => {
        if ($('#spinner').length > 0) {
            $('#spinner').removeClass('show');
        }
    }, 1);
};
export{};