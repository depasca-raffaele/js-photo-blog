// SELEZIONE ELEMENTI DAL DOM
const photoListElement = document.querySelector("#photo-list");
const imageOverlay = document.querySelector("#image-overlay");
const overlayImage = document.querySelector("#overlay-image");
const closeBtn = document.querySelector("#close-btn");

const API_URL = "https://lanciweb.github.io/demo/api/pictures/";

// FETCH DATI API
fetch(API_URL)
    .then(function (response) {
        return response.json();
    })
    .then(function (photos) {
        printPhotos(photos);
    })
    .catch(function (error) {
        console.error("Errore API:", error);
        photoListElement.innerHTML = "<p class='text-white text-center fs-4'>Errore nel caricamento delle foto</p>";
    });

// FUNZIONE PER STAMPARE LE CARD
function printPhotos(photos) {
    photoListElement.innerHTML = "";

    for (let i = 0; i < photos.length; i++) {
        const photo = photos[i];

        const cardHtml = `
            <div class="col d-flex justify-content-center">
                <article class="card border-0 rounded-0 photo-card" data-image-url="${photo.url}">
                    <div class="pin"></div>
                    <div class="card-body p-3">
                        <img src="${photo.url}" class="img-fluid" alt="${photo.title}">
                        <div class="pt-3">
                            <p class="photo-date">${photo.date}</p>
                            <p class="photo-title">${photo.title}</p>
                        </div>
                    </div>
                </article>
            </div>
        `;

        photoListElement.innerHTML += cardHtml;
    }

    attachCardClickListeners();
}

// FUNZIONE PER AGGIUNGERE LISTENER ALLE CARD
function attachCardClickListeners() {
    const cards = document.querySelectorAll(".photo-card");

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        card.addEventListener("click", cardClickHandler);
    }
}

// FUNZIONE PER APRIRE L'OVERLAY
function openImageOverlay(imageUrl) {
    overlayImage.src = imageUrl;
    imageOverlay.classList.add("active");
}

// FUNZIONE PER CHIUDERE L'OVERLAY
function closeImageOverlay() {
    imageOverlay.classList.remove("active");
}

// ========================================
// EVENT LISTENER
// ========================================

// Handler click su una card
function cardClickHandler(event) {
    const card = event.currentTarget;
    const imageUrl = card.getAttribute("data-image-url");
    openImageOverlay(imageUrl);
}

// Handler click sul bottone di chiusura
closeBtn.addEventListener("click", closeBtnClickHandler);

function closeBtnClickHandler() {
    closeImageOverlay();
}

// Handler click sullo sfondo dell'overlay
imageOverlay.addEventListener("click", overlayBackgroundClickHandler);

function overlayBackgroundClickHandler(event) {
    if (event.target === imageOverlay) {
        closeImageOverlay();
    }
}