var resultsContainer = document.querySelector(".results-container");
var mainContainer = document.querySelector(".main-container");

function displayMain(i) {
    var allPetData = JSON.parse(localStorage.getItem("petData"));
    var petData = allPetData.animals[i];

    var mainCard = document.createElement("div");
    mainCard.classList.add("card", "w-100");
    mainCard.setAttribute("style", "border-color: rgb(28, 165, 184); border-style: solid; border-width: 3px; padding: 5px; margin-top: 10px; margin-bottom: 10px;");

    var mainBody = document.createElement("div");
    mainBody.classList.add("card-body");
    mainCard.append(mainBody);

    if (!petData.photos) {
        var petImgMain = document.createElement("p");
        petImgMain.textContent = "Sorry, no images available."
    } else {
        var petImgMain = document.createElement("img");
        petImgMain.setAttribute("src", petData.photos[0].full);
    }

    var petNameMain = document.createElement("h3");
    petNameMain.textContent = "Name: " + petData.name;

    if (!petData.breeds.secondary) {
        var petBreedMain = document.createElement("p");
        petBreedMain.textContent = "Breed: " + petData.breeds.primary;
    } else {
        var petBreedMain = document.createElement("p");
        petBreedMain.textContent = "Breed: " + petData.breeds.primary + " " + petData.breeds.secondary;
    }

    var petAgeMain = document.createElement("p");
    petAgeMain.textContent = "Age: " + petData.age;

    var distance = document.createElement("p");
    distance.textContent = "Distance: " + petData.distance + " miles";

    var organization = document.createElement("p");
    organization.textContent = "Organization Address: " + petData.contact.address.address1 +" " + petData.contact.address.city + ", " + petData.contact.address.state;

    mainBody.append(petImgMain, petNameMain, petBreedMain, petAgeMain, distance,organization);

    mainContainer.append(mainCard);
}

function displayResults(petData, i) {
    var resultCard = document.createElement("div");
    resultCard.classList.add("card", "w-90");
    resultCard.setAttribute("style", "border-color: rgb(28, 165, 184); border-style: solid; border-width: 3px; padding: 5px; margin-top: 10px; margin-bottom: 10px;");

    var resultBody = document.createElement("div");
    resultBody.classList.add("card-body");
    resultBody.setAttribute("id", i);
    resultCard.append(resultBody);

    var petName = document.createElement("h3");
    petName.textContent = "Name: " + petData.name;

    if (!petData.breeds.secondary) {
        var petBreed = document.createElement("p");
        petBreed.textContent = "Breed: " + petData.breeds.primary;
    } else {
        var petBreed = document.createElement("p");
        petBreed.textContent = "Breed: " + petData.breeds.primary + " " + petData.breeds.secondary;
    }

    if (!petData.photos[0]) {
        var petImg = document.createElement("p");
        petImg.textContent = "Sorry, no images available."
    } else {
        var petImg = document.createElement("img");
        petImg.setAttribute("src", petData.photos[0].small);
    }

    var morePetData = document.createElement("button");
    morePetData.textContent = "See More Details";
    morePetData.classList.add("btn", "btn-primary", "display-main-btn");
    morePetData.setAttribute("type", "button");

    resultBody.append(petName, petBreed, petImg, morePetData);

    resultsContainer.append(resultCard);
}

function init() {
    var petData = JSON.parse(localStorage.getItem("petData"));

    if (!petData) {
        resultsContainer.innerHTML = "<h3> NO results found, go back and search again!</h3>";
    } else {
        for (var i = 0; i < petData.animals.length; i++) {
            if (i === 9) {
                return;
            }
            displayResults(petData.animals[i], i);
        }
    }
}

//modal
function modal() {
    var modalContainer = document.getElementById("modal-container");
    var closeModal = document.getElementsByClassName("close-modal")[0];

    modalContainer.style.display = "block";

    closeModal.onclick = function () {
        modalContainer.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modalContainer) {
            modalContainer.style.display = "none";
        }
    }
}

//moves user back to landing page
function backPage() {
    window.localStorage.clear();
    location.assign("./index.html");
}

var map;
var apiKey2 = "AIzaSyAnFzh7TbHHX423_Cve8xpaB3sWJ05-rO8";
var orgAddress;
console.log(orgAddress);
var geoURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + orgAddress + "&key=" + apiKey2;
console.log(geoURL);

function getAddress(allPetData, orgData){
    var orgData = JSON.parse(localStorage.getItem("orgData"));
    var allPetData = JSON.parse(localStorage.getItem("petData"));
    orgAddress = orgData.organization[i].address;
    if(allPetData.organization_id === orgData.organizations.id){
        return orgAddress;
    }
}
// Call for the google maps API for GeoCoding to grab lon and lat for use in the actual map

function fetchGoogleApi() {
    fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + orgAddress + "&key=" + apiKey2)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (googleData) {
            localStorage.setItem("googleData", JSON.stringify(googleData));
        });
};

fetchGoogleApi();

function initMap() {
    var data = JSON.parse(localStorage.getItem("googleData"));
    console.log(data);

    var lon1 = (data.results[0].geometry.location.lng);
    var lat1 = (data.results[0].geometry.location.lat);

    map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: lat1, lng: lon1},
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
}


init();

$(".display-main-btn").click(function () {
    var elmId = $(this).parent().attr("id");
    $(mainContainer).children(0).remove();
    return displayMain(elmId);
})
$("#modal-btn").click(modal);
$("#back-btn").click(backPage);