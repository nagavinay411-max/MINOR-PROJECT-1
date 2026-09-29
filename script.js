// =====================================================
// ELEMENTS
// =====================================================

const tabs =
    document.querySelectorAll(".tab");

const tabPanels =
    document.querySelectorAll(".tab-panel");

const newsText =
    document.getElementById("newsText");

const charCount =
    document.getElementById("charCount");

const analyzeBtn =
    document.getElementById("analyzeBtn");

const clearBtn =
    document.getElementById("clearBtn");


// Image
const imageInput =
    document.getElementById("imageInput");

const imageBrowseBtn =
    document.getElementById("imageBrowseBtn");

const imageUploadArea =
    document.getElementById("imageUploadArea");

const imagePreviewContainer =
    document.getElementById("imagePreviewContainer");

const imagePreview =
    document.getElementById("imagePreview");

const imageInfo =
    document.getElementById("imageInfo");

const removeImage =
    document.getElementById("removeImage");


// Video
const videoInput =
    document.getElementById("videoInput");

const videoBrowseBtn =
    document.getElementById("videoBrowseBtn");

const videoUploadArea =
    document.getElementById("videoUploadArea");

const videoPreviewContainer =
    document.getElementById("videoPreviewContainer");

const videoPreview =
    document.getElementById("videoPreview");

const videoInfo =
    document.getElementById("videoInfo");

const removeVideo =
    document.getElementById("removeVideo");


// Result
const loadingCard =
    document.getElementById("loadingCard");

const resultCard =
    document.getElementById("resultCard");

const resultStatus =
    document.getElementById("resultStatus");

const resultTitle =
    document.getElementById("resultTitle");

const resultMessage =
    document.getElementById("resultMessage");

const confidenceValue =
    document.getElementById("confidenceValue");

const progressBar =
    document.getElementById("progressBar");

const contentType =
    document.getElementById("contentType");

const sourceResult =
    document.getElementById("sourceResult");

const languageResult =
    document.getElementById("languageResult");

const clickbaitResult =
    document.getElementById("clickbaitResult");

const historyList =
    document.getElementById("historyList");


// =====================================================
// STATE
// =====================================================

let currentTab = "text";

let selectedImage = null;

let selectedVideo = null;

let history = [];


// =====================================================
// TAB SWITCHING
// =====================================================

tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        const target =
            tab.dataset.tab;

        currentTab = target;


        // Remove active from all tabs
        tabs.forEach(item => {

            item.classList.remove("active");

        });


        // Activate selected tab
        tab.classList.add("active");


        // Hide all panels
        tabPanels.forEach(panel => {

            panel.classList.remove("active");

        });


        // Show selected panel
        document
            .getElementById(target + "Panel")
            .classList.add("active");

    });

});


// =====================================================
// CHARACTER COUNTER
// =====================================================

newsText.addEventListener("input", () => {

    const length =
        newsText.value.length;

    charCount.textContent =
        `${length} characters`;

});


// =====================================================
// IMAGE UPLOAD
// =====================================================

imageBrowseBtn.addEventListener(
    "click",
    (event) => {

        event.stopPropagation();

        imageInput.click();

    }
);


imageUploadArea.addEventListener(
    "click",
    () => {

        imageInput.click();

    }
);


imageInput.addEventListener(
    "change",
    () => {

        const file =
            imageInput.files[0];

        if (file) {

            handleImage(file);

        }

    }
);


function handleImage(file) {

    // Validate type
    if (!file.type.startsWith("image/")) {

        alert(
            "Please select a valid image file."
        );

        return;
    }


    selectedImage = file;


    // Create temporary URL
    const imageURL =
        URL.createObjectURL(file);


    imagePreview.src =
        imageURL;


    imagePreviewContainer.style.display =
        "block";


    imageInfo.innerHTML = `
        <span>📁 ${file.name}</span>
        <span>📦 ${formatFileSize(file.size)}</span>
        <span>🖼️ ${file.type}</span>
    `;

}


