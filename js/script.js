document.addEventListener('DOMContentLoaded', () => {

    /**
     * Fonction générique pour gérer un carrousel "Cover Flow"
     * @param {string} containerSelector - Sélecteur du conteneur parent
     * @param {string} itemSelector - Sélecteur des items du carrousel
     * @param {string} prevBtnSelector - Sélecteur du bouton Précédent
     * @param {string} nextBtnSelector - Sélecteur du bouton Suivant
     * @param {string} dotsSelector - Sélecteur des points de navigation (optionnel)
     */
    function setupCarousel(containerSelector, itemSelector, prevBtnSelector, nextBtnSelector, dotsSelector = null) {
        const items = document.querySelectorAll(itemSelector);
        const prevBtn = document.querySelector(prevBtnSelector);
        const nextBtn = document.querySelector(nextBtnSelector);
        const dots = dotsSelector ? document.querySelectorAll(dotsSelector) : [];

        if (items.length === 0) return;

        let activeIndex = 0;

        function updateCarousel() {
            const total = items.length;

            // Calcul des index relatifs
            const prevIndex = (activeIndex - 1 + total) % total;
            const nextIndex = (activeIndex + 1) % total;

            items.forEach((item, index) => {
                // Nettoyage des classes
                item.classList.remove('active', 'prev', 'next');

                // Attribution des nouvelles classes
                if (index === activeIndex) {
                    item.classList.add('active');
                } else if (index === prevIndex) {
                    item.classList.add('prev');
                } else if (index === nextIndex) {
                    item.classList.add('next');
                }
                // Les autres restent sans classe (cachés/derrière via CSS)
            });

            // Mise à jour des points si existants
            if (dots.length > 0) {
                dots.forEach((dot, index) => {
                    if (index === activeIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
        }

        // --- Événements ---

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

        // Clic direct sur un item pour le rendre actif
        items.forEach((item, index) => {
            item.addEventListener('click', () => {
                if (index !== activeIndex) {
                    activeIndex = index;
                    updateCarousel();
                }
            });
        });

        // Clic sur les points
        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    activeIndex = index;
                    updateCarousel();
                });
            });
        }

        // Initialisation
        updateCarousel();
    }

    // --- 1. Initialisation du Carrousel GALERIE (Bas de page) ---
    setupCarousel(
        '.carousel-slider',       // Conteneur
        '.carousel-item',         // Items
        '.nav-arrow.left',        // Btn Prev
        '.nav-arrow.right',       // Btn Next
        '.dot'                    // Dots (points)
    );

    // --- 2. Initialisation du Carrousel ARTICLES (Haut de page) ---
    setupCarousel(
        '.article-slider-container', // Conteneur
        '.article-slider-item',      // Items
        '.article-nav-arrow.left',   // Btn Prev
        '.article-nav-arrow.right',  // Btn Next
        '.article-dot'               // Dots (points) pour articles
    );
});


/* --- GESTION DES MODALES --- */

function setupModal(modalId, btnOpenId, btnCloseClass) {
    const modal = document.getElementById(modalId);
    const btnOpen = document.getElementById(btnOpenId);
    const btnClose = document.querySelector(btnCloseClass);

    if (modal && btnOpen && btnClose) {
        btnOpen.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = "flex";
        });

        btnClose.addEventListener('click', () => {
            modal.style.display = "none";
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    }
}

// Initialisation des modales (si présentes sur la page courante)
setupModal('modal-laura', 'btn-laura', '.modal-close');
setupModal('modal-justaucorps', 'btn-justaucorps', '.modal-close-justaucorps');
setupModal('modal-stress', 'btn-stress', '.modal-close-stress');
setupModal('modal-confiance', 'btn-confiance', '.modal-close-confiance');
setupModal('modal-histoire', 'btn-histoire', '.modal-close-histoire');

/* --- GESTION LECTEUR AUDIO UNIQUE ET VINYLE --- */
document.addEventListener('DOMContentLoaded', () => {
    // On sélectionne les éléments uniques par leurs IDs
    const playButton = document.getElementById('main-play-btn');
    const audio = document.getElementById('main-audio');
    const vinylImage = document.getElementById('current-vinyl');

    // Vérification de sécurité si les éléments existent sur la page
    if (playButton && audio && vinylImage) {

        const playerContainer = playButton.closest('.custom-audio-player');
        const iconPlay = playButton.querySelector('.icon-play');
        const iconPause = playButton.querySelector('.icon-pause');

        playButton.addEventListener('click', () => {
            if (audio.paused) {
                // --- Lancer la lecture ---
                audio.play();

                // Changer les icônes
                iconPlay.style.display = 'none';
                iconPause.style.display = 'block';

                // Activer les animations (Waveform ET Vinyle)
                playerContainer.classList.add('playing');
                vinylImage.classList.add('playing'); // C'est cette ligne qui fait tourner le disque

            } else {
                // --- Mettre en pause ---
                audio.pause();

                // Changer les icônes
                iconPlay.style.display = 'block';
                iconPause.style.display = 'none';

                // Arrêter les animations
                playerContainer.classList.remove('playing');
                vinylImage.classList.remove('playing'); // Le disque s'arrête
            }
        });

        // (Optionnel) Si l'audio se termine tout seul, on remet le bouton play et on arrête le vinyle
        audio.addEventListener('ended', () => {
            iconPlay.style.display = 'block';
            iconPause.style.display = 'none';
            playerContainer.classList.remove('playing');
            vinylImage.classList.remove('playing');
        });
    }
});