import { request } from "./modules/fetch.js";
import { renderPhotos } from "./modules/renderPhotos.js";
import './modules/functions.js';
import './modules/edit.js';
import './modules/effects.js';
import './modules/parallax.js';

const filterList = document.querySelector('.filter__list');

let photos = [];
window.quantityOfElements = 0;

const FILTERS = {
    none: () => {
        renderPhotos(photos.slice());
    },
    likes: () => {
        renderPhotos(photos.slice().sort((a, b) => {
            return b.likes - a.likes;
        }));
    },
    popular: () => {
        renderPhotos(photos.slice().sort((a, b) => {
            return b.comments.length - a.comments.length;
        }));
    },
}

const removePhotos = () => {
    const pictures = document.querySelectorAll('.pictures__item');

    if (pictures) {
        pictures.forEach(item => item.remove());
    }
}

const activeFilter = () => {
    const filterItems = filterList.querySelectorAll('.filter__item');

    filterItems.forEach(item => item.classList.remove('filter__item--active'));
}

const filter = (evt) => {
    const target = evt.target.closest('.filter__link');

    if (!target) return;

    removePhotos();
    activeFilter();
    
    target.parentElement.classList.add('filter__item--active');
    FILTERS[target.parentElement.dataset.filter]();
}

const onSuccess = (data) => {
    load.classList.add('hidden');
    photos = data.slice();
    window.quantityOfElements = photos.length;
    renderPhotos(photos);
};

const onError = (error) => {
    console.log(`Попробуйте позже, ошибка: ${error}`);
}

request(onSuccess, onError, 'GET');

filterList.addEventListener('click', filter);