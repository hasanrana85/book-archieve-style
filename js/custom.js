/* -----------------search item box-------------------------- */
const searchItem = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    loadBooks(searchText);
}
/* -----------------set loading spinner--------------------------- */
const loadSpinner = spinnerStyle => {
    document.getElementById('spinner-1st').style.display = spinnerStyle;
}

/* ---------------load books from api------------------------------ */
const loadBooks = searchText => {
    if (searchText === '') {
        /* -------------Clear previous data----------------- */
        const errorHold2 = document.getElementById('error-2');
        errorHold2.textContent = '';

        const countSearch = document.getElementById('count-search');
        countSearch.innerHTML = '';

        const containerItem = document.getElementById('item-container');
        containerItem.textContent = '';

        /*----------Searching blanks error show-----------------*/
        const errorHold1 = document.getElementById('error-1');
        const divError1 = document.createElement('div');
        divError1.innerHTML = `
        <h3 class="text-white text-center fw-bold bg-danger w-50 mx-auto p-3 rounded-3">please input data in search box!</h3>
        `;
        errorHold1.appendChild(divError1);
    } else {
        /* ----------Loading spinner----------------- */
        loadSpinner('block');

        /*------------Clear previous error----------------- */
        const errorHold1 = document.getElementById('error-1');
        errorHold1.textContent = '';

        /* -----------load books from api start--------------- */
        url = `http://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayBooks(data));
    }

}

const displayBooks = books => {
    console.log(books);
    if (books.docs.length === 0) {
        /* --------------Clear spinner------------------- */
        loadSpinner('none');
        /* ------------Clear privious data---------------- */
        const errorHold1 = document.getElementById('error-1');
        errorHold1.textContent = '';

        const countSearch = document.getElementById('count-search');
        countSearch.innerHTML = '';

        const containerItem = document.getElementById('item-container');
        containerItem.textContent = '';

        /* ---------Show No result found Error--------------- */
        const errorHold2 = document.getElementById('error-2');
        const divError2 = document.createElement('div');
        divError2.innerHTML = `
        <h3 class="text-white text-center fw-bold bg-danger w-50 mx-auto p-3 rounded-3">No Books found! Try again</h3>
        `;
        errorHold2.appendChild(divError2);
    } else {
        /* ----------Clear privious data from UI------------ */
        const errorHold1 = document.getElementById('error-1');
        errorHold1.textContent = '';

        const errorHold2 = document.getElementById('error-2');
        errorHold2.textContent = '';

        /* -----------Show the found books result---------------- */
        const countSearch = document.getElementById('count-search');
        countSearch.innerHTML = '';
        const countArea = document.createElement('h3');
        countArea.innerHTML = `
        <h3 class="p-3 text-primary">Books Found: ${books.numFound}</h3>
    `;
        countSearch.appendChild(countArea);

        /* ---------------------display books------------------------- */
        const containerItem = document.getElementById('item-container');
        containerItem.textContent = '';
        books.docs.forEach(book => {
            //console.log(book);
            const div = document.createElement('div');
            div.classList.add('col-md-4', 'col-lg-4', 'col-sm-6', 'col-12');
            div.innerHTML = `
         <div class="card h-100">
      <img class="img-fluid img-thumbnail" style="height: 400px;" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" alt="">
      <div class="card-body">
        <h5 class="card-title text-primary fw-bold fs-2">${book.title}</h5>
        <h5><span class="text-info">Author Name:</span> ${book.author_name}</h5>
                                       <h5><span class="text-info">Publisher Name:</span>${book.publisher}</h5>
                                       <h6 class="text-primary fs-4">First Published: ${book.first_publish_year}</h6>
      </div>
    </div>
        `;
            containerItem.appendChild(div);

            /* ---------Clear loading spinner-------------- */
            loadSpinner('none');
        });

    }


}