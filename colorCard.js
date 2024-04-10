let isColorCardOpen = false;
let colorArrayGlobal = ["#0033CC", "#33FFFF"];

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('colorCountSelector').addEventListener('change', function(event) {
        const selectedCount = parseInt(event.target.value, 10);
        updateColorPickers(selectedCount);
        applyColorChanges();
    });

    updateColorPickers(parseInt(document.querySelector('input[name="colorCount"]:checked').value, 10));
});

document.getElementById('colorCountSelector').addEventListener('change', function(event) {
    updateColorPickers(event);
    colorizeAndDisplay();
});

function toggleColorCard() {
    const modal = document.querySelector('.modal');
    const colorCard = document.getElementById('colorCard');

    isColorCardOpen = !isColorCardOpen;
    colorCard.classList.toggle('color-card-active');

    adjustModalPosition();
}

function updateColorPickers(count) {
    const colorPickersContainer = document.getElementById('colorPickers');
    colorPickersContainer.innerHTML = ''; // Clear existing pickers

    for (let i = 0; i < count; i++) {
        const colorPicker = document.createElement('input');
        colorPicker.type = 'color';
        colorPicker.id = `picker${i}`;
        colorPicker.value = colorArrayGlobal[i] || '#FFFFFF';

        colorPicker.addEventListener('change', function() {
            colorArrayGlobal[i] = this.value;
            colorizeAndDisplay();
        });

        colorPickersContainer.appendChild(colorPicker);
    }

    colorArrayGlobal.length = count;
    colorArrayGlobal.fill('#FFFFFF', colorArrayGlobal.length, count);
}

function applyColorChanges() {
    const pickers = document.querySelectorAll('#colorPickers input[type="color"]');
    colorArrayGlobal = Array.from(pickers).map(picker => picker.value);
    colorizeAndDisplay();
}

function generateRandomColor() {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    return randomColor;
}

function randomizeColors() {
    const colorPickers = document.querySelectorAll('#colorPickers input[type="color"]');
    colorPickers.forEach((picker, index) => {
        const randomColor = generateRandomColor();
        picker.value = randomColor;
        colorArrayGlobal[index] = randomColor;
    });
    colorizeAndDisplay();
}

function handleColorChange(event) {
    const index = parseInt(event.target.id.replace('picker', ''), 10);
    colorArrayGlobal[index] = event.target.value;
    colorizeAndDisplay();
}


function swapColorValues() {
    const colorPickers = document.querySelectorAll('#colorPickers input[type="color"]');
    const visibleColorPickers = Array.from(colorPickers).filter(picker => picker.style.display !== 'none');
    
    const count = visibleColorPickers.length;
    
    for (let i = 0; i < Math.floor(count / 2); i++) {
        const endIndex = count - 1 - i;
        let temp = visibleColorPickers[i].value;
        visibleColorPickers[i].value = visibleColorPickers[endIndex].value;
        visibleColorPickers[endIndex].value = temp;
    }
    
    colorizeAndDisplay();
}

function randomizeColors() {
    const colorPickers = document.querySelectorAll('#colorPickers input[type="color"]');
    colorPickers.forEach(picker => {
        picker.value = generateRandomColor();
        picker.dispatchEvent(new Event('change'));
    });
}

const defaultColors = ["#0033CC", "#33FFFF", "#FF33CC", "#CC33FF", "#33CCFF"];

function setDefaultColors() {
    const colorPickers = document.querySelectorAll('#colorPickers input[type="color"]');
    colorPickers.forEach((picker, index) => {
        const defaultColor = defaultColors[index % defaultColors.length];
        picker.value = defaultColor;
        colorArrayGlobal[index] = defaultColor;
    });
    colorizeAndDisplay();
}

document.getElementById('togglePresets').addEventListener('click', function() {
    document.getElementById('presetsPanel').style.display = document.getElementById('presetsPanel').style.display === 'none' ? 'block' : 'none';
});

function applyPresetColors(colors) {
    colorArrayGlobal = colors;
    const colorCount = colors.length;
    document.getElementById('colorCount').value = colorCount.toString();
    updateColorPickers(colorCount);
    colorizeAndDisplay();
}

document.getElementById('togglePresets').addEventListener('click', function() {
    const presetsPanel = document.getElementById('presetsPanel');
    presetsPanel.classList.toggle('show');

    if (presetsPanel.classList.contains('show')) {
        const presetButtons = document.querySelectorAll('.preset-btn');
        setTimeout(() => {
            presetButtons.forEach(button => button.style.opacity = 1);
        }, 500);
    } else {
        const presetButtons = document.querySelectorAll('.preset-btn');
        presetButtons.forEach(button => button.style.opacity = 0);
    }
});


function applyPresetColors(colorArray) {
    // Update global color array with the new preset colors
    colorArrayGlobal = [...colorArray];

    // Update the UI for the number of colors by programmatically checking the appropriate radio button
    document.querySelector(`input[name="colorCount"][value="${colorArray.length}"]`).checked = true;

    // Call updateColorPickers to adjust the number of visible color pickers
    updateColorPickers(colorArray.length);

    // Update each color picker's value with the colors from the preset
    colorArray.forEach((color, index) => {
        document.getElementById(`picker${index}`).value = color;
    });

    // Update the display with the new colors
    colorizeAndDisplay();
}

function updateColorPickers(count) {
    const colorPickersContainer = document.getElementById('colorPickers');
    // Clear existing pickers
    colorPickersContainer.innerHTML = '';

    // Create new pickers based on count
    for (let i = 0; i < count; i++) {
        const colorPicker = document.createElement('input');
        colorPicker.type = 'color';
        colorPicker.id = `picker${i}`;
        colorPicker.onchange = handleColorChange;
        colorPicker.value = colorArrayGlobal[i] || '#FFFFFF'; // Use existing global color or default
        colorPickersContainer.appendChild(colorPicker);
    }

    // Adjust global color array length
    if (colorArrayGlobal.length > count) {
        colorArrayGlobal.length = count; // Reduce size
    } else {
        while (colorArrayGlobal.length < count) {
            colorArrayGlobal.push('#FFFFFF'); // Fill with default colors
        }
    }
}

