var resultsContainer = document.querySelector(".results-container");
var mainContainer = document.querySelector(".main-container");
var orgAddresses = [];
var locations = [];
var map;

//call for the google maps API for GeoCoding to grab lon and lat for use in the actual map
function fetchGoogleApi(orgData) {
    if (!orgData.address.address1) {
        var address = orgData.address.city + " " + orgData.address.state;
    } else {
        var address = orgData.address.address1 + " " + orgData.address.city + " " + orgData.address.state;
    }
    orgAddresses.push(address);

    fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyAnFzh7TbHHX423_Cve8xpaB3sWJ05-rO8")
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            var latLng = data.results[0].geometry.location;
            locations.push(latLng);
        });
};

function displayMain(i) {
    var allPetData = JSON.parse(localStorage.getItem("petData"));
    var petData = allPetData.animals[i];

    var mainCard = document.createElement("div");
    mainCard.classList.add("card", "w-100");
    mainCard.setAttribute("style", "border-color: rgb(28, 165, 184); border-style: solid; border-width: 3px; padding: 5px; margin-top: 10px; margin-bottom: 10px;");

    var mainBody = document.createElement("div");
    mainBody.classList.add("card-body");
    mainBody.setAttribute("style", "width: 100%; height: 100%;");
    mainCard.append(mainBody);

    if (!petData.photos[0]) {
        var petImgMain = document.createElement("p");
        petImgMain.textContent = "Sorry, no images available."
    } else {
        var petImgMain = document.createElement("img");
        petImgMain.setAttribute("src", petData.photos[0].full);
        petImgMain.setAttribute("style", "height: 500px; max-width: 100%; max-height: 100%; display: block; margin-left: auto; margin-right: auto;");
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

    var bio = document.createElement("p");
    bio.textContent = "About Me! : " + petData.description;

    var organization = document.createElement("p");
    organization.textContent = petData.contact.address.address1 + " " + petData.contact.address.city + " " + petData.contact.address.state;
    organization.setAttribute("id", "address");

    var modalBtn = document.createElement("button");
    modalBtn.classList.add("btn btn-block custom-btn");
    modalBtn.setAttribute("type", "button");
    modalBtn.setAttribute("data-toggle", "modal");
    modalBtn.setAttribute("data-target", "contact-modal");
    modalBtn.textContent = "Organization Contact Information";

    mainBody.append(petImgMain, petNameMain, petBreedMain, petAgeMain, distance, organization, bio, modalBtn);

    mainContainer.append(mainCard);

    var orgData = JSON.parse(localStorage.getItem("orgData"));
    var allOrgData = orgData.organizations[i]

    var modalContainer = document.createElement("div")
    modalContainer.classList.add("modal fade custom-modal");
    modalContainer.setAttribute("id", "contact-modal")
    modalContainer.setAttribute("tabindex", "-1")
    modalContainer.setAttribute("role", "dialog")

    var modalStyle = document.createElement('div');
    modalStyle.classList.add("modal-dialog modal-lg modal-dialog-centered")

    var modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    var modalHeader = document.createElement("div");
    modalHeader.classList.add("modal-header");

    var headerText = document.createElement("h3");
    headerText.textContent = "Organization Contact Info";

    var orgName = document.createElement("p")
    orgName.textContent = "Organization Name" + allOrgData.name

    var orgWeb = document.createElement("p");
    orgWeb.textContent = "Website: " + allOrgData.url

    var orgEmail = document.createElement("p");
    orgEmail.textContent = "Email: " + allOrgData.email

    var orgPhone = document.createElement("p");
    orgPhone.textContent = "Phone Number: " + allOrgData.Phone

    var modalFooter = document.createElement("div");
    modalFooter.classList.add("modal-footer");

    var closeBtn = document.createElement("button");
    closeBtn.classList.add("btn btn-secondary");
    closeBtn.setAttribute("type", "button")
    closeBtn.setAttribute("data-dismiss", "modal")
    closeBtn.textContent = "Close";

    modalHeader.append(headerText);
    modalFooter.append(closeBtn);
    modalContent.append(modalHeader, orgName, orgWeb, orgEmail, orgPhone, modalFooter);
    modalStyle.append(modalContent);
    modalContainer.append(modalStyle);
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
        petImg.setAttribute("style", "height: 100px; width: 100px; margin-bottom: 15px;")
    }

    var morePetData = document.createElement("button");
    morePetData.textContent = "See More Details";
    morePetData.classList.add("btn", "btn-primary", "display-main-btn");
    morePetData.setAttribute("type", "button");

    resultBody.append(petName, petImg, petBreed, morePetData);

    resultsContainer.append(resultCard);
}

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });
}

function fetchToken() {
    //this fetch call retrieves access token for user to use for 1 hour
    fetch('https://api.petfinder.com/v2/oauth2/token', {
        method: 'POST',
        body: 'grant_type=client_credentials&client_id=iwfBo0lysmRDywH7YnUK8MqtITZWVbmzDeYpUuFE5cIJhzelM7&client_secret=oH97v5MQBen8II1y33uDrSab6xa8NRxhDwpmx9lS',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function (resp) {
        return resp.json();

    }).then(function (token) {
        return fetchOrgAPI(token);
    })
}

function init() {
    var petData = JSON.parse(localStorage.getItem("petData"));
    var orgData = JSON.parse(localStorage.getItem("orgData"));

    if (!petData) {
        resultsContainer.innerHTML = "<h3> NO results found, go back and search again!</h3>";
    } else {
        for (var i = 0; i < 9; i++) {
            displayResults(petData.animals[i], i);
        }
    }
    for (var i = 0; i < 9; i++) {
        fetchGoogleApi(orgData[i].organization);
    }
}

function fetchOrgAPI(token) {
    var petData = JSON.parse(localStorage.getItem("petData"));
    var orgData = JSON.parse(localStorage.getItem("orgData"));
    if (!orgData) {
        var orgData = [];
    }

    for (var i = 0; i < 9; i++) {
        var orgId = petData.animals[i].organization_id;

        fetch("https://api.petfinder.com/v2/organizations/" + orgId, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token.access_token,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
            .then(function (resp) {
                return resp.json();
            })
            .then(function (data) {
                var orgData = JSON.parse(localStorage.getItem("orgData"));
                if (orgData == null) {
                    var orgData = [];
                }
                orgData.push(data);
                localStorage.setItem("orgData", JSON.stringify(orgData));
            });
    }
    init();
};


//modal

//moves user back to landing page
function backPage() {
    window.localStorage.clear();
    location.assign("./index.html");
}

fetchToken();

//When this button is clicked it should fetch the google api url and the map should initiate
$(".display-main-btn").click(function () {
    var elmId = $(this).parent().attr("id");
    $(mainContainer).children(0).remove();
    return displayMain(elmId);
})
$("#back-btn").click(backPage);