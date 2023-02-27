const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
};
// optional
loadPhones("apple");

const displayPhones = (phones, dataLimit) => {
    // console.log(phones);
    const phoneContainer = document.getElementById("phones-container");
    phoneContainer.textContent = "";

    // display 10 phones only
    const showAll = document.getElementById("show-all");
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove("d-none");
    }
    else {
        showAll.classList.add("d-none");
    }

    // display no phones found
    const noPhone = document.getElementById("no-found-message");
    if (phones.length === 0) {
        noPhone.classList.remove("d-none");
    }
    else {
        noPhone.classList.add("d-none");
    }

    // display all phones
    phones.forEach(phone => {
        // console.log(phone.slug);
        const phoneDiv = document.createElement("div");
        phoneDiv.classList.add("col");

        phoneDiv.innerHTML = `
        <div class="card h-100">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                to additional content. This content is a little bit longer.</p>
            <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">
            Show Details
            </button>
        </div>
        </div>`;
        phoneContainer.appendChild(phoneDiv);
    })
    // stop loading
    toggleSpinner(false);
};

// dry get search text
const processSearch = (dataLimit) => {
    // start loader
    toggleSpinner(true);
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
};

// handler search btn click
document.getElementById("btn-search").addEventListener("click", function () {
    processSearch(10);
    // processSearch(true); // can do it with true
});


// not the best way to load show all
document.getElementById("btn-show-all").addEventListener("click", function () {
    processSearch();
    // processSearch(false); // can do it with false
});

// handler input field enter key handler
document.getElementById("search-field").addEventListener("keypress", function (event) {
    // console.log(event.key);
    if (event.key === "Enter") {
        processSearch(10);
        // processSearch(true); // can do it with true
    }
});

// spinner
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById("loader");
    if (isLoading) { // = true
        loaderSection.classList.remove("d-none");
    }
    else {
        loaderSection.classList.add("d-none");
    }
};

// load phone details
const loadPhoneDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
};

// display phone details
const displayPhoneDetails = phone => {
    console.log(phone);

    document.getElementById("phoneDetailModalLabel").innerText = phone.name;

    document.getElementById("phone-img").setAttribute("src", `${phone.image}`);

    document.getElementById("phone-details").innerHTML = `
    <p>Release Date: ${phone?.releaseDate ? phone?.releaseDate : "No Release Date Found"}</p>
    <p>Storage: ${phone?.mainFeatures ? phone?.mainFeatures?.storage : "No Storage Information Found"}</p>
    <p>Bluetooth: ${phone?.others ? phone?.others.Bluetooth : "No Bluetooth Information Found"}</p>
    <p>Sensors: ${phone?.mainFeatures?.sensors ? phone?.mainFeatures?.sensors.join(", ") : "No Sensors Found"}</p>`
};
