document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('video');

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
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
