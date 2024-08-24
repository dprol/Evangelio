
// controlador.js
import { inici_passar_pagines } from './passar_pagines.js';
import { inici_navegacio } from './navegacio.js';
import { inici_reproductor_video } from './reproductor_video.js';


function animarEntrada() {
    // Delay execution by 3 seconds
        const pages = document.querySelectorAll(".mini-book img");
        const transitionDuration = 1; // Duration of each transition in seconds

        pages.forEach((img, index) => {
            // Calculate delay based on the index (e.g., 0.2s delay per index)
            const duration = 1 / pages.length; // Total duration divided by the number of pages
            const delay = (pages.length - index) * duration; // Increase delay for each page

            // Apply the transform and delay to each page
            img.style.transition = `transform ${duration}s ease-out ${delay}s, opacity ${duration/3}s ease-out ${delay}s`;
            img.style.transform = `rotateY(0deg) translateZ(-${index * 5}px)`; // Final rotation

            img.style.zIndex = `${10 - index}`;
            img.style.opacity = "1"; // Ensure opacity is fully visible
        });
        setTimeout(() => { 
            inici_passar_pagines();
            inici_navegacio();
        }, 1000);

};
// Funcion para esperar a que todas las imagenes se hayan cargado
function esperarImagenesCargadas(callback) {
    // Obtener todas las imagenes en la pagina
    const imagenes = Array.from(document.images);
    const totalImagenes = imagenes.length;
    let imagenesCargadas = 0;
  
    // Actualizar la barra de progreso
    function actualizarBarraProgreso() {
      const porcentaje = (imagenesCargadas / totalImagenes) * 100;
      const barraProgreso = document.getElementById('loading-progress-bar');
      barraProgreso.style.width = `${porcentaje}%`;
      barraProgreso.textContent = `${Math.round(porcentaje)}%`;
    }
  
    // Si no hay imagenes, ejecutar el callback inmediatamente
    if (totalImagenes === 0) {
      callback();
      return;
    }
    function deshabilitarBarraProgreso() {
        const barraProgreso = document.getElementById('loading-progress-bar');
        barraProgreso.style.opacity = '0';
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
        imagen.addEventListener('load', imagenCargada);
        // Tambien manejamos el caso en que la imagen no se carga correctamente
        imagen.addEventListener('error', imagenCargada);
      }
    });
  }
  
  // Ejemplo de uso
  esperarImagenesCargadas(() => {
    console.log('Todas las imagenes estan cargadas');
    // Aqui puedes ejecutar el codigo que quieras despues de que todas las imagenes esten cargadas
  });

// Wait for the DOM content to load before initializing
document.addEventListener('DOMContentLoaded', () => {
    esperarImagenesCargadas(animarEntrada);
});