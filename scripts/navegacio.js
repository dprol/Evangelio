export function inici_pagines_amb_animacio() {
    const pages = document.querySelectorAll(".pagina");
    const miniBookImages = document.querySelectorAll(".mini-book img");
    const wrapper = document.getElementById("wrapper");
    const scrollLeftButton = document.getElementById("scroll-left");
    const scrollRightButton = document.getElementById("scroll-right");

    let currentPageIndex = 0;
    pages[0].classList.add('visible');

    // Function to update mini-book images
    function updateMiniBookImages() {
        if (currentPageIndex > 0) {
            miniBookImages[currentPageIndex - 1].classList.add('pasada');
        }
        miniBookImages[currentPageIndex].classList.remove('pasada');
    }

    // Function to scroll to the top
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

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

        // Smooth scroll back to the top of the new page
        scrollToTop();

        // Update the mini-book images
        updateMiniBookImages();
    }

    // Scroll left
    function scrollLeft() {
        scrollByDirection('left');
    }

    // Scroll right
    function scrollRight() {
        scrollByDirection('right');
    }

    // Attach event listeners to the scroll buttons
    if (scrollLeftButton) {
        scrollLeftButton.addEventListener('click', scrollLeft);
    }
    if (scrollRightButton) {
        scrollRightButton.addEventListener('click', scrollRight);
    }

    // Adjust height when the window is resized
    window.addEventListener('resize', () => {
        wrapper.style.height = pages[currentPageIndex].clientHeight + 'px';
    });

    // Initialize
    updateMiniBookImages();
}
