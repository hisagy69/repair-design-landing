import $ from 'jquery';

const body = $('body');
const modalAdd = (modalClass) => {
    const modal = $(`.${modalClass}`);
    modal.addClass(`${modalClass}_visible`);
    body.addClass('scroll-hide');
    body.on('keydown', getKeyRemoveHandler(modalClass));
};

const modalRemove = (modalClass) => {
    const modal = $(`.${modalClass}`);
    if (modal.hasClass(`${modalClass}_visible`)) {
        modal.removeClass(`${modalClass}_visible`);
        body.removeClass('scroll-hide');
        body.on('keydown', getKeyRemoveHandler(modalClass));
        body.off('keydown');
    }
};

const getKeyRemoveHandler = (modalClass) => {
    return (e) => {
        if (e.key === 'Escape') {
            modalRemove(modalClass);
        }
    }
};

const addModalInfo = (response) => {
    $('.modal-info__text').text(response === 'ok' ? 'Форма отправлена' : 'При отправке произошла ошибка, повторите отправку, пожалуйста позже');
    modalAdd('modal-info');
    addModalInfoHandler();
};

const addModalHandler = () => {
    $(document).on('click', (e) => {
        if (e.target.matches('[data-toggle="modal"]')) {
            modalAdd('modal');
            return;
        }
        if (e.target.matches('.modal__close') || e.target.matches('.modal')) {
            modalRemove('modal');
        }
    });
};

const addModalInfoHandler = () => {
    $(document).on('click', (e) => {
        if (e.target.matches('.modal-info__close') || e.target.matches('.modal-info')) {
            modalRemove('modal-info');
        }
    });
};

export {addModalHandler, addModalInfo, modalRemove};
