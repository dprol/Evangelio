export function inici_pagines_amb_animacio() {
    const pages = document.querySelectorAll(".pagina");
    const wrapper = document.getElementById('wrapper');
    
    let currentPageIndex = 0;
    pages[currentPageIndex].classList.add('visible');

    let isTransitioning = false; // Flag to prevent overlapping transitions

    let isHorizontalSwipe = false; // Declare at the top of the function

    // Function to handle navigation
    // Function to handle navigation
    function scrollByDirection(direction) {
        if (isTransitioning) return; // Prevent new transitions if one is in progress
    
        const maxPageIndex = pages.length - 1;
    
        // Function to calculate the necessary scroll duration based on distance
        function calculateScrollDuration(scrollDistance) {
            const maxDuration = 1000; // Set maximum duration to 1 second
            const minDuration = 300; // Set minimum duration to 300ms for short distances
            const scrollSpeed = 2; // Adjust scroll speed factor (higher values make it slower)
    
            // Calculate the duration based on the scroll distance
            const duration = Math.min(maxDuration, Math.max(minDuration, scrollDistance * scrollSpeed));
            return duration;
        }
    
        if (direction === 'left' && currentPageIndex > 0) {
            isTransitioning = true;
            const lastPageIndex = currentPageIndex;
            currentPageIndex--;
    
            const scrollDistance = pages[lastPageIndex].scrollTop;
            const scrollDuration = calculateScrollDuration(scrollDistance);
    
            // Scroll to top before making the page invisible
            pages[lastPageIndex].scrollTo({
                top: 0,
                behavior: 'smooth' // Enable smooth scrolling to the top
            });
    
            // After scrolling to the top, proceed with hiding and showing pages
            setTimeout(() => {
                pages[currentPageIndex].classList.add('visible');
                pages[lastPageIndex].classList.add('fading-out');
                
                // Wait for the transition to complete before resetting classes
                setTimeout(() => {
                    pages[lastPageIndex].classList.remove('fading-out');
                    pages[lastPageIndex].classList.remove('visible');
                    isTransitioning = false;
                }, 1000); // Match the CSS animation duration (1s)
            }, scrollDuration); // Delay to allow the smooth scroll to top
        } else if (direction === 'right' && currentPageIndex < maxPageIndex) {
            isTransitioning = true;
            const lastPageIndex = currentPageIndex;
            currentPageIndex++;
    
            const scrollDistance = pages[lastPageIndex].scrollTop;
            const scrollDuration = calculateScrollDuration(scrollDistance);
    
            // Scroll to top before making the page invisible
            pages[lastPageIndex].scrollTo({
                top: 0,
                behavior: 'smooth' // Enable smooth scrolling to the top
            });
    
            // After scrolling to the top, proceed with hiding and showing pages
            setTimeout(() => {
                pages[currentPageIndex].classList.add('visible');
                pages[lastPageIndex].classList.add('fading-out');
                
                // Wait for the transition to complete before resetting classes
                setTimeout(() => {
                    pages[lastPageIndex].classList.remove('fading-out');
                    pages[lastPageIndex].classList.remove('visible');
                    isTransitioning = false;
                }, 1000); // Match the CSS animation duration (1s)
            }, scrollDuration); // Delay to allow the smooth scroll to top
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
        let isScrolling; // Variable to track the scroll timeout
    
        page.addEventListener('scroll', () => {
            // Clear the timeout if a scroll event occurs again
            window.clearTimeout(isScrolling);
    
            // Set a timeout to detect when scrolling has stopped
            isScrolling = setTimeout(() => {
                // Check if the scroll position is within 200px of the top
                if (page.scrollTop <= 80) {
                    // Smoothly scroll to the top
                    page.scrollTo({
                        top: 0,
                        behavior: 'smooth' // Enable smooth scrolling
                    });
                }
            }, 150); // Adjust the delay (150ms) based on your preference
        });
    });

}
