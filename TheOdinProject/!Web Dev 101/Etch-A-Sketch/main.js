let grid = document.querySelector('.grid');

let gridRow = document.createElement('div');
gridRow.classList.add('grid-row')

let gridCell = document.createElement('div');
gridCell.classList.add('grid-cell');


createGrid(15);



let plusButton = document.querySelector('.plus');
let minusButton = document.querySelector('.minus');
minusButton.addEventListener('click', () => changeGridSize('minus'));
plusButton.addEventListener('click', () => changeGridSize('plus'));


let colorPicker = document.querySelector('.color-picker');
let color = `${colorPicker.value}`;


colorPicker.addEventListener('change', (e) => {
    color = e.target.value;
});



function createGrid(num) {
    for (let i = 0; i < num; i++) {
        gridRow.appendChild(gridCell.cloneNode(true));
    }
    for (let i = 0; i < num; i++) {
        grid.appendChild(gridRow.cloneNode(true));
    }

    let currentGridSize = document.querySelector('.grid-current-number');
    currentGridSize.innerHTML = num;

}


function changeGridSize(direction) {
    let allGridRows = document.querySelectorAll('.grid-row');
    let currentGridSize = document.querySelector('.grid-current-number');

    if (direction === 'plus') {
        if (currentGridSize.innerHTML === '64') return;
        currentGridSize.innerHTML = `${++currentGridSize.innerHTML}`;
        allGridRows.forEach(item => item.appendChild(gridCell.cloneNode(true)));
        gridRow.appendChild(gridCell.cloneNode(true));
        grid.appendChild(gridRow.cloneNode(true));
    } else if (direction === 'minus') {
        if (currentGridSize.innerHTML === '1') return;
        currentGridSize.innerHTML = `${--currentGridSize.innerHTML}`;
        allGridRows.forEach(item => item.removeChild(item.childNodes[0]));
        gridRow.removeChild(gridRow.childNodes[0]);
        grid.removeChild(grid.childNodes[1]);
    }

    clear();
}



function clear() {
    let allCells = document.querySelectorAll('.grid-cell');
    allCells.forEach(item => {
        item.style.backgroundColor = '#282828';
    })
}



grid.addEventListener('mouseover', (e) => {
    if (e.target.classList[0] === 'grid-cell') {
        e.target.style.backgroundColor = `${color}`;
    }
});




let clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', clear);