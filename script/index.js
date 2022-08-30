



const getPhones = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const response = await fetch(url);
    const phones = await response.json();
    displayPhones(phones.data);
}

const displayPhones = (phones) => {
    // console.log(phones);
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = '';

    phones.slice(0, 10);
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
          </div>
        </div>
        `;

        phonesContainer.appendChild(phoneDiv);
    })
}

document.getElementById('search-btn').addEventListener('click', function () {
    const phoneSearch = document.getElementById('phone-search');
    const searchText = phoneSearch.value;
    getPhones(searchText);
})

// getPhones('samsu');