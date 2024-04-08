let isColorCardOpen = false;
let colorArrayGlobal = ["#0033CC", "#33FFFF"];

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('colorCount').addEventListener('change', updateColorPickers);
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
    colorPickersContainer.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const colorPicker = document.createElement('input');
        colorPicker.type = 'color';
        colorPicker.id = 'color' + i;
        colorPicker.onchange = handleColorChange;

        colorPicker.value = colorArrayGlobal[i] || '#FFFFFF';

        colorPickersContainer.appendChild(colorPicker);
    }

    colorArrayGlobal = colorArrayGlobal.slice(0, count).concat(
        new Array(count - colorArrayGlobal.length).fill('#FFFFFF')
    );
}

function handleColorChange(event) {
    const index = parseInt(event.target.id.replace('color', ''), 10);
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
