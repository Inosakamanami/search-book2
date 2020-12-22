"use strict";

function _onSubmit(e) {
    const query = e.target.elements['q'].value;
    if (!query) {
        window.alert('本のタイトルを入力してください。');
        e.preventDefault(); // formタグのSubmitを止める
    }
}

window.addEventListener('load', function () {
    const q = getParamater('q');
    console.log(q);
    searchBooksBy(q);

    search.innerHTML += `
    <div class = "flex flex-center-justified">
    <h2>${q}</h2>
    <h2>検索結果</h2>
    </div>
    `
})
/**
* URLのパラメータから引数で指定されたパラメータ名の値を返却する.
* @param name {string} パラメータの名前です。
* @return {string} パラメータに一致した値を返します。
*/
function getParamater(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
        results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

/**
* 引数のクエリで本のリストを検索する.
*
* @param query {string}
*/
function searchBooksBy(query) {
    if (!query) {
        return [];  // queryがないため検索を行わない.
    }
    // // https://developers.google.com/books/docs/v1/getting_started?hl=ja#rest-in-the-books-api
    const by = 'relevance';
    const fields = 'fields=items(id,volumeInfo/*,accessInfo(embeddable,country,viewability))';
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&orderBy=${by}&${fields}&download=epub&maxResults=20`)
        .then(res => res.json())
        .then(data => _itemsChanged(data.items))
        .catch((e) => console.error(e, `Search books fetch error. query is ${query}`));

}





function _itemsChanged(items) {
    console.log(items);
    const booksElements = document.getElementById('books');
    for (let i = 0; i < items.length; i++) {
        const title = items[i].volumeInfo.title;
        const thumbnail = items[i].volumeInfo.imageLinks.thumbnail;
        const description = items[i].volumeInfo.description;

        results.innerHTML += `
        <div class = "resultsbox flex flex-horizontal">
            <div class="flex flex-vertical">
            <img src="${thumbnail}" alt="">
            <button class="btn-results">詳細</button>
            </div>
            <div>
                <h2>${title}</h2>
                <p class = "resultscard">${description}</p>
            </div>
        </div>
        `
    }

    const button = document.getElementById('button');
    const auther = this.items.volumeInfo.auther;
    const page = this.items.volumeInfo.pageCount;

    button.addEventListener('onclick', function () {

        results.innerHTML += `
        <div class = "detailbox">
            <h2>${title}</h2>
            <div class="flex flex-horizontal">
                <div class="flex flex-vertical">
                    <img src="${thumbnail}" alt=""> 
                    <a class="btn-detail" href="${buylink}">購入</a>
                </div>
            </div>
            <div class="flex flex-vertical">
                <p>・${auther}作</p>               
                <p>・${page}ページ</p>   
            </div>            
            <p class = "resultscard">${description}</p>
        </div>
        `
    });

}

// window.addEventListener('load', function () {
//     const title = items[i].volumeInfo.title;
//         const thumbnail = items[i].volumeInfo.imageLinks.thumbnail;
//         const description = items[i].volumeInfo.description;

//     details.innerHTML += `
//     <div class = "resultsbox flex flex-horizontal">
//             <img src="${thumbnail}" alt="">
//             <a href="detail.html">
//             <div>
//                 <h2>${title}</h2>
//                 <p class = "resultscard">${description}</p>
//             </div>
//             </a>
//         </div>
//         `
// })
// function _itemsChanged(items) {
//     console.log(items);
//     const booksElements = document.getElementById('books');
//     for (let i = 0; i < items.length; i++) {
//         const title = items[i].volumeInfo.title;
//         const thumbnail = items[i].volumeInfo.imageLinks.thumbnail;
//         const description = items[i].volumeInfo.description;
//         details.innerHTML += `
//         <div class = "resultsbox flex flex-horizontal">
//             <img src="${thumbnail}" alt="">
//             <div>
//                 <h2>${title}</h2>
//                 <p class = "resultscard">${description}</p>
//             </div>
//         </div>
//         `
//     }

// }
// const a = document.querySelector('a');

// a.addEventListener('click', event => {
//     const q = getParamater('q');
//     searchBooksBy(q);
//     console.log('q');

//     //   button.innerHTML = `Click count: ${event.detail}`;
//     detail.innerHTML += `
//         <div class = "flex flex-center-justified">
//         <h2>${q}</h2>
//         <h2>検索結果</h2>
//         </div>
//         `
//     console.log("d");
// });

// getDetailLink() {
//     return './index.html?id=${this.id}';
// }
// constructor(item) {
//     const volumeInfo = item.volumeInfo;
//     this.title = volumeInfo.title;
//     this.subtitle = volumeInfo.subtitle;
//     this.description = volumeInfo.description;
//     this.pageCount = volumeInfo.pageCount;
//     this.smallThumbnail = volumeInfo.imageLinks.smallThumbnail;
//     this.thumbnail = volumeInfo.imageLinks.thumbnail;
//     this.id = item.id;
//     this.publisher = volumeInfo.publisher;
//     this.publishedDate = volumeInfo.publishedDate;
//     this.previewLink = volumeInfo.previewLink;
//     this.authors = volumeInfo.authors;
//     const saleInfo = item.saleInfo;
//     if(saleInfo) {
//         this.buyLink = saleInfo.buyLink;
//     }
// }
// window.addEventListener('load', function(){
//     const q = getParamater('q');
//     console.log(q);
//     searchBooksBy(q);

//     search.innerHTML +=`
//     <div class = "flex flex-center-justified">
//     <a href="${this.getDetailLink()}">
//     <h2>${q}</h2>
//     <h2>検索結果</h2>
//     </div>
//     </a>
//     `
// })