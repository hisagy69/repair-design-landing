import $ from 'jquery';
import 'jquery-mask-plugin';

const addMask = () => {
    $('[type="tel"').mask('+7-000-000-0000');
};

export default addMask;