let map;

//carousel 
$('.carousel').carousel({ interval: 2000 });

function fetchToken () {
    var APIKey = "iwfBo0lysmRDywH7YnUK8MqtITZWVbmzDeYpUuFE5cIJhzelM7";
    var APIsecret = "oH97v5MQBen8II1y33uDrSab6xa8NRxhDwpmx9lS";
    
    //this fetch call retrieves access token for user to use for 1 hour
    fetch('https://api.petfinder.com/v2/oauth2/token', {
        method: 'POST',
        body: 'grant_type=client_credentials&client_id=' + APIKey + '&client_secret=' + APIsecret,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function (resp) {
        return resp.json();
        
    }).then(function(token) {
        return fetchPetAPI(token);
    })
}

function fetchPetAPI(token) {
    var form = JSON.parse(localStorage.getItem("form"));
    var distance = parseInt(form.distance);
    if (distance===5) {
        console.log("this is an integer 5");
    }
    // this fetch call will retrieve results for pet information based on user input
    fetch("https://api.petfinder.com/v2/animals?type=" + form.animalType + "&size=" + form.animalSize + "&gender=" + form.animalGender + "&age=" + form.animalAge + "&coat=" + form.animalCoat + "&location=" + form.location + "&distance=" + distance, {
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
            localStorage.setItem("petData", JSON.stringify(data));
        });
}

//function to connect API varibales to the HTML elements associated with them as well as sending the user to the results page
function searchHandler(event) {
    event.preventDefault();

    var form = {
        // objects to hold input
        animalType: document.getElementById("animalType").value,
        animalAge: document.getElementById("animalAge").value,
        animalGender: document.getElementById("animalGender").value,
        animalSize: document.getElementById("animalSize").value,
        animalCoat: document.getElementById("animalCoat").value,
        location: document.getElementById("location").value,
        distance: document.getElementById("distance").value
    };

    //will take in the object form and it stores an object LocalStorage.
    localStorage.setItem("form", JSON.stringify(form));

    if (!form.animalType) {
        console.error("Please select a type.");
    }

    if (!form.location) {
        console.error("Please enter your location.");
    }

    fetchToken();

    var querySearch = "./results.html";

    location.assign(querySearch);
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
    location.assign("./index.html");
    //in the future, maybe we can clear out local storage in this next line
}

$("#submitBtn").click(searchHandler);
$("#modal-btn").click(modal);
$("#back-btn").click(backPage);