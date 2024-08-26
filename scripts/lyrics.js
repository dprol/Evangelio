// Example data structure
const data = [
    {
        paragraph: [
            [{ text: "Mi bisabuelo Jaume", chord: "E" }],
            [
                { text: "fue a la guerra", chord: "" },
                { text: "civil", chord: "Fm#" },
            ],
            [
                { text: "y no empuño ni un", chord: "" },
                { text: "arma", chord: "B7" },
            ],
            [
                { text: "a nadie quiso", chord: "" },
                { text: "herir", chord: "E" },
            ],
        ],
    },
    {
        paragraph: [
            [{ text: "Sirvió de camillero", chord: "E" }],
            [
                { text: "y balas", chord: "" },
                { text: "empuño unas mil", chord: "Fm#" },
            ],
            [
                { text: "sirviendo a los", chord: "" },
                { text: "maltrechos", chord: "B7" },
            ],
            [{ text: "en la batalla del ebro", chord: "" }],
            [
                { text: "la mas cruel y la mas", chord: "" },
                { text: "vil.", chord: "E" },
            ],
        ],
    },
    {
        paragraph: [
            [{ text: "Sirvió de camillero", chord: "E" }],
            [
                { text: "y balas", chord: "" },
                { text: "empuño unas mil", chord: "Fm#" },
            ],
            [
                { text: "sirviendo a los", chord: "" },
                { text: "maltrechos", chord: "B7" },
            ],
            [{ text: "en la batalla del ebro", chord: "" }],
            [
                { text: "la mas cruel y la mas", chord: "" },
                { text: "vil.", chord: "E" },
            ],
        ],
    },
    {
        paragraph: [
            [{ text: "Sirvió de camillero", chord: "E" }],
            [
                { text: "y balas", chord: "" },
                { text: "empuño unas mil", chord: "Fm#" },
            ],
            [
                { text: "sirviendo a los", chord: "" },
                { text: "maltrechos", chord: "B7" },
            ],
            [{ text: "en la batalla del ebro", chord: "" }],
            [
                { text: "la mas cruel y la mas", chord: "" },
                { text: "vil.", chord: "E" },
            ],
        ],
    },
];

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

                    const chord = document.createElement("div");
                    chord.classList.add("chord");
                    chord.textContent = item.chord;

                    const text = document.createElement("div");
                    text.classList.add("text");
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

// Create the HTML from the data
createLyricsHTML(data);