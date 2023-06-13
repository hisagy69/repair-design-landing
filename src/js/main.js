document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.modal');
    const body = document.querySelector('body');
    const modalAdd = () => {
        modal.classList.add('modal_visible');
        body.classList.add('scroll-hide');
        document.addEventListener('keydown', keyRemoveHandler);
    };
    const modalRemove = () => {
        modal.classList.remove('modal_visible');
        body.classList.remove('scroll-hide');
        document.removeEventListener('keydown', keyRemoveHandler);
    };
    const keyRemoveHandler = (e) => {
        if (e.key === 'Escape') {
            modalRemove();
        }
    };
    document.addEventListener('click', (e) => {
        if (e.target.matches('[data-toggle="modal"]')) {
            modalAdd();
            return;
        }
        if (e.target.matches('.modal__close') || e.target.matches('.modal')) {
            modalRemove();
        }
    });
});