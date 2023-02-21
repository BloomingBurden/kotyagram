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

const SPEED = 0.025;

const checkBorder = () => {
    const STEP_BORDER = 20;
    const STEP_MOUSE = 20;

    if (coords.left >= 30) {
        lastPosX = 30;
        posX = posX - STEP_MOUSE;
    }
    if (coords.top >= 30) {
        lastPosY = lastPosY - STEP_BORDER;
        posY = posY - STEP_MOUSE;
    }
    if (coords.bottom <= -30)  {
        lastPosY = lastPosY + STEP_BORDER;
        posY = posY + STEP_MOUSE;
    }
    if (coords.right <= -30) {
        lastPosX = lastPosX + STEP_BORDER;
        posX = posX + STEP_MOUSE;
    }
}

const moveParallax = () => {
    coords.left = pictureList.getBoundingClientRect().left;
    coords.top = pictureList.getBoundingClientRect().top;
    coords.right = pictureList.getBoundingClientRect().right - window.innerWidth;
    coords.bottom = pictureList.getBoundingClientRect().bottom - window.innerHeight;

    lastPosX = lastPosX + (posX * SPEED);
    lastPosY = lastPosY + (posY * SPEED);

    checkBorder();

    if (window.innerWidth <= 570) {
        lastPosX = 0;
    }
    pictureList.style.cssText = `transform: translate(${lastPosX}px, ${lastPosY}px) scale(9)`;
    
    requestAnimationFrame(moveParallax);
}
moveParallax();

let blockX = 0;
let blockY = 0;

const startParallax = (evt) => {
    const left = Math.abs(coords.left)
    const top = Math.abs(coords.top);
    const SPEED = 0.8;

    if (evt.pageX < blockX) {
        blockX = evt.pageX;
        posX -= SPEED;
    }
    if (evt.pageX > blockX) {
        blockX = evt.pageX;
        posX += SPEED;
    }
    if (evt.pageY < blockY) {
        blockY = evt.pageY;
        posY -= SPEED;
    }
    if (evt.pageY > blockY) {
        blockY = evt.pageY;
        posY += SPEED;
    }
    
}

const parallax = () => {
    picture.ondragstart = () => false;

    picture.addEventListener('pointerdown', (evt) => {

        blockX = evt.pageX;
        blockY = evt.pageY;
        
        picture.addEventListener('pointermove', startParallax);
        picture.addEventListener('pointerup', () => {
            
            picture.removeEventListener('pointermove', startParallax);
            picture.onpointup = null;
        })
    });
};

parallax();