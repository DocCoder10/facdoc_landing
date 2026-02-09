// Animation au défilement
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scroll-visible');
        }
    });
}, observerOptions);

// Appliquer l'animation aux éléments
document.addEventListener('DOMContentLoaded', () => {
    // Observer les éléments avec la classe scroll-hidden
    document.querySelectorAll('.scroll-hidden').forEach(el => {
        observer.observe(el);
    });
    
    // Galerie interactive
    const images = document.querySelectorAll('#gallery img');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;
    
    // Fonction pour afficher une image
    function showImage(index) {
        images.forEach((img, i) => {
            img.parentElement.style.display = i === index ? 'block' : 'none';
        });
    }
    
    // Initialiser la galerie (mode grille par défaut)
    function initGallery() {
        // Sur mobile, transformer en carrousel
        if (window.innerWidth < 768) {
            images.forEach((img, i) => {
                img.parentElement.style.display = i === 0 ? 'block' : 'none';
            });
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
        } else {
            // Sur desktop, afficher en grille
            images.forEach(img => {
                img.parentElement.style.display = 'block';
            });
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        }
    }
    
    // Navigation galerie
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        });
        
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        });
    }
    
    // Initialiser la galerie
    initGallery();
    
    // Re-initialiser la galerie au redimensionnement
    window.addEventListener('resize', initGallery);
    
    // Animation des boutons de téléchargement
    const downloadBtns = document.querySelectorAll('a[href*="download"], a[href*="releases"]');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Animation de clic
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Notification (simulée)
            console.log('Téléchargement de Facdoc démarré...');
        });
    });
    
    // Navigation fluide
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Effet de survol amélioré pour les cartes
    const cards = document.querySelectorAll('.card-hover');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.3s ease';
        });
    });
    
    // Notification de bienvenue
    setTimeout(() => {
        console.log('Bienvenue sur Facdoc - Votre assistant académique intelligent');
    }, 1000);
});
