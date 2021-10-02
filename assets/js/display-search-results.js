var resultsContainer = document.querySelector(".results-container");

function displayResults(petData) {
    var resultCard = document.createElement("div");
    resultCard.classList.add("card", "w-90");
    resultCard.setAttribute("style", "border-color: rgb(28, 165, 184); border-style: solid; border-width: 3px; padding: 5px; margin-top: 10px; margin-bottom: 10px;");

    var resultBody = document.createElement("div");
    resultBody.classList.add("card-body");
    resultCard.append(resultBody);
    resultBody.setAttribute("style","padding: 30px 0 40px; margin-bottom: 30px; background-color: white; text-align: center; position: relative;")

    var petName = document.createElement("h3");
    petName.textContent = petData.name;

    if (!petData.breeds.secondary) {
        var petBreed = document.createElement("p");
        petBreed.textContent = petData.breeds.primary;
    } else {
        var petBreed = document.createElement("p");
        petBreed.textContent = petData.breeds.primary + " " + petData.breeds.secondary;
    }

    if (!petData.photos[0]) {
        var petImg = document.createElement("p");
        petImg.textContent = "Sorry, no images available."
    } else {
        var petImg = document.createElement("img");
        petImg.setAttribute("src", petData.photos[0].small);
    }

    var morePetData = document.createElement("button");
    morePetData.textContent = "See More Info";
    morePetData.classList.add("btn", "btn-primary");
    morePetData.setAttribute("type", "button");
    morePetData.setAttribute("id", petData.id);
    morePetData.setAttribute("style", "margin-top: 10px; margin-left: 10px;")

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
            displayResults(petData.animals[i]);
        }
    }
}

//modal
function modal() {
    var modalContainer = document.getElementById("modal-container");
    var closeModal = document.getElementsByClassName("close-modal")[0];

    modalContainer.style.display = "block";

    closeModal.onclick = function() {
        modalContainer.style.display = "none";
    }

    window.onclick = function(event) {
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

// var apiKey2 = "AIzaSyAnFzh7TbHHX423_Cve8xpaB3sWJ05-rO8";
// var rescueAddress = "1309"+"Highland"+"Place"+"Faribault"+"MN";
// //This may need to be variables of "address1 + city + state" from the petfinder api
// var geoURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + rescueAddress + "&key=" + apiKey2;

// //Call for the google maps API for GeoCoding to grab lon and lat for use in the actual map
// function fetchGoogleApi() {
//     fetch(geoURL)
//         .then(function (res) {
//             return res.json();
//         })
//         .then(function (data) {
//             console.log(data)
//         })
// }; 

// // var lon1 = data.results.location.lng;
// // console.log(lon1)
// // var lat1 = data.results.location.lat;
// // console.log(lat1)

// //Function to add the physical map to the modal
// function initMap(){
//     var mapOptions= {
//         zoom:8,
//         center:{lat: -34.397, lng: 150.644},
//     }
//     var map = new google.maps.Map(document.getElementById("map"), mapOptions);
//     console.log(map);
// }

init();

$("#modal-btn").click(modal);
$("#back-btn").click(backPage);