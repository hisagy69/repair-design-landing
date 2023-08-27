import $ from "jquery";
import Swiper from 'swiper';
import 'jquery-validation';
import 'jquery-mask-plugin';
import 'wow.js';

$(function() {
    //modal
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
    $(document).on('click', (e) => {
        if (e.target.matches('[data-toggle="modal"]')) {
            modalAdd('modal');
            return;
        }
        if (e.target.matches('.modal__close') || e.target.matches('.modal')) {
            modalRemove('modal');
        }
    });
    // scroll-top
    $('body:first').append('<a href="#" class="scroll-top"></a>');
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
    // swiper change
    workingSwiper[0].on('activeIndexChange', (swiper) => {
        const activeNavigation = $(`.swiper-navigation__card[data-navigation-number="${swiper.realIndex}"]`);
        if (!activeNavigation.hasClass('wiper-navigation__card_active')) {
            $('.swiper-navigation__card_active').removeClass('swiper-navigation__card_active');
            activeNavigation.addClass('swiper-navigation__card_active');
        }
    });
    // slide index
    $('.swiper-slide__progress-number').text((index) => {
        return `${index + 1}/${workingSwiper[0].slides.length}`;
    });
    // navigation slider
    $(`.swiper-navigation__card[data-navigation-number="${workingSwiper[0].realIndex}"]`).addClass('swiper-navigation__card_active');
    $(document).on('click', (e) => {
        const swiperNavigationCard = e.target.closest('.swiper-navigation__card');
        if (swiperNavigationCard && !$(swiperNavigationCard).hasClass('swiper-navigation__card_active')) {
            const navigationNumber =  $(swiperNavigationCard).data('navigationNumber');
            workingSwiper.forEach((swiper) => {
                swiper.slideToLoop(navigationNumber, 300);
            });
        }
    });
    // animation
    new WOW().init();
    // модальное окно при завершении отправки
    const modalInfoAdd = (response) => {
        $('.modal-info__text').text(response === 'ok' ? 'Форма отправлена' : 'При отправке произошла ошибка, повторите отправку, пожалуйста позже');
        modalAdd('modal-info');
        $(document).on('click', (e) => {
            if (e.target.matches('.modal-info__close') || e.target.matches('.modal-info')) {
                modalRemove('modal-info');
            }
        });
    }
    // валидация форм
    $('form').each((inex, item) => {
        $(item).validate({
            rules: {
                userName: {
                    required: true,
                    minlength: 2,
                    maxlength: 15
                },
                userEmail: {
                    required: true,
                    email: true
                },
                userQuestion: 'required',
                userPhone: 'required'
            },
            messages: {
                userName: {
                    required: 'Пожалуйста укажите имя',
                    minlength: 'Имя должно быть не менее 2 символов',
                    maxlength: 'Имя должно быть не больше 15 символов'
                },
                userEmail: {
                    required: 'Укажите адрес электронной почты',
                    email: 'Адрес электронной почты должен быть в формате name@domain.com'
                },
                userQuestion: 'Заполните поле',
                userPhone: 'Введите номер телефона'
            },
            errorClass: "invalid",
            submitHandler: (form) => {
                $.ajax({
                    type: 'POST',
                    url: 'send.php',
                    data: $(form).serialize(),
                    success: (response) => {
                        form.reset();
                        modalRemove('modal');
                        modalInfoAdd(response);
                    },
                    error: (response) => {
                        modalRemove('modal');
                        modalInfoAdd(response);
                        console.error('Ошибка запроса', response);
                    }
                });
            }
        });
    });
    // маска телефона
    $('[type="tel"').mask('+7-000-000-0000');
    // карта
    const init = () => {
        var myMap = new ymaps.Map("map", {
            center: [47.244642, 39.723191],
            zoom: 17,
            controls: []
        });
        const myPlacemark = new ymaps.Placemark([47.244642, 39.723191], {}, {
            iconLayout: 'default#image',
            iconImageHref: './img/marker.svg',
            icon_imagesize: [50, 65],
            iconImageOffset: [-3, -42]
        });
        myMap.geoObjects.add(myPlacemark);
    }
    ymaps.ready(init);
});