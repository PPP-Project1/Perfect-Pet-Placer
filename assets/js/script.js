var APIKey = "iwfBo0lysmRDywH7YnUK8MqtITZWVbmzDeYpUuFE5cIJhzelM7";
var APIsecret = "oH97v5MQBen8II1y33uDrSab6xa8NRxhDwpmx9lS";
var type ;
// var age;
// var gender;
// var size;
// var coat;
// var address;
// var distance;

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



function searchHandler(event){
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

    if(!type){
        console.error("Please select a type.")
    }
    
    if(!address){
            console.error("Please enter your location.")
        }
        
        // var querySearch = "./results.html?q+" + type + "&gender=" + gender + "&age=" + age + "&size=" + size + "&coatLength=" + 
        // coatLength + "&address=" + address + "&distance=" + distance;
        
        // location.assign(querySearch);
        
    }
    fetchPetAPI();
    $("#submitBtn").click(searchHandler);