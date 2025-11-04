document.addEventListener('DOMContentLoaded', () => {
    
    const slider = document.querySelector('.carousel-slider');
    const items = document.querySelectorAll('.carousel-item');
    
    if (!slider || items.length === 0) {
        return;
    }

    let activeIndex = Math.floor(items.length / 2);

    function updateCarousel() {
        const container = document.querySelector('.carousel-container');
        
        if (!container || !items[activeIndex]) {
            return;
        }

        const containerWidth = container.offsetWidth;
        const containerCenter = containerWidth / 2;

        const activeItem = items[activeIndex];
        const itemWidth = activeItem.offsetWidth;
        const itemCenter = activeItem.offsetLeft + (itemWidth / 2);

        const translateX = containerCenter - itemCenter;

        slider.style.transform = `translateX(${translateX}px)`;

        items.forEach((item, index) => {
            if (index === activeIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    function initEventListeners() {
        items.forEach((item, index) => {
            item.addEventListener('click', () => {
                activeIndex = index;
                updateCarousel();
            });
        });

        window.addEventListener('resize', updateCarousel);
    }

    initEventListeners();
    
    setTimeout(updateCarousel, 100);
});