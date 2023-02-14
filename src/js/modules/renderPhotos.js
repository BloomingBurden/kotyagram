import { parallax } from './parallax.js';
import { effects } from './effects.js';

const pictures = document.querySelector('.pictures__list');
const picture = document.querySelector('#picture').content.querySelector('.pictures__item');


const renderPhoto = (photo, id) => {
    const cloneElement = picture.cloneNode(true);

    cloneElement.children[0].src = photo.img;
    cloneElement.setAttribute('data-img-id', id);
    cloneElement.style.cssText = `filter: ${effects(parseFloat(photo.tumbler))[photo.effects]()}`;
    

    return cloneElement;
};

const renderPhotos = (data) => {
    const template = document.createDocumentFragment();

    data.forEach((item, i) => {
        template.append(renderPhoto(item, i));
    })
    
    pictures.append(template);
    parallax();
};

export { renderPhotos };