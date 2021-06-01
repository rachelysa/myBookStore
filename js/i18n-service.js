var gTrans = {
    title: {
        en: 'My book shop',
        he: 'חנות הספרים שלי'
    },
    add: {
        en: 'add new book',
        he: 'הוסף ספר חדש',
    },
    'add-book-name': {
        en: 'enter book name',
        he: 'הכנס שם לספר',
    },
    'add-book-price': {
        en: 'enter book price',
        he: 'הכנס מחיר לספר '
    },
    'add-book-btn': {
        en: 'add',
        he: 'הוסף',
    },
    'next-btn': {
        en: 'next',
        he: 'הבא',
    },
    'prev-btn': {
        en: 'prev',
        he: 'קודם',
    },
    id: {
        en: 'id',
        he: 'קוד ספר'
    },
    name: {
        en: 'name',
        he: 'שם'
    },
    price: {
        en: 'price',
        he: 'מחיר'
    },
    rate: {
        en: 'rate',
        he: 'ניקוד'
    },
    action: {
        en: 'action',
        he: 'פעולות'
    },
    'read-btn': {
        en: 'read',
        he: 'פרטים'
    },
    'update-btn': {
        en: 'update',
        he: 'עדכן'
    },
    'delete-btn': {
        en: 'delete',
        he: 'מחק'
    },
    close: {
        en: 'close',
        he: 'סגור'
    },

}

var gCurrLang = 'en';

function getTrans(transKey) {
    var keyTrans = gTrans[transKey]
    // console.log(keyTrans);

    // TODO: if key is unknown return 'UNKNOWN'
    if (!keyTrans) return 'UNKNOWN'
    // TODO: get from gTrans

    var txt = keyTrans[gCurrLang];
    // TODO: If translation not found - use english
    if (!txt) return keyTrans.en

    return txt
}

function doTrans() {
    // TODO: 
    var els = document.querySelectorAll('[data-trans]')
    // console.log(els);

    // for each el:
    //    get the data-trans and use getTrans to replace the innerText 
    els.forEach(function (el) {
        // console.dir(el)
        var txt = getTrans(el.dataset.trans)
        if (el.nodeName === 'INPUT') el.placeholder = txt;
        else el.innerText = txt
        //    ITP: support placeholder  
            
        // console.log('el.dataset', el.dataset.trans);       
    })
}

function setLang(lang) {
    gCurrLang = lang;
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(time) {

    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}

function kmToMiles(km) {
    return km / 1.609;
}