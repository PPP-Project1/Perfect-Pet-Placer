var APIKey = "";
var APIsecret = "";
var org = 'RI77';
var status = 'adoptable';

function getAccessToken () {
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

        //from this point on, is purely testing.. lines 19 - 35 will be a seperate function where user will input parameters to the url
        return fetch('https://api.petfinder.com/v2/animals?organization=' + org + '&status=' + status, {
            headers: {
                'Authorization': data.token_type + ' ' + data.access_token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }).then(function (resp) {

        return resp.json();
    }).then(function (data) {
        console.log('pets', data);

    }).catch(function (err) {
        console.log('something went wrong', err);

    });
}

getAccessToken();

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