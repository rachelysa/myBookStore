
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
    if(elNameAndPrice[0].value||elNameAndPrice[1].value) addBook(elNameAndPrice[0].value, elNameAndPrice[1].value)
    document.querySelector('.modal').style.display='none'
    renderBooks();
    doTrans();
}

function onUpdateBook(bookId) {

    var newPrice =(getLang()==='en' )?+prompt('add a new price'):+prompt('הכנס מחיר חדש')
    updateBook(bookId, newPrice)
    renderBooks();
    doTrans();
}

function onSortChange(sortBy) {
    changeSort(sortBy);
    renderBooks();
    doTrans();
}
function closeAddModal() {
    var elModal = document.querySelector('.modal');
    // elModal.hidden = false;
    elModal.style.display='none'
}

function openAddModal() {
    var elModal = document.querySelector('.modal');
    // elModal.hidden = false;
    elModal.style.display='block'
}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.details-modal')
    elModal.querySelector('h3').innerText += ': ' + book.id;
    elModal.querySelector('h3').id = book.id;
    elModal.querySelector('h4').innerText += ': ' + book.name
    elModal.querySelector('p').innerText += ': ' + book.price
    elModal.style.display='block'
    elModal.querySelector('.rate-input').value = book.rate;

}

function onCloseModal() {
    var elModal = document.querySelector('.details-modal');
    // elModal.hidden = false;
    elModal.querySelector('h3').innerText='id';

    elModal.querySelector('h4').innerText='name'
    elModal.querySelector('p').innerText ='price'
    doTrans();
    elModal.style.display='none'
    var elInput = document.querySelector('.rate-input');
    elInput.value = '0';
}

function onChangeRate(count) {
    var elBookId = document.querySelector('h3');
    var elInput = document.querySelector('.rate-input');
    var currRate = changeRate(elBookId.id, count);
    elInput.value = currRate
    renderBooks()
    
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