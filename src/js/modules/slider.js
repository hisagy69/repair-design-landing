import $ from 'jquery';
import Swiper from 'swiper';
import {Navigation, Pagination} from 'swiper';

const swiperNavigationChange = (slider) => {
    slider[0].on('activeIndexChange', (swiper) => {
        const activeNavigation = $(`.swiper-navigation__card[data-navigation-number="${swiper.realIndex}"]`);
        if (!activeNavigation.hasClass('swiper-navigation__card_active')) {
            $('.swiper-navigation__card_active').removeClass('swiper-navigation__card_active');
            activeNavigation.addClass('swiper-navigation__card_active');
        }
    });
};

const swiperActiveSlideShow = (slider) => {
    $('.swiper-slide__progress-number').text((index) => {
        return `${index + 1}/${slider[0].slides.length}`;
    });
};

const addActiveClassNavigation = (slider) => {
    $(`.swiper-navigation__card[data-navigation-number="${slider[0].realIndex}"]`).addClass('swiper-navigation__card_active');
};

const addSwiperNavigationCardHandler = (slider) => {
    $(document).on('click', (e) => {
        const swiperNavigationCard = e.target.closest('.swiper-navigation__card');
        if (swiperNavigationCard && !$(swiperNavigationCard).hasClass('swiper-navigation__card_active')) {
            const navigationNumber =  $(swiperNavigationCard).data('navigationNumber');
            slider.forEach((swiper) => {
                swiper.slideToLoop(navigationNumber, 300);
            });
        }
    });
};

const sliderInit = () => {
    // const repairStylesSwiper = new Swiper('.repair-styles__swiper', {
    //     allowTouchMove: false
    // });
    
    const workingSwiper = new Swiper('.working-methods__swiper', {
        modules: [Navigation, Pagination],
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

    const projectsSwiper = new Swiper('.projects__swiper', {
        modules: [Navigation, Pagination],
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

    swiperNavigationChange(workingSwiper);
    swiperActiveSlideShow(workingSwiper);
    addActiveClassNavigation(workingSwiper);
    addSwiperNavigationCardHandler(workingSwiper);
};

export default sliderInit;
