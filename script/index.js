



const getPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const response = await fetch(url);
    const phones = await response.json();
    displayPhones(phones.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    // console.log(phones);
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = '';

    const showAll = document.getElementById('show-all');

    if (dataLimit && (phones.length > 10)) {
        phones = phones.slice(0, 10);

        showAll.classList.remove('d-none')
    } else {
        showAll.classList.add('d-none')
    }

    const notFoundMessage = document.getElementById('not-found-message')
    if (phones.length == 0) {
        notFoundMessage.classList.remove('d-none')
    } else {
        notFoundMessage.classList.add('d-none')
    }

    phones.forEach(phone => {

        const { brand, phone_name, slug, image } = phone;

        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card h-100">
          <img src="${image}" class="card-img-top" alt="...">
          <div class="card-body">
             <h6 class="card-title">Brand-${brand}, Model-${phone_name}</h6>
             <p class="card-text">${slug}</p>
             <button href="#" class="btn btn-outline-primary">Show Details</button>
          </div>
        </div>
        `;

        phonesContainer.appendChild(phoneDiv);
    });
    // stop loader
    toggleLoader(false);
}

const processSearch = (dataLimit) => {

    toggleLoader(true);
    const phoneSearch = document.getElementById('phone-search');
    const searchText = phoneSearch.value;
    getPhones(searchText, dataLimit);
}

document.getElementById('search-btn').addEventListener('click', function () {

    // start loader
    processSearch(10);

})

document.getElementById('phone-search').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
    }
});

const toggleLoader = (isLoading) => {
    const loader = document.getElementById('loader');
    if (isLoading) {
        loader.classList.remove('d-none');
    } else {
        loader.classList.add('d-none');
    }
}

document.getElementById('show-all-btn').addEventListener('click', function () {
    processSearch();
})


// getPhones('samsu');