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

/* --- GESTION DU POP-UP ARTICLE --- */

// Sélection des éléments
const modal = document.getElementById('modal-laura');
const btnOpen = document.getElementById('btn-laura');
const btnClose = document.querySelector('.modal-close');

// Vérification que les éléments existent (pour éviter les erreurs sur les autres pages)
if (modal && btnOpen && btnClose) {

    // Ouvrir le modal au clic sur "LIRE +"
    btnOpen.addEventListener('click', (e) => {
        e.preventDefault(); // Empêche le comportement par défaut du lien/bouton
        modal.style.display = "flex"; // Affiche le modal (flex pour centrer)
    });

    // Fermer le modal au clic sur la croix
    btnClose.addEventListener('click', () => {
        modal.style.display = "none";
    });

    // Fermer le modal si on clique en dehors du contenu (sur le fond sombre)
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
}

/* --- GESTION DU POP-UP ARTICLE 1 (JUSTAUCORPS) --- */

const modalJustaucorps = document.getElementById('modal-justaucorps');
const btnOpenJustaucorps = document.getElementById('btn-justaucorps');
// On sélectionne le bouton fermer spécifique à cette modale
const btnCloseJustaucorps = document.querySelector('.modal-close-justaucorps');

if (modalJustaucorps && btnOpenJustaucorps && btnCloseJustaucorps) {

    // Ouvrir
    btnOpenJustaucorps.addEventListener('click', (e) => {
        e.preventDefault();
        modalJustaucorps.style.display = "flex";
    });

    // Fermer (Croix)
    btnCloseJustaucorps.addEventListener('click', () => {
        modalJustaucorps.style.display = "none";
    });

    // Fermer (Clic extérieur)
    window.addEventListener('click', (e) => {
        if (e.target === modalJustaucorps) {
            modalJustaucorps.style.display = "none";
        }
    });
}

/* --- GESTION DU POP-UP ARTICLE 3 (STRESS) --- */

const modalStress = document.getElementById('modal-stress');
const btnOpenStress = document.getElementById('btn-stress');
const btnCloseStress = document.querySelector('.modal-close-stress');

if (modalStress && btnOpenStress && btnCloseStress) {
    btnOpenStress.addEventListener('click', (e) => {
        e.preventDefault();
        modalStress.style.display = "flex";
    });

    btnCloseStress.addEventListener('click', () => {
        modalStress.style.display = "none";
    });

    window.addEventListener('click', (e) => {
        if (e.target === modalStress) {
            modalStress.style.display = "none";
        }
    });
}

/* --- GESTION DU POP-UP ARTICLE 4 (CONFIANCE) --- */

const modalConfiance = document.getElementById('modal-confiance');
const btnOpenConfiance = document.getElementById('btn-confiance');
const btnCloseConfiance = document.querySelector('.modal-close-confiance');

if (modalConfiance && btnOpenConfiance && btnCloseConfiance) {
    btnOpenConfiance.addEventListener('click', (e) => {
        e.preventDefault();
        modalConfiance.style.display = "flex";
    });

    btnCloseConfiance.addEventListener('click', () => {
        modalConfiance.style.display = "none";
    });

    window.addEventListener('click', (e) => {
        if (e.target === modalConfiance) {
            modalConfiance.style.display = "none";
        }
    });
}