import $ from 'jquery';

const addScrolElement = () => {
    $('body:first').append('<a href="#" class="scroll-top"></a>');
};
const addScrollHandler = () => {
    const scrollTop = $('.scroll-top');
    $(document).on('scroll', () => {
        if ($(window).scrollTop() > $('.hero').height()) {
            scrollTop.addClass('scroll-top_visible');
        } else {
            scrollTop.removeClass('scroll-top_visible');
        }
    });
};
const addScrollToHandler = () => {
    $(document).on('click', (e) => {
        if (e.target.matches('.scroll-top') || e.target.matches('.scroll-down')) {
            e.preventDefault();
            const href = $(e.target).attr('href');
            if (href === '#') {
                $('html,body').animate({scrollTop: 0},500);
                return;
            }
            $('html,body').animate({scrollTop: $(href).offset().top}, 500);
        }
    });
};
const scrollInit = () => {
    addScrolElement();
    addScrollHandler();
    addScrollToHandler();
};

export default scrollInit;