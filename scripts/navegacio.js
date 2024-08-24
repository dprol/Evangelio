export function inici_navegacio() {
    const miniBook = document.querySelector(".mini-book");
    const scrollLeftButton = document.getElementById("scroll-left");
    const scrollRightButton = document.getElementById("scroll-right");
    const llibre = document.querySelector(".llibre");
    const header = document.querySelector(".header");

    header.classList.remove("max-zoomed");

    const scrollAmount = window.innerWidth;
    const zoomedClass = "zoomed";

    // Function to handle header zoom
    function toggleHeaderZoom() {
        header.classList.toggle(zoomedClass);
    }

    // Handle click on .mini-book to toggle zoom
    miniBook.addEventListener("click", function (event) {
        toggleHeaderZoom();
        // Prevent event from propagating to document
        event.stopPropagation();
    });

    // Scroll to the left
    function scrollLeft() {
        llibre.scrollBy({
            left: -window.innerWidth, // Scroll amount in pixels (1vw)
            behavior: "smooth",
        });
    }

    // Scroll to the right
    function scrollRight() {
        llibre.scrollBy({
            left: window.innerWidth, // Scroll amount in pixels (1vw)
            behavior: "smooth",
        });
    }
    // Handle swipe events to move the header
    function handleSwipe(event) {
        const deltaX = event.clientX - startX;

        if (Math.abs(deltaX) > 10) {
            // Change threshold if needed
            if (deltaX > 0) {
                // Swipe right
                scrollLeft();
            } else {
                // Swipe left
                scrollRight();
            }
        }
    }

    // Handle touch events for mobile devices
    header.addEventListener("touchstart", function (event) {
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
    });

    header.addEventListener("touchmove", function (event) {
        handleSwipe(event.touches[0]);
    });

    // Handle mouse events for desktop devices
    header.addEventListener("mousedown", function (event) {
        startX = event.clientX;
        startY = event.clientY;
    });

    header.addEventListener("mousemove", function (event) {
        if (event.buttons > 0) {
            // Ensure mouse button is held down
            handleSwipe(event);
        }
    });

    header.addEventListener("mouseup", function () {
        // Optionally handle mouse up if needed
    });

    // Scroll buttons functionality
    scrollLeftButton.addEventListener("click", scrollLeft);
    scrollRightButton.addEventListener("click", scrollRight);
}
