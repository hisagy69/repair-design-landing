import $ from 'jquery';
import 'jquery-validation';
import {modalRemove, addModalInfo} from './modal';

const addValidation = () => {
    $('form').each((_inex, item) => {
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
                        addModalInfo(response);
                    },
                    error: (response) => {
                        modalRemove('modal');
                        addModalInfo(response);
                        console.error('Ошибка запроса', response);
                    }
                });
            }
        });
    });
};

export default addValidation;