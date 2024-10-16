export function inici_pagines_amb_animacio() {
    const pages = document.querySelectorAll(".pagina");
    const wrapper = document.getElementById('wrapper');
    
    let currentPageIndex = 0;
    pages[currentPageIndex].classList.add('visible');

    let isTransitioning = false; // Flag to prevent overlapping transitions

    let isHorizontalSwipe = false; // Declare at the top of the function

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
            }, 1000); // Match the CSS animation duration (1s)
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
            }, 1000); // Match the CSS animation duration (1s)
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
    if (wrapper) {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;
        const swipeThreshold = 150; // Minimum distance in pixels to qualify as a swipe
        const swipeAngleThreshold = 100; // Maximum angle to consider swipe as horizontal

        // Listen for touchstart event on the wrapper
        wrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].clientX; // Use clientX
            touchStartY = e.changedTouches[0].clientY; // Use clientY
            isHorizontalSwipe = false;
        }, { passive: true });

        // Listen for touchmove event to determine swipe direction early
        wrapper.addEventListener('touchmove', (e) => {
            const touchMoveX = e.changedTouches[0].clientX; // Use clientX
            const touchMoveY = e.changedTouches[0].clientY; // Use clientY
            const deltaX = touchMoveX - touchStartX;
            const deltaY = touchMoveY - touchStartY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

            if (distance < swipeThreshold) {
                // Swipe distance too short to determine
                return;
            }

            if (Math.abs(angle) < swipeAngleThreshold) {
                // Detected horizontal swipe
                isHorizontalSwipe = true;
                // Prevent vertical scrolling
                e.preventDefault();
            }
        }, { passive: false }); // Set passive to false to allow preventDefault

        // Listen for touchend event on the wrapper
        wrapper.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX; // Use clientX
            touchEndY = e.changedTouches[0].clientY; // Use clientY
            handleSwipe();
        }, { passive: true });

        // Function to handle the swipe logic
        function handleSwipe() {
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;

            // Debugging logs (optional, remove in production)
            console.log(`Swipe distance: ${deltaX}px horizontal, ${deltaY}px vertical`);

            if (Math.abs(deltaX) < 150 || Math.abs(deltaY) > 100) {
                // Swipe distance too short
                return;
            }

            if (deltaX > 0) {
                // Swipe Right
                console.log('Swipe Left');
                scrollLeft();
            } else {
                // Swipe Left
                console.log('Swipe Right');
                scrollRight();
            }
            // Else, it's a vertical swipe; do nothing to allow vertical scrolling
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

    pages.forEach((page, index) => {
        page.addEventListener('scroll', () => {
            // Check if the scroll position is within 40px of the top
            if (page.scrollTop <= 200) {
                page.scrollTop = 0; // Snap to the top
            }
        });
    });
}
