import { request } from "./modules/fetch.js";
import { renderPhotos } from "./modules/renderPhotos.js";
import './modules/functions.js';
import './modules/edit.js';
import './modules/effects.js';

let photos = [];

const onSuccess = (data) => {
    load.classList.add('hidden');
    photos = data.slice();
    renderPhotos(photos);
};

const onError = (error) => {
    console.log(`Попробуйте позже, ошибка: ${error}`);
}


request(onSuccess, onError, 'GET');