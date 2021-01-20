let myLibrary = JSON.parse(localStorage.getItem("mySavedLibrary")) || [];



const book_list = document.getElementById("book-list")

function Book(title, author, num_pages, isRead) {
  this.title = title
  this.author = author
  this.num_pages = num_pages
  this.isRead = isRead
  this.info = function() {
    return `${this.title} by ${this.author}, ${this.num_pages} pages, ${this.isRead}`
  }
}

function addBookToLibrary(book) {
  book.index = myLibrary.length
  myLibrary.push(book)
}

function displayBooks() {
  myLibrary.forEach(function (book) {
    let addedBook = book_list.insertRow(-1);

    addedBook.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.num_pages}</td>
  <td><button type="button" onclick="readBook(${book.index})" class="btn btn-outline-primary btn-sm read">${book.isRead}</button></td>
  <td><button type="button" onclick="removeBookFromLibrary(${book.index})" class="btn btn-outline-danger btn-sm remove">remove</button></td>
  `;
  });
}

function resetBookDisplay() {
  book_list.innerHTML = "";
}


function removeBookFromLibrary(bookIndex) {
  myLibrary.splice(bookIndex, 1);
  localStorage.setItem("mySavedLibrary", JSON.stringify(myLibrary));
  resetBookDisplay();
  displayBooks();
}

function readBook(bookIndex) {
  myLibrary[bookIndex].isRead = !myLibrary[bookIndex].isRead
  localStorage.setItem("mySavedLibrary", JSON.stringify(myLibrary));
  resetBookDisplay();
  displayBooks();
}

displayBooks();

const submit = document.getElementById("submit-button");

submit.onclick = function() {
  let new_book_title = document.getElementById("bookTitle").value;
  let new_book_author = document.getElementById("bookAuthor").value;
  let new_book_page_num = document.getElementById("bookPages").value;
  let new_book_read_status = document.getElementById("isRead").value;

  const book = new Book(new_book_title, new_book_author, new_book_page_num, new_book_read_status === 'on' ? true : false);
  addBookToLibrary(book);

  localStorage.setItem("mySavedLibrary", JSON.stringify(myLibrary));

  resetBookDisplay();
  displayBooks();

  return false;
}
