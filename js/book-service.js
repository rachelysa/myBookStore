const STORAGE_KEY = 'bookShop'
var gBooks = _createBooks();
var gSortedBy = 'name';
var gBooksName = ['aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff', 'ggg', 'hhh', 'iii', 'jjj'];
const PAGE_SIZE = 5;
var gPageIdx = 0

function deleteBook(bookId) {
    var bookIdx = getBookIdx(bookId);
    gBooks.splice(bookIdx, 1)
    saveToStorage(STORAGE_KEY, gBooks);


}

function addBook(name, price) {
    var book = _createBook(name, price)
    gBooks.unshift(book);
    saveToStorage(STORAGE_KEY, gBooks);
}

function getBookById(bookId) {
    var book = gBooks.find(function (book) {
        return bookId === book.id
    })
    return book
}

function getBookIdx(bookId) {
    return gBooks.findIndex(function (book) {
        return bookId === book.id
    })
}

function updateBook(bookId, newPrice) {
    var bookIdx = getBookIdx(bookId);
    gBooks[bookIdx].price = newPrice;
    saveToStorage(STORAGE_KEY, gBooks);
}

function changeRate(bookId, count) {
    var bookIdx = getBookById(bookId);
    if (bookIdx.rate >= 10) return 10;
    bookIdx.rate += count;


    saveToStorage(STORAGE_KEY, gBooks);
    return bookIdx.rate;
}

function getBooks() {
    console.log({ gSortedBy });
    if (gSortedBy === 'name') {
        gBooks.sort(function (a, b) {

            return (a.name > b.name) ? 1 : -1
        });
    }
    else {
        gBooks.sort(function (a, b) {

            return (a.price - b.price)
        });
    }
 
    var startIdx = gPageIdx*PAGE_SIZE;
    return gBooks.slice(startIdx,startIdx+PAGE_SIZE)
}

function changeSort(sortBy) {
    gSortedBy = sortBy;
}
function changePage(diff){
  
    if (diff>0&&(PAGE_SIZE)*(gPageIdx+1)>=gBooks.length) return;
    if (diff<0&&(PAGE_SIZE)*(gPageIdx-1)<0) return;
    gPageIdx+=diff;
    
   
}
function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)

    if (!books || !books.length) {
        gBooksName =  ['harry poter', 'little women', 'jane eyne', 'les misérables', 'the secret garden', 'the world according to garp', 'the book thief', 'sinderela', 'gmara', 'bibble'];
  
        books = gBooksName.map(function (name) {
          return  _createBook(name, getRandomIntInclusive(0, 100))
        })

        saveToStorage(STORAGE_KEY, books);
    }
    return books;
}

function _createBook(name, price) {
    var book = {
        id: makeId(),
        name,
        price,
        rate: 0
    }
    return book;
}


