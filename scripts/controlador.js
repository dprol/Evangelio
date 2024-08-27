// controlador.js
import { inici_pagines_amb_animacio } from "./navegacio.js";
import { inici_visibilitat } from "./visibilitat.js";

function animarEntrada() {
    const pages = document.querySelectorAll(".mini-book img");
    const transitionDuration = 1; // Duration of each transition in seconds
    const circleRadius = 1000; // Radius for the circular motion

    pages.forEach((img, index) => {
        // Calculate delay based on the index
        const duration = 3 / pages.length; // Total duration divided by the number of pages
        const delay = (pages.length - index) * duration; // Increase delay for each page

        // Calculate angle for circular motion based on the index
        const angle = (index / pages.length) * 2 * Math.PI;

        // Calculate initial positions (off-screen)
        const startX = Math.cos(angle) * circleRadius;
        const startY = Math.sin(angle) * circleRadius;

        // Calculate final positions (in view)
        const endX = 0; // Centered in X
        const endY = 0; // Centered in Y

        // Apply the initial transform for starting positions
        img.style.transform = `translate(0, 1000px) scale(0.2)`; // Initial transform (off-screen)

        // Trigger the animation with a transition
        setTimeout(() => {
            img.style.transition = `transform ${duration}s ease-out ${delay}s, opacity ${
                duration / 3.0
            }s ease-out ${delay}s`;
            img.style.transform = `translate(${endX}px, ${endY}px) scale(1) rotate(0deg)`; // Final transform (on-screen)
            img.style.opacity = "1"; // Ensure opacity is fully visible
            img.style.zIndex = `${10 - index}`;
        }, 100); // Add slight delay to ensure initial transform applies
    });


    setTimeout(() => {
        inici_pagines_amb_animacio();
        inici_visibilitat();
        const slideInvite = document.getElementById('slide-invite');
        slideInvite.style.opacity='0.8';
    }, 3000);
}

// Funcion para esperar a que todas las imagenes se hayan cargado
function esperarImagenesCargadas(callback) {
    // Obtener todas las imagenes en la pagina
    const imagenes = Array.from(document.images);
    const totalImagenes = imagenes.length;
    let imagenesCargadas = 0;

    // Actualizar la barra de progreso
    function actualizarBarraProgreso() {
        const porcentaje = (imagenesCargadas / totalImagenes) * 100;
        const barraProgreso = document.getElementById("loading-progress-bar");
        barraProgreso.style.width = `${porcentaje}%`;
        barraProgreso.textContent = `${Math.round(porcentaje)}%`;
    }

    // Si no hay imagenes, ejecutar el callback inmediatamente
    if (totalImagenes === 0) {
        callback();
        return;
    }
    function deshabilitarBarraProgreso() {
        const barraProgreso = document.getElementById("loading-progress-bar");
        barraProgreso.style.opacity = "0";
    }

    // Funcion que se llama cada vez que una imagen se carga
    function imagenCargada() {
        imagenesCargadas += 1;
        actualizarBarraProgreso(); // Actualizar la barra de progreso
        // Si todas las imagenes se han cargado, ejecutar el callback
        if (imagenesCargadas === totalImagenes) {
            deshabilitarBarraProgreso();
            callback();
        }
    }

    // Anadir un listener para cada imagen
    imagenes.forEach((imagen) => {
        // Si la imagen ya esta cargada, llamamos a la funcion inmediatamente
        if (imagen.complete) {
            imagenCargada();
        } else {
            // Anadir un listener para el evento 'load'
            imagen.addEventListener("load", imagenCargada);
            // Tambien manejamos el caso en que la imagen no se carga correctamente
            imagen.addEventListener("error", imagenCargada);
        }
    });
}

// Ejemplo de uso
esperarImagenesCargadas(() => {
    console.log("Todas las imagenes estan cargadas");
    // Aqui puedes ejecutar el codigo que quieras despues de que todas las imagenes esten cargadas
});

// Wait for the DOM content to load before initializing
document.addEventListener("DOMContentLoaded", () => {
    esperarImagenesCargadas(animarEntrada);
});
