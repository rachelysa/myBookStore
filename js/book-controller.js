
function init() {

    renderBooks();
    doTrans();
}

function renderBooks() {
    var books = getBooks();
    // books = books.splice(from, to);
    // var startIdx = gPageIdx*PAGE_SIZE
    // books = books.slice(startIdx, startIdx+PAGE_SIZE);
    var strHtml = '';
    books.forEach(function (book) {
        strHtml += '<tr>';
        var className;
        for (var key in book) {
            className = 'details';
            if(key=='price')strHtml += `<td  class="${className}"  >
               ${formatCurrency(book[key])}
            </td>`;
           else strHtml += `<td  class="${className}"  >
               ${book[key]}
            </td>`;
        }
        className = 'action'
        strHtml += `<td class="${className}"><button data-trans="read-btn" onclick="onReadBook('${book.id}')" class="my-btn read">read</button></td>
        <td class="${className}"><button data-trans="update-btn" onclick="onUpdateBook('${book.id}')" class="my-btn update">update</button></td>
        <td class="${className}"><button data-trans="delete-btn" onclick="onDeleteBook('${book.id}')" class="my-btn delete">delete</button></td>`
        strHtml += '</tr>';
    })

    var elMat1 = document.querySelector('.books');
    elMat1.innerHTML = strHtml;
}

function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks();
    doTrans();
}

function onAddBook() {
    var elNameAndPrice = document.querySelectorAll('.add-input');
    addBook(elNameAndPrice[0].value, elNameAndPrice[1].value)
    document.querySelector('.add').hidden = true
    renderBooks();
    doTrans();
}

function onUpdateBook(bookId) {

    var newPrice = +prompt('price?')
    updateBook(bookId, newPrice)
    renderBooks();
    doTrans();
}

function onSortChange(sortBy) {
    changeSort(sortBy);
    renderBooks();
    doTrans();
}

function openAddModal() {
    var elModal = document.querySelector('.add');
    elModal.hidden = false;
}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.details-modal')
    elModal.querySelector('h3').innerText += ': ' + book.id;
    elModal.querySelector('h3').id = book.id;
    elModal.querySelector('h4').innerText += ': ' + book.name
    elModal.querySelector('p').innerText += ': ' + book.price
    elModal.hidden = false;
    elModal.querySelector('.rate-input').value = book.rate;

}

function onCloseModal() {
    document.querySelector('.details-modal').hidden = true;
    var elInput = document.querySelector('.rate-input');
    elInput.value = '0';
}

function onChangeRate(count) {
    var elBookId = document.querySelector('h3');
    var elInput = document.querySelector('.rate-input');
    var currRate = changeRate(elBookId.id, count);
    elInput.value = currRate
    renderBooks()
    doTrans();
}

function onChangePage(diff) { //diff
    changePage(diff);
    renderBooks();
    doTrans();
}

function onSetLang(lang) {
    setLang(lang);
    // TODO: if lang is hebrew add RTL class to document.body
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    renderBooks();
    doTrans();
}