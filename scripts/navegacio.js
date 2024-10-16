export function inici_pagines_amb_animacio() {
    const pages = document.querySelectorAll(".pagina");

    let currentPageIndex = 0;
    pages[currentPageIndex].classList.add('visible');

    let isTransitioning = false; // Flag to prevent overlapping transitions

    // Function to handle navigation
    function scrollByDirection(direction) {
        if (isTransitioning) return; // Prevent new transitions if one is in progress

        const maxPageIndex = pages.length - 1;

        if (direction === 'left' && currentPageIndex > 0) {
            isTransitioning = true;
            const lastPageIndex = currentPageIndex;
            currentPageIndex--;
            pages[currentPageIndex].classList.add('visible');
            pages[lastPageIndex].classList.add('fading-out');
            
            // Wait for the transition to complete before resetting classes
            setTimeout(() => {
                pages[lastPageIndex].classList.remove('fading-out');
                pages[lastPageIndex].classList.remove('visible');
                isTransitioning = false;
            }, 500); // Match the CSS transition duration
        } else if (direction === 'right' && currentPageIndex < maxPageIndex) {
            isTransitioning = true;
            const lastPageIndex = currentPageIndex;
            currentPageIndex++;
            pages[currentPageIndex].classList.add('visible');
            pages[lastPageIndex].classList.add('fading-out');
            
            // Wait for the transition to complete before resetting classes
            setTimeout(() => {
                pages[lastPageIndex].classList.remove('fading-out');
                pages[lastPageIndex].classList.remove('visible');
                isTransitioning = false;
            }, 500); // Match the CSS transition duration
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

    // Optimize event listeners using event delegation
    const wrapper = document.getElementById('wrapper');
    if (wrapper) {
        let touchStartX = 0;
        let touchEndX = 0;
        const swipeThreshold = 150; // Minimum distance in pixels to qualify as a swipe

        // Listen for touchstart event on the wrapper
        wrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        // Listen for touchend event on the wrapper
        wrapper.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

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
    }

    // Keyboard Arrow Keys Event Handler
    document.addEventListener('keydown', (e) => {
        if (isTransitioning) return; // Prevent navigation during transition

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
}