// =====================================================
// REMOVE IMAGE
// =====================================================

removeImage.addEventListener(
    "click",
    () => {

        selectedImage = null;

        imageInput.value = "";

        imagePreview.src = "";

        imagePreviewContainer.style.display =
            "none";

    }
);


// =====================================================
// IMAGE DRAG & DROP
// =====================================================

setupDragDrop(
    imageUploadArea,
    "image"
);


// =====================================================
// VIDEO UPLOAD
// =====================================================

videoBrowseBtn.addEventListener(
    "click",
    (event) => {

        event.stopPropagation();

        videoInput.click();

    }
);


videoUploadArea.addEventListener(
    "click",
    () => {

        videoInput.click();

    }
);


videoInput.addEventListener(
    "change",
    () => {

        const file =
            videoInput.files[0];

        if (file) {

            handleVideo(file);

        }

    }
);


function handleVideo(file) {

    if (!file.type.startsWith("video/")) {

        alert(
            "Please select a valid video file."
        );

        return;
    }


    selectedVideo = file;


    const videoURL =
        URL.createObjectURL(file);


    videoPreview.src =
        videoURL;


    videoPreviewContainer.style.display =
        "block";


    videoInfo.innerHTML = `
        <span>📁 ${file.name}</span>
        <span>📦 ${formatFileSize(file.size)}</span>
        <span>🎥 ${file.type}</span>
    `;

}


// =====================================================
// REMOVE VIDEO
// =====================================================

removeVideo.addEventListener(
    "click",
    () => {

        selectedVideo = null;

        videoInput.value = "";

        videoPreview.src = "";

        videoPreviewContainer.style.display =
            "none";

    }
);


// =====================================================
// VIDEO DRAG & DROP
// =====================================================

setupDragDrop(
    videoUploadArea,
    "video"
);


// =====================================================
// DRAG & DROP FUNCTION
// =====================================================

function setupDragDrop(area, type) {

    area.addEventListener(
        "dragover",
        event => {

            event.preventDefault();

            area.classList.add("dragover");

        }
    );


    area.addEventListener(
        "dragleave",
        () => {

            area.classList.remove(
                "dragover"
            );

        }
    );


    area.addEventListener(
        "drop",
        event => {

            event.preventDefault();

            area.classList.remove(
                "dragover"
            );


            const file =
                event.dataTransfer.files[0];


            if (!file) {
                return;
            }


            if (type === "image") {

                handleImage(file);

            } else {

                handleVideo(file);

            }

        }
    );

}


// =====================================================
// ANALYZE BUTTON
// =====================================================

analyzeBtn.addEventListener(
    "click",
    analyzeContent
);


function analyzeContent() {

    let hasContent = false;


    // Text
    if (
        currentTab === "text" &&
        newsText.value.trim().length >= 20
    ) {

        hasContent = true;

    }


    // Image
    if (
        currentTab === "image" &&
        selectedImage
    ) {

        hasContent = true;

    }


    // Video
    if (
        currentTab === "video" &&
        selectedVideo
    ) {

        hasContent = true;

    }


    if (!hasContent) {

        if (currentTab === "text") {

            alert(
                "Please enter at least 20 characters."
            );

        }

        if (currentTab === "image") {

            alert(
                "Please upload an image first."
            );

        }

        if (currentTab === "video") {

            alert(
                "Please upload a video first."
            );

        }

        return;
    }


    // Show loading
    loadingCard.style.display =
        "block";

    resultCard.style.display =
        "none";


    analyzeBtn.disabled =
        true;


    analyzeBtn.textContent =
        "⏳ Processing...";


    loadingCard.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });


    /*
       DEMO PROCESSING

       Replace this section later with
       your backend API.

       Example:

       const formData = new FormData();

       formData.append(
           "text",
           newsText.value
       );

       formData.append(
           "image",
           selectedImage
       );

       formData.append(
           "video",
           selectedVideo
       );

       fetch("http://localhost:5000/analyze", {
           method: "POST",
           body: formData
       });
    */


    setTimeout(() => {

        let result;


        if (currentTab === "text") {

            result =
                analyzeText(
                    newsText.value
                );

        }


        else if (currentTab === "image") {

            result =
                analyzeImage(
                    selectedImage
                );

        }


        else {

            result =
                analyzeVideo(
                    selectedVideo
                );

        }


        displayResult(result);


        addHistory(
            result,
            getHistoryTitle()
        );


        loadingCard.style.display =
            "none";

        analyzeBtn.disabled =
            false;

        analyzeBtn.textContent =
            "🔍 Analyze Content";

    }, 1800);

}


