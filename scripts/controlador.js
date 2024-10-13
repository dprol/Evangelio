// controlador.js
import { inici_pagines_amb_animacio } from "./navegacio.js";
import { inici_visibilitat } from "./visibilitat.js";

function animarEntrada() {
    inici_pagines_amb_animacio();
    inici_visibilitat();
}

// Función para esperar a que todas las imágenes se hayan cargado
function esperarImagenesCargadas(callback) {
    // Obtener todas las imágenes en la página
    const imagenes = Array.from(document.images);
    const totalImagenes = imagenes.length;
    let imagenesCargadas = 0;

    // Tiempo mínimo de espera en milisegundos (3 segundos)
    const tiempoMinimoEspera = 3000;
    const tiempoInicio = Date.now();

    // Inicializar porcentaje y elemento de progreso
    let porcentaje = 0;
    const paginaCarga = document.getElementById("loading-page");
    const barraProgreso = document.getElementById("loading-progress-text");
    barraProgreso.style.display = "block";

    // Función para actualizar el porcentaje visualmente
    function actualizarPorcentaje() {
        barraProgreso.textContent = `${porcentaje.toString().padStart(2, '0')}`;
    }

    // Animar el porcentaje desde 00% hasta 99% en 5 segundos
    const intervalo = setInterval(() => {
        if (porcentaje < 99) {
            porcentaje += 1;
            actualizarPorcentaje();
        } else {
            clearInterval(intervalo);
            // Si las imágenes ya se cargaron, ejecutar el callback
            if (imagenesCargadas === totalImagenes) {
                finalizarCarga();
            }
        }
    }, tiempoMinimoEspera / 99); // Dividimos el tiempo para incrementar hasta 99%

    // Función que se llama cada vez que una imagen se carga
    function imagenCargada() {
        imagenesCargadas += 1;

        // Si todas las imágenes se han cargado y el porcentaje ha llegado a 99%
        if (imagenesCargadas === totalImagenes && porcentaje >= 99) {
            clearInterval(intervalo);
            finalizarCarga();
        }
    }

    // Función para finalizar la carga
    function finalizarCarga() {
        // Asegurarse de que el porcentaje llegue a 100%
        barraProgreso.textContent = '100';

        // Ocultar la barra de progreso después de un breve retraso
        setTimeout(() => {
            document.body.classList.remove("loading-body");
            paginaCarga.classList.add("loaded");
            callback();
        }, 1500); // Puedes ajustar el retraso si lo deseas
    }

    // Añadir un listener para cada imagen
    imagenes.forEach((imagen) => {
        // Si la imagen ya está cargada, llamamos a la función inmediatamente
        if (imagen.complete) {
            imagenCargada();
        } else {
            // Añadir un listener para el evento 'load' y 'error'
            imagen.addEventListener("load", imagenCargada);
            imagen.addEventListener("error", imagenCargada);
        }
    });

    // Si no hay imágenes, simular carga
    if (totalImagenes === 0) {
        // Incrementar el porcentaje hasta 99% en 5 segundos
        // Luego finalizar la carga
        // Esto ya está manejado por el intervalo y finalizarCarga()
    }
}

// Esperar a que el contenido del DOM se cargue antes de inicializar
document.addEventListener("DOMContentLoaded", () => {
    esperarImagenesCargadas(animarEntrada);
});
