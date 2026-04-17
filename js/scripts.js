const API_URL = "https://lanciweb.github.io/demo/api/pictures/";
const photoListElement = document.querySelector("#photo-list");

fetch(API_URL)
    .then(function (response) {
        return response.json();
    })
    .then(function (photos) {
        printPhotos(photos);
    })
    .catch(function (error) {
        console.error("Errore API:", error);
        photoListElement.innerHTML = "<p class='text-white text-center'>Errore nel caricamento delle foto</p>";
    });

function printPhotos(photos) {
    photoListElement.innerHTML = "";

    for (let i = 0; i < photos.length; i++) {
        const photo = photos[i];

        const cardHtml = `
            <div class="col d-flex justify-content-center">
                <article class="card border-0 rounded-0 photo-card">
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
}