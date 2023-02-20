import { request } from "./fetch.js";
import { closeModal } from "./utils.js";

const form = document.querySelector('.upload__form');
const input = form.querySelector('.upload__input');
const imagePreview = document.querySelector('.upload__img-preview > img');

const Scale = {
    MIN: 50,
    MAX: 150,
    STEP: 10,
};

let imgName;

// КОДИРОВКА В BASE64
const encodeImageFileAsURL = (evt) => {
    const file = evt.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function() {
        imgName = reader.result;
        imagePreview.src = imgName;
    }
}

// ОТКРЫТЬ IMG С ПК
input.addEventListener('change', (evt) => {
    const popupEdit = document.querySelector('.upload__overlay');
    
    encodeImageFileAsURL(evt);
    resetSettings();
    popupEdit.classList.remove('hidden');
});



// РАБОТА С ЗУМОМ
const buttonLess = document.querySelector('.scale__button--less');
const buttonMore = document.querySelector('.scale__button--more');
const scaleInput = document.querySelector('.scale__input');

const resetSettings = () => {
    imagePreview.style = 'transform: scale(1.00)';
    scaleInput.value = `100%`;
}

buttonLess.addEventListener('click', () => {
    const scale = parseInt(scaleInput.value) - Scale.STEP;

    if (scale < Scale.MIN) return;

    scaleInput.value = `${scale}%`;
    imagePreview.style.transform = `scale(${scale / 100})`;
});

buttonMore.addEventListener('click', () => {
    const scale = parseInt(scaleInput.value) + Scale.STEP;

    if (scale > Scale.MAX) return;

    scaleInput.value = `${scale}%`;
    imagePreview.style.transform = `scale(${scale / 100})`;
});


// ЗАГРУЗИТЬ ИЗОБРАЖЕНИЕ НА СЕРВЕР

const onSuccess = (response) => {
    location.reload();
}

const onError = (error) => {
    alert(`Ошибка: ${error}... Попробуйте позже!`);
}

form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    closeModal();

    let myForm = new FormData(form);

    myForm.append('img', imgName);
    myForm.append('likes', 0);
    myForm.delete('filename');

    const formObj = Object.fromEntries(myForm);

    formObj.comments = [];

    myForm = JSON.stringify(formObj);

    request(onSuccess, onError, 'POST', myForm);
})