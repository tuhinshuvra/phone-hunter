


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
                   <button onclick="showPhoneDetails('${slug}')" href="#" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#phoneHunterModal">Show Details</button>

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



document.getElementById('search-field').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        searchProcess(10);
    }
});

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

const showPhoneDetails = async phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    const resposne = await fetch(url);
    const phone = await resposne.json();
    displayPhoneDetails(phone.data);
}

const displayPhoneDetails = (phone) => {
    console.log(phone)
    const { brand, image, mainFeatures, name, releaseDate, slug } = phone;
    const { storage, displaySize, chipSet, memory, sensors } = mainFeatures;
    // const { WLAN, Bluetooth, GPS, NFC, Radio } = others;

    const phoneHunterModalTitle = document.getElementById('phoneHunterModalTitle');
    const phoneId = document.getElementById('phoneId');
    const phoneName = document.getElementById('phoneName');
    const phoneReleaseDate = document.getElementById('phoneReleaseDate');
    phoneName.innerText = `${brand ? brand : 'No brand name found'}`;
    phoneHunterModalTitle.innerText = name;
    phoneId.innerText = `${slug ? slug : 'No Phone Id Found'}`;
    phoneReleaseDate.innerText = `${releaseDate ? releaseDate : 'No Realese Date Found.'}`;
    // console.log(releaseDate);
}
getPhones('apple');
// brand: "Samsung"
// image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-s8-plus.jpg"
// mainFeatures: { storage: '128GB/256GB storage, microSDXC', displaySize: '12.4 inches, 446.1 cm2 (~84.6% screen-to-body ratio)', chipSet: 'Qualcomm SM8450 Snapdragon 8 Gen 1 (4 nm)', memory: '128GB 8GB RAM, 256GB 8GB RAM, 256GB 12GB RAM', sensors: Array(6) }
// name: "Galaxy Tab S8+"
// others: { WLAN: 'Wi-Fi 802.11 a/b/g/n/ac/6e, dual-band, Wi-Fi Direct, hotspot', Bluetooth: '5.2, A2DP, LE', GPS: 'Yes, with A-GPS, GLONASS, BDS, GALILEO', NFC: 'No', Radio: 'No', … }
// releaseDate: "Exp. release 2022, February"
// slug: "samsung_galaxy_tab_s8+-11342"