export function inici_pagines_amb_animacio() {
    const pages = document.querySelectorAll(".pagina");

    const miniBookImages = document.querySelectorAll(".mini-book img");
    const llibre = document.querySelector(".llibre");
    const scrollLeftButton = document.getElementById("scroll-left");
    const scrollRightButton = document.getElementById("scroll-right");

    let currentPageIndex = 0; // Track the current page index



    // Function to update page visibility based on the current index
    function updatePageVisibility() {
        pages.forEach((page, index) => {
            if (index == currentPageIndex) {
                page.classList.add("visible");
            } else {
                page.classList.remove("visible");
            }
        });
    }

    // Function to update the mini-book images based on the current page index
    function updateMiniBookImages() {
        // Add 'pasada' to the image before the current index, if it exists
        if (currentPageIndex > 0) {
            if (!miniBookImages[currentPageIndex - 1].classList.contains('pasada')) {
                miniBookImages[currentPageIndex - 1].classList.add('pasada');
            }
        }
    
        // Remove 'pasada' from the current image
        if (miniBookImages[currentPageIndex].classList.contains('pasada')) {
            miniBookImages[currentPageIndex].classList.remove('pasada');
        }
    }

    // Function to scroll the body to the top
    function scrollToTop() {
        document.body.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Function to handle navigation by direction
    function scrollByDirection(direction) {
        const maxPageIndex = pages.length - 1;

        if (direction === "left" && currentPageIndex > 0) {
            currentPageIndex--;
        } else if (direction === "right" && currentPageIndex < maxPageIndex) {
            currentPageIndex++;
        };

        
        // Update the mini-book images
        updateMiniBookImages();
        // Update the visibility of pages
        updatePageVisibility();
    }

    // Scroll left (previous page)
    function scrollLeft() {
        scrollByDirection("left");
    }

    // Scroll right (next page)
    function scrollRight() {
        scrollByDirection("right");
    }

  
    // Attach event listeners to the scroll buttons
    if (scrollLeftButton) {
        scrollLeftButton.addEventListener("click", scrollLeft);
    }

    if (scrollRightButton) {
        scrollRightButton.addEventListener("click", scrollRight);
    }



    // Initialize by showing the first page, updating mini-book images, and adjusting the height
    updatePageVisibility();
    updateMiniBookImages();
}
