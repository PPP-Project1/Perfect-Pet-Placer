var APIKey = "iwfBo0lysmRDywH7YnUK8MqtITZWVbmzDeYpUuFE5cIJhzelM7";
var APIsecret = "oH97v5MQBen8II1y33uDrSab6xa8NRxhDwpmx9lS";
// var type;
// var age;
// var gender;
// var size;
// var coat;
// var address; - this may still want to be location
// var distance;


function fetchPetAPI() {
    //this fetch call retrieves access token for user to use for 1 hour
    fetch('https://api.petfinder.com/v2/oauth2/token', {
        method: 'POST',
        body: 'grant_type=client_credentials&client_id=' + APIKey + '&client_secret=' + APIsecret,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function (resp) {
        return resp.json();
    }).then(function (data) {
        console.log('token', data);

        //this fetch call will retrieve results for pet information based on user input
        return fetch('https://api.petfinder.com/v2/animals?type=' + type, {
            method: 'GET',
            headers: {
                'Authorization': data.token_type + ' ' + data.access_token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }).then(function (resp) {

        return resp.json();
    }).then(function (data) {
        console.log('pets', data);

        //catch function to console log any errors that may occur
    }).catch(function (err) {
        console.log('something went wrong', err);

    });
}


// Carousel 

$('.carousel').carousel({ interval: 2000 });


fetchPetAPI();


function searchHandler(event) {
    event.preventDefault();
    
    var type = document.getElementById("animalType").value;
    console.log(type)
    var gender = document.getElementById("animalGender").value;
    console.log(gender)
    var age = document.getElementById("animalAge").value;
    console.log(age)
    var size = document.getElementById("animalSize").value;
    console.log(size)
    var coatLength = document.getElementById("animalCoatLength").value;
    console.log(coatLength)
    var address = document.getElementById("address").value;
    console.log(address)
    var distance = document.getElementById("distance").value;
    console.log(distance)
    
    if (!type) {
        console.error("Please select a type.")
    }
    
    if (!address) {
        console.error("Please enter your location.")
    }
    
    // var querySearch = "./results.html?q+" + type + "&gender=" + gender + "&age=" + age + "&size=" + size + "&coatLength=" + 
    // coatLength + "&address=" + address + "&distance=" + distance;
    
    // location.assign(querySearch);
    
}

var apiKey2 = "AIzaSyAnFzh7TbHHX423_Cve8xpaB3sWJ05-rO8";
var rescueAddress = "1309"+"Highland"+"Place"+"Faribault"+"MN";
//This may need to be variables of "address1 + city + state" from the petfinder api
var geoURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + rescueAddress + "&key=" + apiKey2;

function fetchGoogleApi() {
    fetch(geoURL)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data)
        })
}; 

var lon1 = data.results.location.lng;
console.log(lon1)
var lat1 = data.results.location.lat;
console.log(lat1)

function initMap(){
    var mapOptions= {
        zoom:8,
        center:{lat: -34.397, lng: 150.644},
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    console.log(map);
    }


fetchPetAPI();
$("#submitBtn").click(searchHandler);





