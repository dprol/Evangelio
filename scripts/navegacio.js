export function inici_pagines_amb_animacio() {
    const pages = document.querySelectorAll(".pagina");
    const miniBookWrapper = document.getElementById('miniBookWrapper');
    const miniBook = document.getElementById('mini-book');

    const miniBookImages = document.querySelectorAll(".mini-book-img");

    let currentPageIndex = 0;
    pages[currentPageIndex].classList.add('visible');
    miniBookImages[currentPageIndex].classList.add('visible');

    let isTransitioning = false;
    let isHorizontalSwipe = false;

    // Function to handle navigation
    function scrollByDirection(direction) {
        if (isTransitioning) return; // Prevent new transitions if one is in progress

        const maxPageIndex = pages.length - 1;

        if (direction === 'left' && currentPageIndex > 0) {
            isTransitioning = true;
            const outgoingPageIndex = currentPageIndex;
            const incomingPageIndex = currentPageIndex - 1;
            currentPageIndex = incomingPageIndex;

            // Scroll to top before making the page invisible
            pages[outgoingPageIndex].scrollTo({ top: 0, behavior: 'smooth' });

            setTimeout(() => {
                const outgoingImage = miniBookImages[outgoingPageIndex];
                const incomingImage = miniBookImages[incomingPageIndex];

                // Start flipping out the outgoing image
                incomingImage.classList.add('visible');
                incomingImage.classList.add('flipping-in');
                pages[incomingPageIndex].classList.add('visible');
                pages[incomingPageIndex].classList.add('fading-in');
                pages[outgoingPageIndex].classList.add('fading-out');

                // Listen for the flip-out animation to end
                setTimeout(() => {
                    // Start flipping in the incoming image
                    outgoingImage.classList.remove('visible');
                    incomingImage.classList.remove('flipping-in');
                    pages[outgoingPageIndex].classList.remove('visible', 'fading-out');
                    isTransitioning = false;
                }, 900);

                

            }, 300); // Wait for the scroll to complete
        } else if (direction === 'right' && currentPageIndex < maxPageIndex) {
            isTransitioning = true;
            const outgoingPageIndex = currentPageIndex;
            const incomingPageIndex = currentPageIndex + 1;
            currentPageIndex = incomingPageIndex;

            // Scroll to top before making the page invisible
            pages[outgoingPageIndex].scrollTo({ top: 0, behavior: 'smooth' });

            setTimeout(() => {
                const outgoingImage = miniBookImages[outgoingPageIndex];
                const incomingImage = miniBookImages[incomingPageIndex];

                // Start flipping out the outgoing image
                incomingImage.classList.add('visible');
                outgoingImage.classList.add('flipping-out');
                pages[incomingPageIndex].classList.add('visible');
                pages[incomingPageIndex].classList.add('fading-in');
                pages[outgoingPageIndex].classList.add('fading-out');

                // Listen for the flip-out animation to end
                setTimeout(() => {
                    // Start flipping in the incoming image
                    outgoingImage.classList.remove('visible', 'flipping-out');
                    // Update page visibility
                    pages[outgoingPageIndex].classList.remove('visible', 'fading-out');
                    pages[incomingPageIndex].classList.remove('fading-in');
                isTransitioning = false;

                }, 900);


            }, 300); // Wait for the scroll to complete
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

    // Handle swipe gestures
    function handleSwipeGestures() {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;
        const swipeThreshold = 50; // Minimum distance in pixels to qualify as a swipe
        const swipeAngleThreshold = 45; // Maximum angle to consider swipe as horizontal

        // Listen for touchstart event on the miniBookWrapper
        document.body.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].clientX;
            touchStartY = e.changedTouches[0].clientY;
            isHorizontalSwipe = false;
        }, { passive: true });

        // Listen for touchmove event to determine swipe direction early
        document.body.addEventListener('touchmove', (e) => {
            const touchMoveX = e.changedTouches[0].clientX;
            const touchMoveY = e.changedTouches[0].clientY;
            const deltaX = touchMoveX - touchStartX;
            const deltaY = touchMoveY - touchStartY;
            const angle = Math.atan2(Math.abs(deltaY), Math.abs(deltaX)) * (180 / Math.PI);

            // Check if the swipe is primarily horizontal
            if (Math.abs(deltaX) > swipeThreshold && angle < swipeAngleThreshold) {
                isHorizontalSwipe = true;
                e.preventDefault(); // Prevent vertical scrolling
            }
        }, { passive: false });

        // Listen for touchend event on the miniBookWrapper
        document.body.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            touchEndY = e.changedTouches[0].clientY;
            handleSwipe();
        }, { passive: true });

        // Function to handle the swipe logic
        function handleSwipe() {
            const deltaX = touchEndX - touchStartX;

            // Check for horizontal swipe
            if (isHorizontalSwipe) {
                if (deltaX > 0) {
                    scrollLeft();
                } else {
                    scrollRight();
                }
            }
        }
    }

    // Handle arrow key navigation
    document.addEventListener('keydown', (e) => {
        if (isTransitioning) return;

        switch (e.key) {
            case 'ArrowLeft':
                scrollLeft();
                break;
            case 'ArrowRight':
                scrollRight();
                break;
            default:
                break;
        }
    });


    // Initial setup
    function initializeMiniBook() {
        miniBookImages.forEach((img, index) => {
            if (index === currentPageIndex) {
                img.classList.add('visible');
            } else {
                img.classList.remove('visible');
            }
        });
    }

    initializeMiniBook();
    handleSwipeGestures();
}
