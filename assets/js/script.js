var APIKey = "";
var APIsecret = "";
var type;
var age;
var gender;
var size;
var coat;
var address;
var distance;

function fetchPetAPI () {
    //this fetch call retrieves access token for user to use for 1 hour
    fetch('https://api.petfinder.com/v2/oauth2/token', {
        method: 'POST',
        body: 'grant_type=client_credentials&client_id=' + APIKey + '&client_secret=' + APIsecret,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(resp) {
        return resp.json();
    }).then(function(data) {
        console.log('token',data);

        //this fetch call will retrieve results for pet information based on user input
        return fetch('https://api.petfinder.com/v2/animals?type=' + type + '&age=' + age + '&gender=' + gender + '&size=' + size + '&coat=' + coat + '&address=' + address + 'distance' + distance, {
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

fetchPetAPI();

$("submitBtn").addEventListener("click",searchHandler);

function searchHandler(event){
    event.preventDefault();

    var type = document.getElementById("").value;
    var gender = document.getElementById("").value;
    var age = document.getElementById("").value;
    var size = document.getElementById("").value;
    var coatLength = document.getElementById("").value;
    var address = document.getElementById("").value;
    var distance = document.getElementById("").value;

    if(!type){
        console.error("Please select a type.")
    }

    if(!address){
        console.error("Please enter your location.")
    }

    var querySearch = "./results.html?q+" + type + "&gender=" + gender + "&age=" + age + "&size=" + size + "&coatLength=" + 
    coatLength + "&address=" + address + "&distance=" + distance;

    location.assign(querySearch);

}