let includeEscapeCharacters = false;

let startColorGlobal = "#0033CC";
let endColorGlobal = "#33FFFF";

function toggleEscapeCharacters() {
    includeEscapeCharacters = !includeEscapeCharacters;
    document.getElementById('toggleEscape').textContent = includeEscapeCharacters ? "Exclude \\\\" : "Include \\\\";
    
    colorizeAndDisplay();
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('startColor').addEventListener('input', applyColorChanges);
    document.getElementById('endColor').addEventListener('input', applyColorChanges);
    
    function applyColorChanges() {
        const startColor = document.getElementById('startColor').value;
        const endColor = document.getElementById('endColor').value;
        
        startColorGlobal = startColor;
        endColorGlobal = endColor;
        
        colorizeAndDisplay();
    }
});

function interpolateColors(steps) {
    function hexToRgb(hex) {
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);
        return [r, g, b];
    }

    let [sR, sG, sB] = hexToRgb(startColorGlobal);
    let [eR, eG, eB] = hexToRgb(endColorGlobal);
    let colorArray = [];

    for (let step = 0; step < steps; step++) {
        let r = Math.round(sR + ((eR - sR) / (steps - 1)) * step);
        let g = Math.round(sG + ((eG - sG) / (steps - 1)) * step);
        let b = Math.round(sB + ((eB - sB) / (steps - 1)) * step);
        colorArray.push(`#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
    }

    return colorArray;
}

function formatColorCode(hexColor) {
    let r = parseInt(hexColor.slice(1, 3), 16) / 17;
    let g = parseInt(hexColor.slice(3, 5), 16) / 17;
    let b = parseInt(hexColor.slice(5, 7), 16) / 17;
    return includeEscapeCharacters ? `\\\\$${Math.floor(r).toString(16)}${Math.floor(g).toString(16)}${Math.floor(b).toString(16)}` : `$${Math.floor(r).toString(16)}${Math.floor(g).toString(16)}${Math.floor(b).toString(16)}`;
}

function colorizeString(inputString) {
    if (inputString.length < 2) return formatColorCode(startColorGlobal) + inputString;

    let colors = interpolateColors(inputString.length);
    let coloredString = "";
    let previewString = document.getElementById("previewString");
    previewString.innerHTML = "";

    for (let i = 0; i < inputString.length; i++) {
        let colorCode = formatColorCode(colors[i]);
        coloredString += `${colorCode}${inputString[i]}`;
        let span = document.createElement("span");
        span.style.color = colors[i];
        span.textContent = inputString[i];
        previewString.appendChild(span);
    }

    return coloredString;
}

function colorizeAndDisplay() {
    let inputString = document.getElementById("inputString").value;
    if(inputString) {
        let outputString = colorizeString(inputString);
        document.getElementById("outputString").innerText = outputString;
        // ADD UPDATE PREVIEW FUNCTION
    }
}

function updatePreview(previewContent) {
    document.getElementById("previewString").innerText = previewContent;
}

function toggleColorCard() {
    const modal = document.querySelector('.modal');
    const colorCard = document.getElementById('colorCard');

    modal.classList.toggle('modal-active');
    colorCard.classList.toggle('color-card-active');
}