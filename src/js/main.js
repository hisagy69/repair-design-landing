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
    // scroll-top
    $('body').append('<a href="#" class="scroll-top"></a>');
    const scrollTop = $('.scroll-top');
    $(document).on('scroll', () => {
        if ($(window).scrollTop() > $('.hero').height()) {
            scrollTop.addClass('scroll-top_visible');
        } else {
            scrollTop.removeClass('scroll-top_visible');
        }
    });
    // scroll-to
    $(document).on('click', (e) => {
        e.preventDefault();
        if (e.target.matches('.scroll-top') || e.target.matches('.scroll-down')) {
            const href = $(e.target).attr('href');
            if (href === '#') {
                $('html,body').animate({scrollTop: 0},500);
                return;
            }
            $('html,body').animate({scrollTop: $(href).offset().top}, 500);
        }
    });
    //slider
    const projectsSwiper = new Swiper('.projects__swiper', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets'
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        allowTouchMove: false
    });

    const workingSwiper = new Swiper('.working-methods__swiper', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets'
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        allowTouchMove: false
    });
});