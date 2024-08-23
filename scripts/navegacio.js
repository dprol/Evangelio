document.addEventListener('DOMContentLoaded', function() {
    const miniBook = document.querySelector('.mini-book');
    const scrollLeftButton = document.getElementById('scroll-left');
    const scrollRightButton = document.getElementById('scroll-right');
    const llibre = document.querySelector('.llibre');
    const header = document.querySelector('.header');

    let startY, startX, isZoomed = false;

    const scrollAmount = 100;

    // Delay adding the 'visible' class by 2 seconds
    setTimeout(function() {
        miniBook.classList.add('visible');
    }, 2000); // 2000 milliseconds = 2 seconds

    // Function to toggle the zoomed class based on scroll direction
    function toggleZoom(direction) {
        if (direction === 'down') {
            if (!isZoomed) {
                miniBook.classList.add('zoomed');
                isZoomed = true;
                header.classList.add('no-zoom'); // Disable zoom on header
            }
        } else {
            if (isZoomed) {
                miniBook.classList.remove('zoomed');
                isZoomed = false;
                header.classList.remove('no-zoom'); // Re-enable zoom on header
            }
        }
    }

    // Function to handle the click toggle
    function handleClick() {
        if (isZoomed) {
            miniBook.classList.remove('zoomed');
            isZoomed = false;
            header.classList.remove('no-zoom'); // Re-enable zoom on header
        } else {
            miniBook.classList.add('zoomed');
            isZoomed = true;
            header.classList.add('no-zoom'); // Disable zoom on header
        }
    }

    // Function to detect scroll intent direction
    function detectScrollIntent(event) {
        const deltaY = event.clientY - startY;
        const deltaX = event.clientX - startX;

        // Vertical scrolls in mini-book have no effect
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (Math.abs(deltaX) > 10) { // Change threshold if needed
                if (deltaX > 0) { // Scrolling right
                    scrollLeft();
                } else { // Scrolling left
                    scrollRight();
                }
            }
        } else {
            // Vertical scrolls do nothing in mini-book
        }
    }

    // Scroll to the left
    function scrollLeft() {
        llibre.scrollBy({
            left: -scrollAmount,
            behavior: "smooth",
        });
    }

    // Scroll to the right
    function scrollRight() {
        llibre.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
        });
    }

    // Handle touch events for mobile devices
    miniBook.addEventListener('touchstart', function(event) {
        startY = event.touches[0].clientY;
        startX = event.touches[0].clientX;
    });

    miniBook.addEventListener('touchmove', function(event) {
        detectScrollIntent(event.changedTouches[0]);
    });

    // Handle mouse events for desktop devices
    miniBook.addEventListener('mousedown', function(event) {
        startY = event.clientY;
        startX = event.clientX;
    });

    miniBook.addEventListener('mousemove', function(event) {
        detectScrollIntent(event);
    });

    // Click event to toggle zoom
    miniBook.addEventListener('click', function(event) {
        handleClick();
    });

    // Click lose focus to revert zoom
    document.addEventListener('mousedown', function(event) {
        if (!miniBook.contains(event.target)) {
            if (isZoomed) {
                miniBook.classList.remove('zoomed');
                isZoomed = false;
                header.classList.remove('no-zoom'); // Re-enable zoom on header
            }
        }
    });

    document.addEventListener('touchend', function(event) {
        // Optionally, handle touch end if needed
    });

    // Optionally, reset zoom state on mouse up and touch end
    document.addEventListener('mouseup', function() {
        // If you want to handle any specific logic here, you can
    });

    // Scroll buttons functionality
    scrollLeftButton.addEventListener('click', scrollLeft);
    scrollRightButton.addEventListener('click', scrollRight);
});
