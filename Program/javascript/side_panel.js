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

function toggleContainer(containerId) {
    // Hide all containers
    document.querySelectorAll('.sp-content > *').forEach(container => {
        container.style.display = 'none';
    });

    // Show the selected container
    document.getElementById(containerId).style.display = 'flex';
}


document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".fe-links-container");
    const pdfViewer = document.getElementById("pdf-iframe"); // Displays questionnaire PDF
    const answerCanvas = document.getElementById("answers-canvas"); // Displays answer key
    const resultContainer = document.getElementById("search-result-container"); // Search result container
    const scanInput = document.getElementById("scan-input");
    const scanBtn = document.getElementById("scan-btn");

    const filePath = "../questionnaire_list.txt"; // List of all PDF files
    const pdfFolderPath = "../../FE/Questionnaires/";
    const answerFolderPath = "../../FE/Answers/";

    const defaultPDF = "2011A_AM.pdf"; // Default file when the page loads

    // Load buttons from questionnaire_list.txt
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

                        // Load Questionnaire in iframe
                        pdfViewer.src = pdfFolderPath + pdfFileName;

                        // Load Answer Key using PDF.js
                        const answerPath = answerFolderPath + pdfFileName;
                        loadPDF(answerPath);
                    });

                    container.appendChild(button);
                });
            })
            .catch(error => console.error("Error loading buttons:", error));
    }

    // Load and render answer PDF using PDF.js
    function loadPDF(pdfPath) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

        pdfjsLib.getDocument(pdfPath).promise.then(pdf => {
            return pdf.getPage(1); // Load the first page of the answer key
        }).then(page => {
            const context = answerCanvas.getContext("2d");
            const viewport = page.getViewport({ scale: 1.5 });

            answerCanvas.width = viewport.width;
            answerCanvas.height = viewport.height;

            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };

            return page.render(renderContext).promise;
        }).catch(error => {
            console.error("Error loading PDF:", error);
            answerCanvas.getContext("2d").clearRect(0, 0, answerCanvas.width, answerCanvas.height); // Clear canvas if error
        });
    }

    // Scan PDF for keyword and dynamically create buttons for matches
    async function scanPDFsForKeyword(keyword) {
        if (!keyword.trim()) {
            alert("Please enter a valid keyword.");
            return;
        }

        resultContainer.innerHTML = "<p>Searching for keyword...</p>";

        // Fetch the list of files
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error("File list not found.");
                }
                return response.text();
            })
            .then(async (data) => {
                const files = data.split("\n").map(name => name.trim()).filter(name => name);

                // Clear previous results
                resultContainer.innerHTML = "";

                let matchFound = false;

                for (const fileName of files) {
                    const pdfPath = pdfFolderPath + fileName.replace(/\s+/g, "_");
                    const found = await searchKeywordInPDF(pdfPath, keyword);

                    if (found) {
                        matchFound = true;
                        createResultButton(fileName, pdfPath);
                    }
                }

                if (!matchFound) {
                    resultContainer.innerHTML = "<p>No matches found for the keyword.</p>";
                }
            })
            .catch(error => console.error("Error scanning PDFs:", error));
    }

    // Search for a keyword in a single PDF
    async function searchKeywordInPDF(pdfPath, keyword) {
        try {
            const pdf = await pdfjsLib.getDocument(pdfPath).promise;
            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                const textContent = await page.getTextContent();
                const text = textContent.items.map(item => item.str).join(" ");

                // Check if the keyword is in the page text
                if (text.toLowerCase().includes(keyword.toLowerCase())) {
                    return true;
                }
            }
        } catch (error) {
            console.error(`Error reading PDF: ${pdfPath}`, error);
        }
        return false;
    }

    // Create dynamic buttons for matched files
    function createResultButton(fileName, pdfPath) {
        const button = document.createElement("button");
        button.classList.add("fe-link-btn");
        button.type = "button";
        button.textContent = fileName;

        button.addEventListener("click", function () {
            pdfViewer.src = pdfPath;
            loadPDF(pdfPath.replace(pdfFolderPath, answerFolderPath)); // Load corresponding answer key
        });

        resultContainer.appendChild(button);
    }

    // Handle keyword scan button click
    scanBtn.addEventListener("click", function () {
        const keyword = scanInput.value.trim();
        scanPDFsForKeyword(keyword);
    });

    // Load default questionnaire and answer key on page load
    pdfViewer.src = pdfFolderPath + defaultPDF;
    loadPDF(answerFolderPath + defaultPDF);

    loadButtonsFromFile();
});

