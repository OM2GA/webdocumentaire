document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.carousel-slider');
    const items = document.querySelectorAll('.carousel-item');

    if (!slider || items.length === 0) {
        return;
    }

    if (items.length < 3) {
        console.warn("Le carrousel nécessite au moins 3 éléments.");
        return;
    }

    let activeIndex = 1;

    function updateClasses() {
        const prevIndex = (activeIndex - 1 + items.length) % items.length;
        const nextIndex = (activeIndex + 1) % items.length;

        items.forEach((item, index) => {
            item.classList.remove('prev', 'active', 'next');

            if (index === activeIndex) {
                item.classList.add('active');
            } else if (index === prevIndex) {
                item.classList.add('prev');
            } else if (index === nextIndex) {
                item.classList.add('next');
            }
        });
    }

    function initEventListeners() {
        items.forEach((item, index) => {
            item.addEventListener('click', () => {
                if (index === activeIndex) {
                    return;
                }
                
                activeIndex = index;
                
                updateClasses();
            });
        });
    }

    initEventListeners();
    updateClasses();
});