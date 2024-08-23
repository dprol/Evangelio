document.addEventListener("DOMContentLoaded", () => {
    const scrollLeftButton = document.getElementById("scroll-left");
    const scrollRightButton =
        document.getElementById("scroll-right");
    const llibre = document.querySelector(".llibre");

    const scrollAmount = 100;

    function scrollLeft() {
        llibre.scrollBy({
            left: -scrollAmount,
            behavior: "smooth",
        });
    }

    function scrollRight() {
        llibre.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
        });
    }

    scrollLeftButton.addEventListener("click", scrollLeft);
    scrollRightButton.addEventListener("click", scrollRight);
});