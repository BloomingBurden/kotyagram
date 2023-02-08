import { request } from "./modules/fetch.js";
import './modules/functions.js';
import './modules/edit.js';
import './modules/effects.js';

const photos = [];

const onSuccess = (data) => {
    
};

const onError = (error) => {
    console.log(`Попробуйте позже, ошибка: ${error}`);
}


request(onSuccess, onError, 'GET');


// const form = document.querySelector('.img-upload__form');
// const input = form.querySelector('input');
// const URL = 'http://localhost:3001/data';

// function encodeImageFileAsURL(evt) {
//     var file = evt.target.files[0];
//     var reader = new FileReader();
//     reader.readAsDataURL(file);
//     let obj = {
//         name: 'alex',
//     };

//     reader.onloadend = function() {
//         obj.photo = reader.result;
//         console.log(JSON.stringify(obj));

//         fetch(URL, {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(obj)
//         })
//         .then((response) => response.json())
//         .then((sucsess) => console.log(sucsess));
//     }
// }

// input.addEventListener('change', encodeImageFileAsURL);

// const openPhoto = () => {
//     fetch(URL)
//     .then((response) => response.json())
//     .then((sucsess) => {
//         document.body.style.backgroundImage = `url("${sucsess[0].photo}")`;
//     });
// }

// document.body.addEventListener('click', openPhoto);