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
};

const addMap = () => {
    ymaps.ready(init);
};

export default addMap;