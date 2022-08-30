


const getPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const response = await fetch(url);
    const phones = await response.json();
    // console.log(phones.data)
    displayPhones(phones.data, dataLimit);

}
const displayPhones = (phones, dataLimit) => {
    // console.log(phones);

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    const showAll = document.getElementById('show-all');

    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    } else {
        showAll.classList.add('d-none');
    }

    const noPhone = document.getElementById('not-found-message');
    if (phones.length == 0) {
        noPhone.classList.remove('d-none');
    } else {
        noPhone.classList.add('d-none');
    }

    phones.forEach(phone => {
        const { brand, phone_name, slug, image } = phone;


        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
            <div class="card">
                   <img src="${image}" class="card-img-top" alt="...">
                   <div class="card-body">
                       <h6 class="card-title">Brand-${brand}, Phone-${phone_name}</h6>
                       <p class="card-text">ID-${slug}</p>
                   </div>
            </div>    
        `;
        phoneContainer.appendChild(phoneDiv);
    });
    toggleSpinner(false);

}
const searchProcess = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    searchText = searchField.value;
    getPhones(searchText, dataLimit);
    // searchField.value = '';
}

// phone search section start
document.getElementById('btn-search').addEventListener('click', function () {

    searchProcess(10);
})
// phone search section end

const toggleSpinner = isLoading => {
    const loader = document.getElementById('loader');
    if (isLoading) {
        loader.classList.remove('d-none');
    } else {
        loader.classList.add('d-none');
    }
}

document.getElementById('btn-show-all').addEventListener('click', function () {
    searchProcess();
})

// getPhones();