// =====================================================
// TEXT ANALYSIS - DEMO
// =====================================================

function analyzeText(text) {

    const lowerText =
        text.toLowerCase();


    const suspiciousWords = [

        "shocking",
        "breaking",
        "secret",
        "miracle",
        "guaranteed",
        "unbelievable",
        "click here",
        "100%",
        "urgent",
        "you won't believe",
        "exclusive",
        "viral"

    ];


    let count = 0;


    suspiciousWords.forEach(word => {

        if (
            lowerText.includes(word)
        ) {

            count++;

        }

    });


    let status;

    let confidence;


    if (count >= 2) {

        status = "FAKE";

        confidence =
            Math.min(
                70 + count * 5,
                96
            );

    }

    else {

        status = "REAL";

        confidence =
            Math.min(
                80 + (text.length % 15),
                94
            );

    }


    return {

        status,

        confidence,

        type: "Text",

        source:
            status === "FAKE"
                ? "Suspicious"
                : "Analyzed",

        language:
            status === "FAKE"
                ? "Manipulative"
                : "Normal",

        clickbait:
            status === "FAKE"
                ? "High"
                : "Low"

    };

}


// =====================================================
// IMAGE ANALYSIS - DEMO
// =====================================================

function analyzeImage(file) {

    /*
       FRONTEND DEMO ONLY.

       Real implementation should send
       the image to an AI/CV backend.
    */


    const fileName =
        file.name.toLowerCase();


    const suspiciousNames = [

        "fake",
        "edited",
        "viral",
        "shocking",
        "clickbait"

    ];


    const suspicious =
        suspiciousNames.some(
            word =>
                fileName.includes(word)
        );


    return {

        status:
            suspicious
                ? "FAKE"
                : "REAL",

        confidence:
            suspicious
                ? 88
                : 82,

        type: "Image",

        source:
            suspicious
                ? "Suspicious Metadata"
                : "Image Analyzed",

        language:
            "Visual Analysis",

        clickbait:
            suspicious
                ? "High"
                : "Low"

    };

}


// =====================================================
// VIDEO ANALYSIS - DEMO
// =====================================================

function analyzeVideo(file) {

    /*
       FRONTEND DEMO ONLY.

       Real implementation can use:
       - Video frame extraction
       - Deepfake detection
       - OCR
       - Speech-to-text
       - NLP
       - Source verification
    */


    const size =
        file.size;


    let confidence =
        size > 50000000
            ? 86
            : 81;


    return {

        status: "REAL",

        confidence,

        type: "Video",

        source: "Video Analyzed",

        language: "Audio / Visual",

        clickbait: "Low"

    };

}


// =====================================================
// DISPLAY RESULT
// =====================================================

