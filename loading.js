// JavaScript для управления окном загрузки
window.addEventListener('load', function() {
    var loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'none';
});

// JavaScript для анимации текста
function typeWriter(element, text, speed) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            setTimeout(function() {
                element.innerHTML = '';
                i = 0;
                type();
            }, 1000); // Задержка перед повтором анимации
        }
    }
    type();
}

document.addEventListener('DOMContentLoaded', function() {
    var loadingMessage = document.querySelector('.loading-message');
    typeWriter(loadingMessage, 'Loading...', 70);
});
