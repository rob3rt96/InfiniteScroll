const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unslpash API

const apiKey = 'Wv16XYzq0EPVp8L3_j_FVMu-fM3A2J3NZzTT1i51el0';
const count = 10;
const unsplashBaseUrl = 'https://api.unsplash.com/photos';


// Create ELements for Links & Photos, and add them to DOM

function displayPhotos() {
    photosArray.forEach(photo => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');

        // Create <img> for photo
        const image = document.createElement('img');
        image.setAttribute('src', photo.urls.regular);
        const attribute = photo.alt_description === null ? photo.description : 'none';
        image.setAttribute('alt', attribute);
        image.setAttribute('title', attribute);

        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(image);
        imageContainer.appendChild(item);
    });
    console.log(photosArray);
}


// Get photos from Unsplash API

const getPhotos = async () => {
    const randomEndpoint = '/random/';
    const requestParams = `?client_id=${apiKey}&count=${count}`;
    const urlToFetch = `${unsplashBaseUrl}${randomEndpoint}${requestParams}`;
    try {
        const response = await fetch(urlToFetch);
        photosArray = await response.json();

        displayPhotos();
    } catch (error) {
        console.log(error);
    }
};


// Check to see if scrolling is near the bottom of the page, then Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        getPhotos();
        console.log('load more');
    }
});


// On load

getPhotos();