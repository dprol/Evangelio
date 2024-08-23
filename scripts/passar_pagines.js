document.addEventListener("DOMContentLoaded", () => {
    // Use setTimeout to delay execution by 3 seconds (3000 milliseconds)
    setTimeout(() => {
        const pages = document.querySelectorAll(".pagina");
        const miniBookImages = document.querySelectorAll(".mini-book img");
        const llibre = document.querySelector(".llibre");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const pageIndex = Array.from(pages).indexOf(entry.target);

                        // Update the mini-book images based on scroll position
                        miniBookImages.forEach((img, index) => {
                            if (index < pageIndex) {
                                // Rotate and move pages back as you scroll past them
                                img.style.transform = `rotateY(-140deg) translateZ(-${index * 10}px)`; // 10px is the distance between pages
                                img.style.opacity = "0";
                                img.style.transition = `transform 1s ease, opacity 0s ease 3s`; // 3s delay before opacity transition ends
                            } else {
                                // Reset rotation for the current and future pages
                                img.style.transform = `rotateY(0deg) translateZ(-${index * 10}px)`;
                                img.style.opacity = "1";
                                img.style.transition = `transform 1s ease, opacity 0s ease`; // No delay for opacity transition
                            }
                            img.style.zIndex = `${10 - index}`;
                        });
                    }
                });
            },
            {
                root: null, // Use the viewport as the root
                threshold: 0.3, // Trigger when 30% of the element is in view
                rootMargin: "0px", // No margin around the root
            }
        );

        pages.forEach((page) => {
            observer.observe(page);
        });
    }, 3000); // Delay of 3000 milliseconds (3 seconds)
});


document.addEventListener("DOMContentLoaded", () => {
    // Delay execution by 3 seconds
        const pages = document.querySelectorAll(".mini-book img");
        const transitionDuration = 1; // Duration of each transition in seconds

        pages.forEach((img, index) => {
            // Calculate delay based on the index (e.g., 0.2s delay per index)
            const duration = 3 / pages.length; // Total duration divided by the number of pages
            const delay = (pages.length - index) * 0.5; // Increase delay for each page

            // Apply the transform and delay to each page
            img.style.transition = `transform ${duration}s ease-out ${delay}s, opacity ${duration/3}s ease-out ${delay}s`;
            img.style.transform = `rotateY(0deg) translateZ(-${index * 10}px)`; // Final rotation

            img.style.zIndex = `${10 - index}`;
            img.style.opacity = "1"; // Ensure opacity is fully visible
        });
});
