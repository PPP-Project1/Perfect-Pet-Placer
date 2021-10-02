var resultsContainer = document.querySelector(".results-container");

function displayResults(petData) {
    var resultCard = document.createElement("div");
    resultCard.classList.add("card", "w-90");
    resultCard.setAttribute("style", "border-color: rgb(28, 165, 184); border-style: solid; border-width: 3px; padding: 5px; margin-top: 10px; margin-bottom: 10px;");

    var resultBody = document.createElement("div");
    resultBody.classList.add("card-body");
    resultCard.append(resultBody);

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

    resultBody.append(petName, petBreed, petImg, morePetData);

    resultsCard.append(resultCard);
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

$("#modal-btn").click(modal);
$("#back-btn").click(backPage);