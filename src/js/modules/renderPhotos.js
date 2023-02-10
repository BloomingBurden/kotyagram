import { parallax } from './parallax.js';

const pictures = document.querySelector('.pictures__list');
const picture = document.querySelector('#picture').content.querySelector('.pictures__item');

const renderPhotos = (data) => {
    const template = document.createDocumentFragment();

    data.forEach(item => {
        const cloneElement = picture.cloneNode(true);

        cloneElement.children[0].src = item.img;
        template.append(cloneElement);
    })
    
    pictures.append(template);
    parallax();
};

export { renderPhotos };