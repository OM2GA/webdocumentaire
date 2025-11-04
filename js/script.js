// Attend que le contenu de la page (HTML) soit entièrement chargé
document.addEventListener('DOMContentLoaded', () => {
    
    // Sélectionne les éléments du carrousel
    const slider = document.querySelector('.carousel-slider');
    const items = document.querySelectorAll('.carousel-item');

    // Si le carrousel n'existe pas, on arrête le script
    if (!slider || items.length === 0) {
        return;
    }

    // Cette logique fonctionne mieux avec 3 items ou plus
    if (items.length < 3) {
        console.warn("Le carrousel nécessite au moins 3 éléments.");
        return;
    }

    // On commence avec l'index 1 (le 2ème item) comme actif
    let activeIndex = 1;

    /**
     * Attribue les classes .prev, .active, .next en fonction de l'activeIndex
     */
    function updateClasses() {
        // Calcule les index pour 'précédent' et 'suivant'
        // L'opérateur % (modulo) gère la boucle infinie
        const prevIndex = (activeIndex - 1 + items.length) % items.length;
        const nextIndex = (activeIndex + 1) % items.length;

        items.forEach((item, index) => {
            // Nettoie toutes les classes de position
            item.classList.remove('prev', 'active', 'next');

            // Attribue la bonne classe
            if (index === activeIndex) {
                item.classList.add('active');
            } else if (index === prevIndex) {
                item.classList.add('prev');
            } else if (index === nextIndex) {
                item.classList.add('next');
            }
            // Les autres items n'auront pas de classe de position
            // et resteront cachés ou au centre par défaut (selon le CSS)
            // Pour 3 items, tous les items auront une classe.
        });
    }

    /**
     * Initialise les écouteurs d'événements
     */
    function initEventListeners() {
        items.forEach((item, index) => {
            item.addEventListener('click', () => {
                // Si on clique sur l'item déjà actif, on ne fait rien
                if (index === activeIndex) {
                    return;
                }
                
                // Met à jour l'index actif
                activeIndex = index;
                
                // Met à jour les classes, ce qui déclenche l'animation CSS
                updateClasses();
            });
        });
    }

    // --- Exécution ---
    initEventListeners();
    updateClasses(); // Applique l'état initial (item 1 au centre)
});