$(function() {
    //modal
    const modal = $('.modal');
    const body = $('body');
    const modalAdd = () => {
        modal.addClass('modal_visible');
        body.addClass('scroll-hide');
        document.addEventListener('keydown', keyRemoveHandler);
    };
    const modalRemove = () => {
        modal.removeClass('modal_visible');
        body.removeClass('scroll-hide');
        $(document).on('keydown', keyRemoveHandler);
    };
    const keyRemoveHandler = (e) => {
        if (e.key === 'Escape') {
            modalRemove();
        }
    };
    $(document).on('click', (e) => {
        if (e.target.matches('[data-toggle="modal"]')) {
            modalAdd();
            return;
        }
        if (e.target.matches('.modal__close') || e.target.matches('.modal')) {
            modalRemove();
        }
    });
});