function displayResult(result) {

    resultCard.style.display =
        "block";


    resultStatus.textContent =
        result.status;


    resultStatus.classList.remove(
        "fake"
    );


    progressBar.classList.remove(
        "fake"
    );


    if (result.status === "FAKE") {

        resultStatus.classList.add(
            "fake"
        );

        progressBar.classList.add(
            "fake"
        );


        resultTitle.textContent =
            "Potentially Misleading Content";


        resultMessage.textContent =
            "The submitted content contains patterns that may indicate unreliable or misleading information.";

    }

    else {

        resultTitle.textContent =
            "Content Appears Reliable";


        resultMessage.textContent =
            "The submitted content appears consistent with the current analysis indicators.";

    }


    confidenceValue.textContent =
        `${result.confidence}%`;


    progressBar.style.width =
        `${result.confidence}%`;


    contentType.textContent =
        result.type;


    sourceResult.textContent =
        result.source;


    languageResult.textContent =
        result.language;


    clickbaitResult.textContent =
        result.clickbait;


    resultCard.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


// =====================================================
// HISTORY TITLE
// =====================================================

function getHistoryTitle() {

    if (currentTab === "text") {

        const text =
            newsText.value.trim();

        return text;

    }


    if (currentTab === "image") {

        return selectedImage
            ? selectedImage.name
            : "Image";

    }


    return selectedVideo
        ? selectedVideo.name
        : "Video";

}


// =====================================================
// HISTORY
// =====================================================

function addHistory(
    result,
    title
) {

    history.unshift({

        title,

        type: result.type,

        status: result.status

    });


    // Keep only 5
    if (history.length > 5) {

        history.pop();

    }


    renderHistory();

}


function renderHistory() {

    if (history.length === 0) {

        historyList.innerHTML = `
            <div class="empty-history">
                No content analyzed yet.
            </div>
        `;

        return;

    }


    historyList.innerHTML = "";


    history.forEach(item => {

        const row =
            document.createElement("div");

        row.className =
            "history-item";


        const icon =
            getTypeIcon(item.type);


        row.innerHTML = `

            <div class="history-left">

                <div class="history-icon">
                    ${icon}
                </div>

                <div>

                    <div class="history-title">
                        ${escapeHTML(
                            item.title
                        )}
                    </div>

                    <div class="history-type">
                        ${item.type}
                    </div>

                </div>

            </div>


            <div
                class="history-status
                ${
                    item.status === "REAL"
                        ? "real"
                        : "fake"
                }"
            >
                ${item.status}
            </div>

        `;


        historyList.appendChild(row);

    });

}


// =====================================================
// TYPE ICON
// =====================================================

function getTypeIcon(type) {

    if (type === "Image") {

        return "🖼️";

    }


    if (type === "Video") {

        return "🎥";

    }


    return "📝";

}


// =====================================================
// CLEAR ALL
// =====================================================

clearBtn.addEventListener(
    "click",
    clearAll
);


function clearAll() {

    // Text
    newsText.value = "";

    charCount.textContent =
        "0 characters";


    // Image
    selectedImage = null;

    imageInput.value = "";

    imagePreview.src = "";

    imagePreviewContainer.style.display =
        "none";


    // Video
    selectedVideo = null;

    videoInput.value = "";

    videoPreview.src = "";

    videoPreviewContainer.style.display =
        "none";


    // Result
    resultCard.style.display =
        "none";


    // Loading
    loadingCard.style.display =
        "none";


    // Button
    analyzeBtn.disabled =
        false;

    analyzeBtn.textContent =
        "🔍 Analyze Content";


    // Go back to text
    currentTab = "text";


    tabs.forEach(tab => {

        tab.classList.remove(
            "active"
        );

    });


    tabs[0].classList.add(
        "active"
    );


    tabPanels.forEach(panel => {

        panel.classList.remove(
            "active"
        );

    });


    document
        .getElementById("textPanel")
        .classList.add("active");

}


// =====================================================
// FILE SIZE FORMAT
// =====================================================

function formatFileSize(bytes) {

    if (bytes === 0) {

        return "0 Bytes";

    }


    const sizes = [
        "Bytes",
        "KB",
        "MB",
        "GB"
    ];


    const index =
        Math.floor(
            Math.log(bytes) /
            Math.log(1024)
        );


    return (
        Math.round(
            bytes /
            Math.pow(1024, index) *
            100
        ) / 100
        +
        " " +
        sizes[index]
    );

}


// =====================================================
// HTML ESCAPE
// =====================================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}
