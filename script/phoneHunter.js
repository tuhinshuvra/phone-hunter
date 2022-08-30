


const getPhones = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const response = await fetch(url);
    const phones = await response.json();
    // console.log(phones.data)
    displayPhones(phones.data);

}
const displayPhones = phones => {
    // console.log(phones);

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    phones = phones.slice(0, 10);

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
    })
}

// phone search section start
document.getElementById('btn-search').addEventListener('click', function () {
    const searchField = document.getElementById('search-field');
    searchText = searchField.value;
    getPhones(searchText);
    searchField.value = '';
})
// phone search section end

// getPhones();