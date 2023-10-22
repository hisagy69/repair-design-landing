import $ from 'jquery';

const tabHabdler = () => {
  $(document).on('click', (e) => {
    const tab = $(e.target.closest('.repair-styles__tab'));
    if (!tab.hasClass('repair-styles__tab_active')) {
      tabShow(tab.data('tab-index'));
    }
  });
};
const tabShow = (activeIndex) => {
  const tabActive = $('.repair-styles__tab_active');
  const slideActive = $('.repair-styles__slide_active');
  tabActive.removeClass('repair-styles__tab_active');
  slideActive.removeClass('repair-styles__slide_active');
  $(`[data-tab-index="${activeIndex}"]`).addClass('repair-styles__tab_active');
  $(`[data-slide-index="${activeIndex}"]`).addClass('repair-styles__slide_active');
};
const tabsInit = () => {
  tabHabdler();
};
export default tabsInit;
