export function inici_visibilitat() {
    const pageContents = document.querySelectorAll(".pagina");

    pageContents.forEach((content) => {
        const childElements = content.children;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            {
                root: null, // Use the viewport as the root
                threshold: 0.2, // Trigger when 30% of the element is in view
            }
        );

        Array.from(childElements).forEach((element) => {
            observer.observe(element);
        });
    });
}
