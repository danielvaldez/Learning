
let myLibrary = JSON.parse(localStorage.getItem('library'));
if(myLibrary === null) {
    myLibrary = [];
}

// Renders Cards on Load
for(item of myLibrary) {
    render(item);
}


let form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    getFormData();
});



let cards = document.querySelectorAll('.card');
for(let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', (e) => {
        deleteCard(cards, i, e);
        changeReadState(i, e);
    });
}

// modal buttons
let closeModalBtn = document.querySelector('.close-modal'),
    openModalBtn = document.querySelector('.add-book'),
    checkbox = document.querySelector('input[type="checkbox"]'),
    checkboxLabel = document.querySelector('label[for="checkbox"]'),
    modal = document.querySelector('.modal-back');

closeModalBtn.addEventListener('click', () => {  
    modal.style.display = 'none';
    resetForm();
});

openModalBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

checkbox.addEventListener('change',() => {
    let checkboxLabel = document.querySelector('label[for="checkbox"]');
    if(checkbox.checked) {
        checkboxLabel.innerHTML = "I've read this.";
    } else {
        checkboxLabel.innerHTML = "I haven't read this.";
    }
});



function Book() {
    this.title = form.elements[0].value,
    this.author = form.elements[1].value,
    this.pages = form.elements[2].value + ' Pages',
    this.init = function() {
        if(form.elements[3].checked === true) {
            this.read = 'Read';
        } else {
            this.read = 'Not Read';
        }
    }
    this.init();
}

function addBookToLibrary(bookObj) {
    myLibrary.push(bookObj);
    localStorage.setItem('library', JSON.stringify(myLibrary));
}


function render(item) {
    let cardContainer = document.querySelector('.card-container');

    let card = document.createElement('div');
    card.setAttribute('class', 'card');
    
    let newDiv = document.createElement('div');

    let read = document.createElement('p');
    read.setAttribute('class', 'read');
    read.innerHTML = `${item.read}`;
    if(item.read === 'Not Read') {
        read.style.color = 'red';
    }

    let deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'close-modal delete');
    deleteBtn.innerHTML = '<ion-icon name="close"></ion-icon>';
    
    newDiv.appendChild(read);
    newDiv.appendChild(deleteBtn);

    let title = document.createElement('h2'),
        author = document.createElement('h3'),
        pages = document.createElement('p');

    title.innerHTML = `${item.title}`,
    author.innerHTML = `${item.author}`,
    pages.innerHTML = `${item.pages}`;

    card.appendChild(newDiv),
    card.appendChild(title),
    card.appendChild(author),
    card.appendChild(pages);

    cardContainer.appendChild(card);
}


function getFormData() {
    let bookObj = new Book();
    addBookToLibrary(bookObj);
    resetForm();
    render(bookObj);
}

function resetForm() {
    form.reset();
    modal.style.display = 'none';
    checkboxLabel.innerHTML = "I haven't read this.";
}

function deleteCard(card, i, e) {
    if(e.target.tagName === 'ION-ICON' || e.target.tagName === 'BUTTON') {
        card[i].remove();
        myLibrary.splice(i, 1);
        localStorage.setItem('library', JSON.stringify(myLibrary));
    }
}

function changeReadState(i, e) {
    if(e.target.innerHTML === 'Read') {
        e.target.innerHTML = 'Not Read';
        e.target.style.color = 'red';
        myLibrary[i].read = 'Not Read';
    } else if(e.target.innerHTML === 'Not Read') {
        e.target.innerHTML = 'Read';
        e.target.style.color = 'green';
        myLibrary[i].read = 'Read';
    }
    localStorage.setItem('library', JSON.stringify(myLibrary));
}
