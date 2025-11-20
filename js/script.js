document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.nav-arrow.left');
    const nextBtn = document.querySelector('.nav-arrow.right');

    if (items.length === 0) return;

    let activeIndex = 1; // On commence par la 2ème image (index 1) pour être centré si 3 images

    // Fonction principale de mise à jour
    function updateCarousel() {
        // 1. Calcul des index précédents/suivants pour les classes CSS
        const prevIndex = (activeIndex - 1 + items.length) % items.length;
        const nextIndex = (activeIndex + 1) % items.length;

        // 2. Mise à jour des images (positions)
        items.forEach((item, index) => {
            item.classList.remove('prev', 'active', 'next');

            if (index === activeIndex) {
                item.classList.add('active');
            } else if (index === prevIndex) {
                item.classList.add('prev');
            } else if (index === nextIndex) {
                item.classList.add('next');
            }
            // Les autres images restent cachées ou empilées par défaut via le CSS
        });

        // 3. Mise à jour des points (dots)
        dots.forEach((dot, index) => {
            if (index === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // --- Écouteurs d'événements (Interactions) ---

    // 1. Clic sur les flèches
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            activeIndex = (activeIndex - 1 + items.length) % items.length;
            updateCarousel();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            activeIndex = (activeIndex + 1) % items.length;
            updateCarousel();
        });
    }

    // 2. Clic sur les points
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            activeIndex = index;
            updateCarousel();
        });
    });

    // 3. Clic direct sur les images (comme avant)
    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            if (index !== activeIndex) {
                activeIndex = index;
                updateCarousel();
            }
        });
    });

    // Initialisation
    updateCarousel();
});