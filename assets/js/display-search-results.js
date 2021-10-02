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

    mainBody.append(petImgMain, petNameMain, petBreedMain, petAgeMain, distance);

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



init();

$(".display-main-btn").click(function() {
    var elmId = $(this).parent().attr("id");
    $(mainContainer).children(0).remove();
    return displayMain(elmId);
})
$("#modal-btn").click(modal);
$("#back-btn").click(backPage);