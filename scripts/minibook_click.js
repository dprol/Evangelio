document.addEventListener('DOMContentLoaded', function() {
    const miniBook = document.querySelector('.mini-book');
    let startY, isZoomed = false;

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
            }
        } else {
            if (isZoomed) {
                miniBook.classList.remove('zoomed');
                isZoomed = false;
            }
        }
    }

    // Function to detect scroll intent direction
    function detectScrollIntent(event) {
        const deltaY = event.clientY - startY;

        if (Math.abs(deltaY) > 10) { // Change threshold if needed
            if (deltaY > 0) { // Scrolling down
                toggleZoom('down');
            } else { // Scrolling up
                toggleZoom('up');
            }
        }
    }

    // Function to handle the click toggle
    function handleClick() {
        if (isZoomed) {
            miniBook.classList.remove('zoomed');
            isZoomed = false;
        } else {
            miniBook.classList.add('zoomed');
            isZoomed = true;
        }
    }

    // Track touch events for mobile devices
    miniBook.addEventListener('touchstart', function(event) {
        startY = event.touches[0].clientY;
    });

    miniBook.addEventListener('touchmove', function(event) {
        detectScrollIntent(event.changedTouches[0]);
    });

    // Track mouse events for desktop devices
    miniBook.addEventListener('mousedown', function(event) {
        startY = event.clientY;
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
});
