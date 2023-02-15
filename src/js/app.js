import { request } from "./modules/fetch.js";
import { renderPhotos } from "./modules/renderPhotos.js";
import './modules/functions.js';
import './modules/edit.js';
import './modules/effects.js';
import './modules/parallax.js';

const filterList = document.querySelector('.filter__list');

let photos = [];

const FILTERS = {
    none: () => {
        renderPhotos(photos.slice());
    },
    likes: () => {
        remderPhotos(photos.slice());
    }
}

const removePhotos = () => {
    const pictures = document.querySelectorAll('.pictures__item');

    if (pictures) {
        pictures.forEach(item => item.remove());
    }
}

const filter = (evt) => {
    const target = evt.target.closest('.filter__link');

    if (!target) return;

    removePhotos();
    
}

const onSuccess = (data) => {
    load.classList.add('hidden');
    photos = data.slice();
    renderPhotos(photos);
};

const onError = (error) => {
    console.log(`Попробуйте позже, ошибка: ${error}`);
}

request(onSuccess, onError, 'GET');

filterList.addEventListener('click', filter);