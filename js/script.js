const addBookBtn = document.getElementsByClassName("add-book")[0];
const dialog = document.getElementsByTagName("dialog")[0];
const cancelBtn = document.getElementsByClassName("cancel")[0];
const submitBtn = document.querySelector("[type='submit']");
let deleteBtn = document.querySelectorAll(".delete");


const authorVal = document.querySelector("#author");
const titleVal = document.querySelector("#title");
const numberOfPagesVal = document.querySelector("#pages");
const isReadVal = document.querySelector("#read");
const rateVal = document.querySelector("#rate");
const table = document.getElementsByTagName("tbody")[0];




function randomId() {
  const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
  return uint32.toString(16);
}
const Book  = function(author, title, numberOfPages, isRead, rate) {
    
    this.id = randomId();
    this.author = author;
    this.title = title;
    this.numberOfPages = numberOfPages;
    this.isRead = isRead ? "yes" : "not yet!";
    this.rate = rate
}

class Library{

    books = [];

    addBookToLibrary(book) {
        this.books.push(book);
    }

    // addBookToLibrary(author, title, numberOfPages, isRead, rate) {
    //     const newBook = new Book(author, title, numberOfPages, isRead, rate);
    //     this.books.push(newBook);
    // }

    createTableRow(book){

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

    displayBooks(){
        if(this.books.length === 0){
            const tableRow = this.createTableRow(undefined);
            table.appendChild(tableRow);
            console.log(tableRow);
        }

        for(const book of this.books){
            const tableRow = this.createTableRow(book);
            table.appendChild(tableRow);
            
        }
    }

    removeBook(event){
        const id = event.target.parentElement.parentElement.parentElement.id;
        for (let index = 0; index < this.books.length; index++) {
            console.log(this.books);    
            if(this.books[index].id === id){
                this.books.splice(index, 1);
                const del = document.getElementById(`${id}`);
                del.innerHTML = "";
            }
        }
        if(this.books.length === 0){
            table.appendChild(this.createTableRow(undefined));
        }
    }

    submit(event){
        
        event.preventDefault();
        
        const newBook = new Book(
            authorVal.value,
            titleVal.value,
            numberOfPagesVal.value,
            isReadVal.value.toLowerCase() === "yes" ? true : false,
            rateVal.value ? rateVal.value : 0
        );

        this.books.push(newBook);
        if(this.books.length == 1){
            table.innerHTML = "";
        }
        const tableRow = this.createTableRow(newBook);
        table.appendChild(tableRow);

        deleteBtn = document.querySelectorAll(".delete");
        
        deleteBtn.forEach((button)=>{
        button.addEventListener("click", (event)=>{

            this.removeBook(event);
        });
        });

        dialog.close();
    }

}



const myLibrary = new Library();


const b1 = new Book("Robert C. Martin", "Clean Code", 464, true, 4.7);
const b2 = new Book("Eric Evans", "Domain-Driven Design", 560, false, 0);
const b3 = new Book("Martin Fowler", "Refactoring", 448, true, 4.5);
const b4 = new Book("Gayle Laakmann McDowell", "Cracking the Coding Interview", 687, true, 4.8);
const b5 = new Book("Andrew S. Tanenbaum", "Computer Networks", 960, false, 0);

console.log(myLibrary.books);
myLibrary.addBookToLibrary(b1);
myLibrary.addBookToLibrary(b2);
myLibrary.addBookToLibrary(b3);
myLibrary.addBookToLibrary(b4);
myLibrary.addBookToLibrary(b5);
console.log(myLibrary.books);


myLibrary.displayBooks();




addBookBtn.addEventListener("click", ()=>{
    dialog.showModal();
});

cancelBtn.addEventListener("click", ()=>{
    dialog.close();
});





submitBtn.addEventListener("click", (event)=>{
    myLibrary.submit(event);
});



deleteBtn = document.querySelectorAll(".delete");


deleteBtn.forEach((button)=>{
    button.addEventListener("click", (event) => {
        myLibrary.removeBook(event);
    });
});