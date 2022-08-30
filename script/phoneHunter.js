


const getPhones = async () => {
    const url = 'https://openapi.programming-hero.com/api/phones?search=iphone';
    const response = await fetch(url);
    const phones = await response.json();
    // console.log(phones.data)
    displayPhones(phones.data);

}
const displayPhones = (phones) => {
    // console.log(phones);

    phones.forEach(phone => {
        const { brand, phone_name, slug, image } = phone;
        const phoneContainer = document.getElementById('phone-container');

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
// 0: {brand: 'Apple ', phone_name: 'iPhone 13 mini', slug: 'apple_iphone_13_mini-11104', image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-mini.jpg'}

getPhones()