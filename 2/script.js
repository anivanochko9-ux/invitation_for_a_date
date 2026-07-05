const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const gifResult = document.querySelector(".gif-result");
const heartLoader = document.querySelector(".cssload-main");
const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");

// ===== ПЕРЕВІРКА НАЯВНОСТІ ВІДЕО =====
function checkVideoAvailability() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        // Якщо відео не завантажилось - показуємо емодзі
        video.addEventListener('error', function() {
            this.style.display = 'none';
            const fallback = this.parentElement.querySelector('.fallback-emoji');
            if (fallback) {
                fallback.style.display = 'block';
            }
        });
        
        // Перевіряємо через таймер
        setTimeout(() => {
            if (video.readyState === 0) {
                video.style.display = 'none';
                const fallback = video.parentElement.querySelector('.fallback-emoji');
                if (fallback) {
                    fallback.style.display = 'block';
                }
            }
        }, 2000);
    });
}

// ===== Функція для переміщення кнопки "No" =====
function moveNoButton() {
    const containerRect = questionContainer.getBoundingClientRect();
    const btnWidth = noBtn.offsetWidth || 100;
    const btnHeight = noBtn.offsetHeight || 50;
    const maxX = containerRect.width - btnWidth - 20;
    const maxY = containerRect.height - btnHeight - 20;
    const newX = Math.floor(Math.random() * Math.max(0, maxX));
    const newY = Math.floor(Math.random() * Math.max(0, maxY));
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
}

// Для десктопів - наведення миші
noBtn.addEventListener("mouseover", moveNoButton);

// Для мобільних - дотик
noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moveNoButton();
});

// Для мобільних - при кліку
noBtn.addEventListener("click", (e) => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        e.preventDefault();
        moveNoButton();
    }
});

// Автозапуск відео при взаємодії
document.addEventListener('DOMContentLoaded', () => {
    // Перевіряємо відео
    checkVideoAvailability();
    
    const videos = document.querySelectorAll('video');
    const playVideos = () => {
        videos.forEach(video => {
            if (video.style.display !== 'none') {
                video.play().catch(() => {});
            }
        });
        document.removeEventListener('touchstart', playVideos);
        document.removeEventListener('click', playVideos);
    };
    
    document.addEventListener('touchstart', playVideos);
    document.addEventListener('click', playVideos);
});

// yes button functionality
yesBtn.addEventListener("click", () => {
    questionContainer.style.display = "none";
    heartLoader.style.display = "inherit";

    const timeoutId = setTimeout(() => {
        heartLoader.style.display = "none";
        resultContainer.style.display = "inherit";
        
        // Перевіряємо чи відео видиме
        if (gifResult && gifResult.style.display !== 'none') {
            gifResult.play().catch(() => {});
        }
    }, 3000);
});
