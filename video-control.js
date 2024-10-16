document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('video');

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        return (
            rect.top >= -windowHeight &&
            rect.bottom <= windowHeight * 2
        );
    }

    function checkVideos() {
        videos.forEach(video => {
            if (!isElementInViewport(video)) {
                video.pause();
            }
        });
    }

    function pauseOtherVideos(event) {
        const currentVideo = event.target;
        videos.forEach(video => {
            if (video !== currentVideo) {
                video.pause();
            }
        });
    }

    videos.forEach(video => {
        video.addEventListener('play', pauseOtherVideos);
    });

    window.addEventListener('scroll', checkVideos);
    window.addEventListener('resize', checkVideos);
});

