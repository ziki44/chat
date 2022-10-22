import { v4 as uuidv4 } from 'uuid';
import { post } from '../helpers/http';
import { URLS } from '../helpers/urls';


// const booksFromLocalDatabase = [
//   {
//     title: "Harry Potter i kamień filozoficzny",
//     category: "Fantasy",
//     author: "J.K. Rowling",
//     year: 1992,
//     price: 49.99,
//   },
//   {
//     title: "God father",
//     category: "Crime",
//     author: "Mario Puzo",
//     year: 1960,
//     price: 59.99,
//   }
// ]

// let bookLibrary = JSON.parse(localStorage.getItem('books'));

// if(!bookLibrary) {
//   bookLibrary = booksFromLocalDatabase
// }

// Forma skrocona przy uzyciu operatora ??

let bookLibrary = []

const booksList = document.querySelector('#list');
const booksForm = document.querySelector('#booksForm');
const searchInput = document.querySelector('#searchInput')
const addBookForm = document.querySelector('#addBookForm');

const addBookTitleInput = document.querySelector('#newBookTitle')
const addBookCategoryInput = document.querySelector('#newBookCategory')
const addBookYearInput = document.querySelector('#newBookYear')
const addBookAuthorInput = document.querySelector('#newBookAuthor')
const addBookPriceInput = document.querySelector('#newBookPrice')

// * Destrukcja obiektow
// books.forEach(({ title, category  }) => {
//   booksList.innerHTML += `
//     <li>
//       <h2>${title}</h2>
//       <p>Kategoria: ${category}</p>
//     </li>
//   `
// })

const fetchBooks = () => {
  // fetch
  fetch(URLS.books)
    .then((response) => {
      return response.json();
    })
    .then(data => {
      bookLibrary = data;
      renderBooks(data);
    })
    .catch(error => {
      console.log(error.message);
    })
}

const postBook = (newBook) => {
    post(URLS.books, newBook)
    .then(() => {
        bookLibrary.push(newBook);
        renderBooks(bookLibrary)
    })
}

// ES7 Async/await*
// const fetchBooks = async () => {
//   try {
//     const response = await fetch('http://localhost:3000/books')
//     const data = await response.json()

//     bookLibrary = data;
//     renderBooks(data);
//   } catch(error) {
//     console.log(error.message);
//   }
// }


const renderBooks = (books) =>  {
  booksList.innerHTML = '';

  books.forEach((book) => {
    booksList.innerHTML += `
      <li>
        <h2>${book.title}</h2>
        <p>Kategoria: ${book.category}</p>
        <p>Autor: ${book.author}</p>
        <p>Rok Wydania: ${book.year}</p>
        <p>Cena: ${book.price}zł</p>
      </li>
    `
  })
}

const filterBook = event => {
  event.preventDefault();

  const foundBooks = bookLibrary.filter(book => {
    return book.title.toLowerCase().includes(searchInput.value.toLowerCase())
  })

  renderBooks(foundBooks);
  searchInput.value = '';
}

const addBook = event => {
  event.preventDefault();

  const newBook = {
    id: uuidv4(),
    title: addBookTitleInput.value,
    category: addBookCategoryInput.value,
    author: addBookAuthorInput.value,
    year: addBookYearInput.value,
    price: addBookPriceInput.value
  }

  postBook(newBook)

  addBookTitleInput.value = ''
  addBookCategoryInput.value = ''
  addBookAuthorInput.value = ''
  addBookYearInput.value = ''
  addBookPriceInput.value = ''
}

fetchBooks()
booksForm.addEventListener('submit', filterBook)
addBookForm.addEventListener('submit', addBook)