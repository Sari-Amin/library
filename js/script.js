function randomId() {
  const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
  return uint32.toString(16);
}

const myLibrary = [];

const Book  = function(author, title, numberOfPages, isRead, rate) {
    
    this.id = randomId();
    this.author = author;
    this.title = title;
    this.numberOfPages = numberOfPages;
    this.isRead = isRead ? "yes" : "not yet!";
    this.rate = rate
}

function addBookToLibrary(author, title, numberOfPages, isRead, rate) {
    const newBook = new Book(author, title, numberOfPages, isRead, rate);
    myLibrary.push(newBook);
}

const table = document.getElementsByTagName("tbody")[0];

function createTableRow(book){

    const tableRow = document.createElement("tr");
    if(book === undefined){
        
        const td = document.createElement("td");
        td.colSpan = "5";
        td.style["text-align"] = "center";
        td.innerText = "No entries";
        
        tableRow.appendChild(td);
        
        return tableRow;
    }
    
    for(let key in book){
        if(key === "id") continue;
        const td = document.createElement("td");
        td.innerText = book[key];
        if(key === "rate"){
            td.innerHTML = `<div class = "end"><p>${book[key]}</p><button class='delete'>delete</button></div>`
        }
        tableRow.id = book.id;
        tableRow.appendChild(td);
        
    }

    
    return tableRow;
}


function displayBooks(){
    if(myLibrary.length === 0){
        const tableRow = createTableRow(undefined);
        table.appendChild(tableRow);
        console.log(tableRow);
    }

    for(const book of myLibrary){
        const tableRow = createTableRow(book);
        table.appendChild(tableRow);
        
    }
}

function removeBook(event){
    const id = event.target.parentElement.parentElement.parentElement.id;
    for (let index = 0; index < myLibrary.length; index++) {
        if(myLibrary[index].id === id){
            myLibrary.splice(index, 1);
            const del = document.getElementById(`${id}`);
            del.innerHTML = "";
        }
    }
    if(myLibrary.length === 0){
        table.appendChild(createTableRow(undefined));
    }
}

const b1 = new Book("Robert C. Martin", "Clean Code", 464, true, 4.7);
const b2 = new Book("Eric Evans", "Domain-Driven Design", 560, false, 0);
const b3 = new Book("Martin Fowler", "Refactoring", 448, true, 4.5);
const b4 = new Book("Gayle Laakmann McDowell", "Cracking the Coding Interview", 687, true, 4.8);
const b5 = new Book("Andrew S. Tanenbaum", "Computer Networks", 960, false, 0);


myLibrary.push(...[b1,b2,b3,b4,b5]);

displayBooks();

const addBookBtn = document.getElementsByClassName("add-book")[0];
const dialog = document.getElementsByTagName("dialog")[0];
const cancelBtn = document.getElementsByClassName("cancel")[0];
const submitBtn = document.querySelector("[type='submit']");

const authorVal = document.querySelector("#author");
const titleVal = document.querySelector("#title");
const numberOfPagesVal = document.querySelector("#pages");
const isReadVal = document.querySelector("#read");
const rateVal = document.querySelector("#rate");



addBookBtn.addEventListener("click", ()=>{
    dialog.showModal();
});

cancelBtn.addEventListener("click", ()=>{
    dialog.close();
});

let deleteBtn = document.querySelectorAll(".delete");


function submit(event){
    
    event.preventDefault();
    
    const newBook = new Book(
        authorVal.value,
        titleVal.value,
        numberOfPagesVal.value,
        isReadVal.value.toLowerCase() === "yes" ? true : false,
        rateVal.value ? rateVal.value : 0
    );

    myLibrary.push(newBook);
    if(myLibrary.length == 1){
        table.innerHTML = "";
    }
    const tableRow = createTableRow(newBook);
    table.appendChild(tableRow);

    deleteBtn = document.querySelectorAll(".delete");
    
    deleteBtn.forEach((button)=>{
    button.addEventListener("click", removeBook);
    });

    dialog.close();
}

submitBtn.addEventListener("click", submit);

deleteBtn.forEach((button)=>{
    button.addEventListener("click", removeBook);
});