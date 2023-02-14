const pictureList = document.querySelector('.pictures__list');
const picture = document.querySelector('.pictures');
let posX = 0;
let posY = 0;
let lastPosX = 0;
let lastPosY = 0;

const coords = {
    left: pictureList.getBoundingClientRect().left,
    top: pictureList.getBoundingClientRect().top,
    bottom: pictureList.getBoundingClientRect().bottom - window.innerHeight,
    right: pictureList.getBoundingClientRect().right - window.innerWidth,
};

const SPEED = 0.005;

const checkBorder = () => {
    if (coords.left >= 0) lastPosX = 0;
    if (coords.top >= 0) lastPosY = 140;
    if (coords.bottom <= 0) lastPosY = 200;
    if (coords.right <= 0) lastPosX = -100;
}

const moveParallax = () => {
    coords.left = pictureList.getBoundingClientRect().left;
    coords.top = pictureList.getBoundingClientRect().top;
    coords.right = pictureList.getBoundingClientRect().right - window.innerWidth;
    coords.bottom = pictureList.getBoundingClientRect().bottom - window.innerHeight;

    let shiftX = posX - lastPosX;
    let shiftY = posY - lastPosY;

    lastPosX = lastPosX + (shiftX * SPEED);
    lastPosY = lastPosY + (shiftY * SPEED);

    checkBorder();

    pictureList.style.cssText = `transform: translate(${lastPosX}px, ${lastPosY}px) scale(9)`;
    
    requestAnimationFrame(moveParallax);
}
moveParallax();

const startParallax = (evt) => {
    const left = Math.abs(coords.left)
    const top = Math.abs(coords.top);

    const blockX = left + window.innerWidth / 2;
    const blockY = top + window.innerHeight / 2;

    posX = evt.pageX + left - blockX;
    posY = evt.pageY + top - blockY;
}

const checkWindowWidth = () => {
    if (window.innerWidth >= 768) {
        picture.addEventListener('pointermove', startParallax);
    } else {
        picture.removeEventListener('pointermove', startParallax);
    }
};

const parallax = () => {
    picture.ondragstart = () => false;

    window.addEventListener('resize', () => {
        checkWindowWidth();
    })
    checkWindowWidth();
};


export { parallax }