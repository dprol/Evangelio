export function inici_pagines_amb_animacio() {
    const pages = document.querySelectorAll(".pagina");

    let currentPageIndex = 0;
    pages[0].classList.add('visible');

    // Function to handle navigation
    function scrollByDirection(direction) {
        const maxPageIndex = pages.length - 1;

        if (direction === 'left' && currentPageIndex > 0) {
            pages[currentPageIndex].classList.remove('visible');
            currentPageIndex--;
            pages[currentPageIndex].classList.add('visible');
        } else if (direction === 'right' && currentPageIndex < maxPageIndex) {
            pages[currentPageIndex].classList.remove('visible');
            currentPageIndex++;
            pages[currentPageIndex].classList.add('visible');
        }
    }

    // Scroll left
    function scrollLeft() {
        scrollByDirection('left');
    }

    // Scroll right
    function scrollRight() {
        scrollByDirection('right');
    }

    pages.forEach(pagina => {
        let touchStartX = 0;
        let touchEndX = 0;
        const swipeThreshold = 50; // Minimum distance in pixels to qualify as a swipe
    
        // Listen for touchstart event to record the starting X position
        pagina.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
    
        // Listen for touchend event to record the ending X position and determine swipe direction
        pagina.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
    
        // Function to handle the swipe logic
        function handleSwipe() {
            const deltaX = touchEndX - touchStartX;
    
            if (deltaX > swipeThreshold) {
                // Swipe Right
                scrollLeft();
            } else if (deltaX < -swipeThreshold) {
                // Swipe Left
                scrollRight();
            }
            // If the swipe distance is less than the threshold, do nothing
        }
    });
    
    // Keyboard Arrow Keys Event Handler
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowLeft':
                scrollLeft();
                break;
            case 'ArrowRight':
                scrollRight();
                break;
            default:
                // Do nothing for other keys
                break;
        }
    });


    // Function to set the --vh CSS variable
    function setVh() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    // Initial setting
    setVh();

    // Update on resize and orientation change
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);
    
}
