export function inici_reproductor_video() {
    document.addEventListener("DOMContentLoaded", () => {
        const youtubeContainers =
            document.querySelectorAll(".youtube-container");

        // Crear los iframes y cargarlos, pero no activar la reproducción hasta que el contenedor sea visible
        youtubeContainers.forEach((container) => {
            const videoId = container.getAttribute("data-video-id");
            const iframe = document.createElement("iframe");
            iframe.dataset.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`; // Guardar URL en data-src
            iframe.allow = "autoplay; encrypted-media";
            iframe.allowFullscreen = true;
            container.appendChild(iframe);
        });

        // Función para reproducir el video cuando el contenedor es visible
        function playVideosOnVisibility(entries) {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const iframe = entry.target.querySelector("iframe");
                    if (iframe && !iframe.src) {
                        // Solo configurar src si no está configurado
                        iframe.src = iframe.dataset.src;
                    }
                    entry.target.classList.add("visible");
                } else {
                    entry.target.classList.remove("visible");
                }
            });
        }

        // Crear un IntersectionObserver para observar los contenedores de videos
        const observer = new IntersectionObserver(playVideosOnVisibility, {
            threshold: [0.1, 0.9], // Considera el contenedor visible entre el 10% y el 90%
        });

        // Observa cada contenedor de video
        youtubeContainers.forEach((container) => {
            observer.observe(container);
        });
    });
}
