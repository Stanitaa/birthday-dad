document.addEventListener('DOMContentLoaded', () => {
    const photoContainer = document.getElementById('photo-container');
    const messageContainer = document.getElementById('message-container');
    const backgroundContainer = document.querySelector('.background-container');
    const particlesContainer = document.getElementById('particles');

    // Initial State: Soft Red
    if (backgroundContainer) {
        backgroundContainer.classList.add('soft-red');
    } else {
        console.error('Background container not found!');
    }

    // We expect 4 photos
    const photos = [
        'images/photo1.jpg',
        'images/photo2.jpg',
        'images/photo3.jpg',
        'images/photo4.jpg'
    ];

    const clickedPhotos = new Set();
    let autoCloseTimer = null;

    let loadedPhotos = 0;

    const messages = [
        "Dad your the besttt!",
        "You always make me smile!",
        "A truly magical day together.",
        "To many more happy moments!"
    ];

    photos.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'floating-photo';

        // Random initial position
        img.style.left = `${Math.random() * 70 + 5}%`;
        img.style.top = `${Math.random() * 70 + 5}%`;

        // Random delay for animation
        img.style.animationDelay = `${Math.random() * 5}s`;

        img.addEventListener('click', () => {
            clickedPhotos.add(index);
            backgroundContainer.classList.remove('soft-red');
            backgroundContainer.classList.add('red-theme');
            openModal(src, messages[index]);

            // Auto close after 4 seconds
            clearTimeout(autoCloseTimer);
            autoCloseTimer = setTimeout(closePhotoModal, 4000);
        });

        img.onload = () => {
            img.classList.add('show', 'animate');
            loadedPhotos++;
            if (loadedPhotos === photos.length) {
                // Photos loaded, but we wait for interactions now
            }
        };

        // Fallback for missing images (for testing)
        img.onerror = () => {
            console.error(`Failed to load ${src}, using placeholder`);
            img.style.background = 'rgba(255,255,255,0.2)';
            img.style.width = '200px';
            img.style.height = '250px';
            img.classList.add('show', 'animate');
            loadedPhotos++;
        };

        photoContainer.appendChild(img);
    });

    const modal = document.getElementById('photo-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    const closeModal = document.getElementById('close-modal');
    const teaserContainer = document.getElementById('teaser-container');
    const teaserButton = document.getElementById('teaser-button');

    function openModal(src, message) {
        modalImg.src = src;
        modalCaption.textContent = message;
        modal.classList.add('active');
    }

    function checkAllClicked() {
        if (clickedPhotos.size === photos.length) {
            setTimeout(startTransition, 1000);
        }
    }

    function closePhotoModal() {
        modal.classList.remove('active');
        backgroundContainer.classList.remove('red-theme');
        backgroundContainer.classList.add('soft-red');
        clearTimeout(autoCloseTimer);
        checkAllClicked();
    }

    closeModal.addEventListener('click', closePhotoModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closePhotoModal();
        }
    });

    function startTransition() {
        // Fade out all photos and hearts
        const elementsToFade = document.querySelectorAll('.floating-photo, .heart');
        elementsToFade.forEach(el => el.classList.add('fade-out'));

        // Final bold red background
        backgroundContainer.classList.remove('soft-red');
        backgroundContainer.classList.add('bold-red');

        // Show teaser button after elements fade away
        setTimeout(showTeaser, 1500);
    }

    function showTeaser() {
        teaserContainer.classList.add('active');
    }

    teaserButton.addEventListener('click', () => {
        teaserContainer.classList.remove('active');
        document.body.classList.add('bold-celebration');
        setTimeout(revealMessage, 500);
    });

    function revealMessage() {
        messageContainer.classList.add('show');
        particlesContainer.classList.add('celebration');

        // Add extra hearts and sparkles for celebration
        createHearts();
        createParticles();
    }

    // Festive background particles
    createParticles();
    createHearts();
});

function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 70; i++) { // Increased particle count
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = `${Math.random() * 100}%`;
        p.style.top = `${Math.random() * 100}%`;

        // Randomly make some particles white for "floating light" feel
        if (Math.random() > 0.5) {
            p.style.background = 'white';
            p.style.boxShadow = '0 0 10px white';
        }

        p.style.animationDuration = `${Math.random() * 3 + 2}s`;
        p.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(p);
    }
}

function createHearts() {
    const container = document.getElementById('particles');
    const heartSymbols = ['❤️', '💖', '💗', '💕'];
    for (let i = 0; i < 15; i++) {
        const h = document.createElement('div');
        h.className = 'heart';
        h.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        h.style.left = `${Math.random() * 100}%`;
        h.style.animationDuration = `${Math.random() * 10 + 10}s`;
        h.style.animationDelay = `${Math.random() * 10}s`;
        h.style.fontSize = `${Math.random() * 20 + 10}px`;
        container.appendChild(h);
    }
}
