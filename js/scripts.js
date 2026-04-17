const API_URL = 'https://lanciweb.github.io/demo/api/pictures/';

let imageArray = [];

fetch(API_URL)
    .then(response => response.json())
    .then(jsonData => {
        console.log(jsonData);
        imageArray = jsonData.map(image => image.url);
        console.log(imageArray);
    })
    .catch(error => {
        console.error(error);
    });