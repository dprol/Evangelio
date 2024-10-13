

// Function to create HTML elements
function createLyricsHTML(data) {
    const containers = document.querySelectorAll(".lyrics-container"); // Select all containers with the class "lyrics-jaume"

    containers.forEach((container) => { // Corrected arrow function syntax
        container.innerHTML = ""; // Clear any existing content

        data.forEach((paragraphData) => {
            // Create a new paragraph container
            const paragraph = document.createElement("div");
            paragraph.classList.add("paragraph");

            paragraphData.paragraph.forEach((lineData) => {
                // Create a new line container
                const line = document.createElement("div");
                line.classList.add("line");

                let previousChord = ""; // Track the previous chord

                lineData.forEach((item) => {
                    const textWithChord = document.createElement("div");
                    textWithChord.classList.add("text-with-chord");

                    const chord = document.createElement("p");
                    chord.classList.add("special");
                    chord.classList.add("chord");
                    chord.textContent = item.chord;

                    const text = document.createElement("p");
                    text.classList.add("plain-text");
                    text.classList.add("chord-text");

                    text.textContent = item.text;

                    // Check if chord is empty or same as previous chord
                    if (item.chord === "" || item.chord === previousChord) {
                        chord.classList.add("empty");
                    } else {
                        chord.classList.remove("empty");
                    }

                    textWithChord.appendChild(chord);
                    textWithChord.appendChild(text);
                    line.appendChild(textWithChord);

                    previousChord = item.chord; // Update the previous chord
                });

                paragraph.appendChild(line);
            });

            container.appendChild(paragraph);
        });
    });
}

async function loadDataAndCreateHTML() {
    try {
        const response = await fetch('acords/data.json');
        const data = await response.json();
        createLyricsHTML(data); // Tu función para crear el HTML
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

loadDataAndCreateHTML();
