//carousel 
$('.carousel').carousel({ interval: 2000 });

function fetchToken () {
    //this fetch call retrieves access token for user to use for 1 hour
    fetch('https://api.petfinder.com/v2/oauth2/token', {
        method: 'POST',
        body: 'grant_type=client_credentials&client_id=iwfBo0lysmRDywH7YnUK8MqtITZWVbmzDeYpUuFE5cIJhzelM7&client_secret=oH97v5MQBen8II1y33uDrSab6xa8NRxhDwpmx9lS',
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
    if (!form.distance) {
        var distance = 100;
    } else {
        var distance = parseInt(form.distance);
    }
    // this fetch call will retrieve results for pet information based on user input
    fetch("https://api.petfinder.com/v2/animals?type=" + form.animalType + "&size=" + form.animalSize + "&gender=" + form.animalGender + "&age=" + form.animalAge + "&coat=" + form.animalCoat + "&location=" + form.location + "&distance=" + distance, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token.access_token,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    }).then(function (resp) {
        return resp.json();

    }).then(function (data) {
        localStorage.setItem("petData", JSON.stringify(data));
    })
}

//function to connect API varibales to the HTML elements associated with them as well as sending the user to the results page
function searchHandler() {
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

    setTimeout(function(){ window.location.href = './results.html';}, 3000);
}

$("#submitBtn").click(searchHandler);