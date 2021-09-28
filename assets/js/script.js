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