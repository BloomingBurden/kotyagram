import { request } from "./fetch.js";

const bigPicture = document.querySelector('.big-picture');
const bigImg = document.querySelector('.big-picture__img');
const avatarName = document.querySelector('.big-picture__name');
const avatarImg = document.querySelector('.big-picture__face');
const descrImg = document.querySelector('.big-picture__descr');
const likes = document.querySelector('.big-picture__likes > span');
const commentSend = document.querySelector('.big-picture__send');
const commentList = document.querySelector('.big-picture__comments');
const commentItem = document.querySelector('#comment').content.querySelector('.big-picture__item');
const close = document.querySelector('.big-picture__close');

const DATA = {
    like: 0,
    comments: [],
    avatar: '',
}

let bindExitModal;
let bindOnLikes;

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

    if (comment.value.length <= 0) {
        comment.style.outline = '1px solid red'
        setTimeout(() => comment.removeAttribute('style'), 3000);
    } else {
        clone.querySelector('.big-picture__text').textContent = comment.value;
        DATA.comments.push(comment.value);
        commentList.append(clone);
    }

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

const setAvatar = () => {
    let count = 0;
    
    return function (evt) {
        let target = evt.target;

        count += 1;

        if (count > 26) count = 1;

        target.src = `img/icons/icons.svg#avatar_(${count})`;
    }
}

const reset = () => {
    commentList.innerHTML = '';
    DATA.avatar = '';
    DATA.like = 0;
    DATA.comments = [];
    bigPicture.classList.add('hidden');
    load.classList.add('hidden');
}

const onSuccess = () => {
    reset();
}

const onError = (error) => {
    alert('Что-то пошло не так: ' + error);
}

const exitModal = (picture) => {
    picture.comments = [...picture.comments, ...DATA.comments];
    picture.likes = +picture.likes + DATA.like;
    load.classList.remove('hidden');

    likes.removeEventListener('click', bindOnLikes);
    close.removeEventListener('click', bindExitModal);

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

    renderComments(picture.comments.slice());

    bindOnLikes = onLikes.bind(null, picture.likes);
    bindExitModal = exitModal.bind(null, picture);
    
    likes.addEventListener('click', bindOnLikes);
    commentSend.addEventListener('click', sendComment);

    let getAvatar = setAvatar();

    avatarImg.addEventListener('click', getAvatar);
    close.addEventListener('click', bindExitModal);
};

export { show }