import { request } from "./fetch.js";

const bigPicture = document.querySelector('.big-picture');
const bigImg = document.querySelector('.big-picture__img');
const avatarName = document.querySelector('.big-picture__name');
const descrImg = document.querySelector('.big-picture__descr');
const likes = document.querySelector('.big-picture__likes > span');
const commentSend = document.querySelector('.big-picture__send');
const commentList = document.querySelector('.big-picture__comments');
const commentItem = document.querySelector('#comment').content.querySelector('.big-picture__item');
const close = document.querySelector('.big-picture__close');
let firstTime = true;

const DATA = {
    like: 0,
    comments: [],
}

const renderComments = (comments) => {
    const elements = document.createDocumentFragment();

    comments.forEach(item => {
        const li = commentItem.cloneNode(true);

        li.querySelector('.big-picture__text').textContent = item;
        elements.append(li);
    })

    commentList.append(elements);
};

const sendComment = () => {
    const clone = commentItem.cloneNode(true);
    const comment = document.querySelector('.big-picture__message > input');

    clone.querySelector('.big-picture__text').textContent = comment.value;
    DATA.comments.push(comment.value);
    commentList.append(clone);
}

const onLikes = (like) => {
    if (+like === +likes.textContent) {
        likes.textContent = +likes.textContent + 1;
        DATA.like = 1;
    } else {
        likes.textContent = +likes.textContent - 1;
        DATA.like = 0;
    }
}

const onSuccess = (success) => {
    DATA.like = 0;
    firstTime = false;
    DATA.comments = [];
    bigPicture.classList.add('hidden');
    load.classList.add('hidden');
}

const onError = (error) => {
    alert('Что-то пошло не так: ' + error);
}

const exitModal = (picture) => {
    picture.comments = [...picture.comments, ...DATA.comments];
    picture.likes = +picture.likes + DATA.like;
    load.classList.remove('hidden');
    request(onSuccess, onError, 'PUT', JSON.stringify(picture), picture.id);
}

const show = (picture, filter) => {
    bigPicture.classList.remove('hidden');

    bigImg.src = picture.img;
    bigImg.style.filter = filter;
    bigImg.style.transform = `scale(${parseFloat(picture.scale) / 100})`;
    avatarName.textContent = picture.nickname;
    descrImg.textContent = picture.description;
    likes.textContent = picture.likes;

    if (firstTime) {
        renderComments(picture.comments.slice());
        likes.addEventListener('click', () => onLikes(picture.likes));
    }
    
    commentSend.addEventListener('click', sendComment);
    close.addEventListener('click', () => exitModal(picture));
};

export { show }