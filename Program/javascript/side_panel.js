document.addEventListener("DOMContentLoaded", function () {
    const sidePanelClosed = document.querySelector(".side-panel-closed");
    const sidePanelOpened = document.querySelector(".side-panel-opened");
    const toggleButtons = document.querySelectorAll(".sp-toggle-btn");

    toggleButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Toggle visibility between open and closed panels
            if (sidePanelClosed.style.display === "none") {
                sidePanelClosed.style.display = "flex"; 
                sidePanelOpened.style.display = "none";
            } else {
                sidePanelClosed.style.display = "none"; 
                sidePanelOpened.style.display = "flex";
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".fe-links-container");
    const pdfViewer = document.getElementById("pdf-iframe");
    const filePath = "../questionnaire_list.txt";
    const pdfFolderPath = "../../FE/Questionnaires/";

    function loadButtonsFromFile() {
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error("File not found or cannot be read.");
                }
                return response.text();
            })
            .then(data => {
                const buttonNames = data.split("\n").map(name => name.trim()).filter(name => name);
                
                // Clear old buttons before adding new ones
                container.innerHTML = "";

                // Create buttons dynamically
                buttonNames.forEach(name => {
                    const button = document.createElement("button");
                    button.classList.add("fe-link-btn");
                    button.type = "button";
                    button.textContent = name;

                    button.addEventListener("click", function () {
                        const pdfFileName = name.replace(/\s+/g, "_");
                        const pdfPath = pdfFolderPath + pdfFileName;
                        pdfViewer.src = pdfPath;
                    });

                    container.appendChild(button);
                });
            })
            .catch(error => console.error("Error loading buttons:", error));
    }

    loadButtonsFromFile();
});

