import $ from 'jquery';
import {addModalHandler} from './modules/modal';
import scrollInit from './modules/scroll-top';
import sliderInit from './modules/slider';
import animationAdd from './modules/animation';
import addValidation from './modules/validation';
import addMask from './modules/mask';
import addVideoPlayHandler from './modules/youtube-player';
import tabsInit from './modules/tabs';
import addMap from './modules/map';

$(() => {
    addModalHandler();
    scrollInit();
    sliderInit();
    animationAdd();
    addValidation();
    addMask();
    addVideoPlayHandler();
    tabsInit();
    addMap();
});
