const pages = document.querySelectorAll(".pagina");
const bookWrapper = document.getElementById("bookWrapper");
const book = document.getElementById("book");

const bookImages = document.querySelectorAll(".book-img");

const arrowLeft = document.getElementById("arrowLeft");
const arrowRight = document.getElementById("arrowRight");

const header = document.getElementById("header");

const botonsAcords = document.querySelectorAll(".bt-acords");

const headerIndicator = document.querySelector(".header-indicator");

function initialize() {
    let currentPageIndex = 0;
    pages[currentPageIndex].classList.add("visible");
    bookImages[currentPageIndex].classList.add("visible");

    let isTransitioning = false;
    let isHorizontalSwipe = false;
    
    // Function to handle navigation
    function scrollByDirection(direction) {
        if (isTransitioning) return; // Prevent new transitions if one is in progress

        const maxPageIndex = pages.length - 1;

        if (direction === "left" && currentPageIndex > 0) {
            isTransitioning = true;
            const outgoingPageIndex = currentPageIndex;
            const incomingPageIndex = currentPageIndex - 1;
            currentPageIndex = incomingPageIndex;
            headerIndicator.style.width = `${Math.round(
                (currentPageIndex / maxPageIndex) * 100
            )}%`;
            const outgoingImage = bookImages[outgoingPageIndex];
            const incomingImage = bookImages[incomingPageIndex];

            // Start flipping out the outgoing image
            incomingImage.classList.add("visible");
            incomingImage.classList.add("flipping-in");
            pages[outgoingPageIndex].classList.add("fading-out");

            document.body.classList.remove(`c${outgoingPageIndex}`);
            document.body.classList.add(`c${incomingPageIndex}`);
            
            setTimeout(() => {
                pages[outgoingPageIndex].classList.remove(
                    "visible",
                    "fading-out"
                );
                pages[incomingPageIndex].classList.add("visible");
                pages[incomingPageIndex].classList.add("fading-in");
            }, 500);
            // Listen for the flip-out animation to end
            setTimeout(() => {
                // Start flipping in the incoming image
                pages[incomingPageIndex].classList.remove("fading-in");
                outgoingImage.classList.remove("visible");
                incomingImage.classList.remove("flipping-in");
                isTransitioning = false;
            }, 900);
        } else if (direction === "right" && currentPageIndex < maxPageIndex) {
            isTransitioning = true;
            const outgoingPageIndex = currentPageIndex;
            const incomingPageIndex = currentPageIndex + 1;
            currentPageIndex = incomingPageIndex;
            headerIndicator.style.width = `${Math.round(
                (currentPageIndex / maxPageIndex) * 100
            )}%`;
            const outgoingImage = bookImages[outgoingPageIndex];
            const incomingImage = bookImages[incomingPageIndex];

            // Start flipping out the outgoing image
            incomingImage.classList.add("visible");
            outgoingImage.classList.add("flipping-out");
            
            pages[outgoingPageIndex].classList.add("fading-out");

            document.body.classList.remove(`c${outgoingPageIndex}`);
            document.body.classList.add(`c${incomingPageIndex}`);

            setTimeout(() => {
                pages[outgoingPageIndex].classList.remove(
                    "visible",
                    "fading-out"
                );
                pages[incomingPageIndex].classList.add("visible");
                pages[incomingPageIndex].classList.add("fading-in");
            }, 500);
            // Listen for the flip-out animation to end
            setTimeout(() => {
                // Start flipping in the incoming image
                outgoingImage.classList.remove("visible", "flipping-out");
                // Update page visibility
                pages[incomingPageIndex].classList.remove("fading-in");

                
                isTransitioning = false;
            }, 1000);
        } else if (direction === "right" && currentPageIndex === maxPageIndex) {
            isTransitioning = true;
            const outgoingPageIndex = currentPageIndex;
            const incomingPageIndex = 0;
            currentPageIndex = incomingPageIndex;
            headerIndicator.style.width = `${Math.round(
                (currentPageIndex / maxPageIndex) * 100
            )}%`;
            const outgoingImage = bookImages[outgoingPageIndex];
            const incomingImage = bookImages[incomingPageIndex];

            // Start flipping out the outgoing image
            incomingImage.classList.add("visible");
            outgoingImage.classList.add("flipping-out");
            
            pages[outgoingPageIndex].classList.add("fading-out");

            document.body.classList.remove(`c${outgoingPageIndex}`);
            document.body.classList.add(`c${incomingPageIndex}`);

            setTimeout(() => {
                pages[outgoingPageIndex].classList.remove(
                    "visible",
                    "fading-out"
                );
                pages[incomingPageIndex].classList.add("visible");
                pages[incomingPageIndex].classList.add("fading-in");
            }, 500);
            // Listen for the flip-out animation to end
            setTimeout(() => {
                // Start flipping in the incoming image
                outgoingImage.classList.remove("visible", "flipping-out");
                // Update page visibility
                pages[incomingPageIndex].classList.remove("fading-in");

                
                isTransitioning = false;
            }, 1000);
        }
        if (currentPageIndex === 0) {
            arrowLeft.classList.add("disabled");
        } else {
            arrowLeft.classList.remove("disabled");
        }
        // Track page visit event with Umami
        umami.trackEvent('pagina_visitada', currentPageIndex);
    }

    // Scroll left
    function scrollLeft() {
        scrollByDirection("left");
    }

    // Scroll right
    function scrollRight() {
        scrollByDirection("right");
    }

    arrowLeft.addEventListener("click", scrollLeft);
    arrowRight.addEventListener("click", scrollRight);

    // Swipe gesture handling
    function handleSwipeGestures() {
        let touchStartX = 0;
        let touchStartY = 0;
        let initialDistance = 0;
        const swipeThreshold = 50; // Minimum distance for swipe
        const swipeAngleThreshold = 45; // Max angle for horizontal swipe

        // Detect pinch-to-zoom gesture
        function detectZoomGesture(e) {
            if (e.touches.length === 2) {
                const [touch1, touch2] = e.touches;
                const distance = Math.hypot(
                    touch2.clientX - touch1.clientX,
                    touch2.clientY - touch1.clientY
                );
                return distance;
            }
            return 0;
        }

        // Touch start
        book.addEventListener(
            "touchstart",
            (e) => {
                if (e.touches.length === 2) {
                    initialDistance = detectZoomGesture(e);
                    isZooming = true; // Pinch gesture detected
                } else {
                    touchStartX = e.changedTouches[0].clientX;
                    touchStartY = e.changedTouches[0].clientY;
                    isHorizontalSwipe = false;
                    isZooming = false;
                }
            },
            { passive: true }
        );

        // Touch move (for swiping)
        book.addEventListener(
            "touchmove",
            (e) => {
                if (isZooming) {
                    const currentDistance = detectZoomGesture(e);
                    if (Math.abs(currentDistance - initialDistance) > 10) {
                        isZooming = true; // Confirm zoom action
                        return;
                    }
                }

                const touchMoveX = e.changedTouches[0].clientX;
                const touchMoveY = e.changedTouches[0].clientY;
                const deltaX = touchMoveX - touchStartX;
                const deltaY = touchMoveY - touchStartY;
                const angle =
                    Math.atan2(Math.abs(deltaY), Math.abs(deltaX)) *
                    (180 / Math.PI);

                // Detect horizontal swipe and prevent vertical scroll
                if (
                    Math.abs(deltaX) > swipeThreshold &&
                    angle < swipeAngleThreshold &&
                    !isZooming
                ) {
                    isHorizontalSwipe = true;
                    e.preventDefault(); // Prevent vertical scrolling
                }
            },
            { passive: false }
        );

        // Touch end
        book.addEventListener(
            "touchend",
            (e) => {
                if (!isZooming && isHorizontalSwipe) {
                    const deltaX = e.changedTouches[0].clientX - touchStartX;
                    if (deltaX > 0) {
                        scrollLeft();
                    } else {
                        scrollRight();
                    }
                }
            },
            { passive: true }
        );
    }

    // Initial setup
    function initializeMiniBook() {
        bookImages.forEach((img, index) => {
            if (index === currentPageIndex) {
                img.classList.add("visible");
            } else {
                img.classList.remove("visible");
            }
        });
    }

    botonsAcords.forEach((bt) => {
        bt.addEventListener("click", (e) => {
            document
                .getElementById(`lyrics-${bt.getAttribute("data-id")}`)
                .classList.toggle("acords-amagats");
            bt.classList.toggle("activat");
            if (bt.classList.contains("activat")) {
                bt.innerHTML = "Ocultar acordes";
            } else {
                bt.innerHTML = "Mostrar acordes";
            }
            // Track page visit event with Umami
            umami.trackEvent('acords', bt.getAttribute("data-id"));
        });
    });

    initializeMiniBook();
    handleSwipeGestures();
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        bookWrapper.classList.remove("fullscreen");
        arrowLeft.classList.remove("hidden");
        arrowRight.classList.remove("hidden");
        initialize();
    }, 2000);
});
