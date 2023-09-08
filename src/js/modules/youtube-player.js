import $ from 'jquery';

const onYouTubeIframeAPIReady = () => {
    new YT.Player('video', {
        videoId: 'JpTvYzbDBZA',
        events: {
            'onReady': onPlayerReady
        }
    });
};

const onPlayerReady = (event) => {
    event.target.playVideo();
};

const addVideoPlayHandler = () => {
    $('.video__play').on('click', (e) => {
        $(e.target).hide()
        onYouTubeIframeAPIReady();
    });
};

export default addVideoPlayHandler;