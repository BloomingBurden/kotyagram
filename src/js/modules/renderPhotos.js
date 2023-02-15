import { effects } from './effects.js';
import { show } from './bigPicture.js';

const pictures = document.querySelector('.pictures__list');
const picture = document.querySelector('#picture').content.querySelector('.pictures__item');


const renderPhoto = (photo) => {
    const cloneElement = picture.cloneNode(true);
    const filter = effects(parseFloat(photo.tumbler))[photo.effects]();

    cloneElement.children[0].src = photo.img;
    cloneElement.children[0].style.cssText = `
        filter: ${filter};
        transform: scale(${parseFloat(photo.scale) / 100})`;
    
    cloneElement.addEventListener('click', (evt) => {
        evt.preventDefault();
        show(photo, filter);
    });

    return cloneElement;
};

const renderPhotos = (data) => {
    const template = document.createDocumentFragment();

    data.forEach((item) => {
        template.append(renderPhoto(item));
    })
    
    pictures.append(template);
};

export { renderPhotos };