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
    avatar: 'img/icons/icons.svg#avatar_(11)',
}

let bindExitModal;
let bindOnLikes;

const renderComments = (comments) => {
    const elements = document.createDocumentFragment();

    comments.forEach(item => {
        const li = commentItem.cloneNode(true);

        li.querySelector('.big-picture__text').textContent = item.text;
        li.querySelector('.big-picture__avatar').src = item.avatar;
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
        clone.querySelector('.big-picture__avatar').src = DATA.avatar;
        
        commentList.append(clone);
        
        DATA.comments.push({avatar: DATA.avatar, text: comment.value});
        comment.value = '';
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

        DATA.avatar = `img/icons/icons.svg#avatar_(${count})`;
        target.src = DATA.avatar;
    }
}

const reset = () => {
    commentList.innerHTML = '';
    DATA.avatar = 'img/icons/icons.svg#avatar_(11)';
    DATA.like = 0;
    DATA.comments = [];
    load.classList.add('hidden');
}

const onSuccess = () => {
    reset();
}

const onError = (error) => {
    alert('Что-то пошло не так: ' + error);
}

const exitModal = (picture) => {
    if (DATA.like !== 0 || DATA.comments.length !== 0) {
        picture.comments = [...picture.comments, ...DATA.comments];
        picture.likes = +picture.likes + DATA.like;
        load.classList.remove('hidden');

        request(onSuccess, onError, 'PUT', JSON.stringify(picture));
    } else {
        reset();
    }

    bigPicture.classList.add('hidden');

    likes.removeEventListener('click', bindOnLikes);
    close.removeEventListener('click', bindExitModal);
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