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

const SPEED = 0.05;

const checkBorder = () => {
    if (coords.left >= 0) {
        lastPosX = 0;
        posX = posX - 2;
    }
    if (coords.top >= 0) {
        lastPosY = lastPosY - 20;
        posY = posY - 2;
    }
    if (coords.bottom <= 0)  {
        lastPosY = lastPosY + 20;
        posY = posY + 2;
    }
    if (coords.right <= 0) {
        lastPosX = lastPosX + 20;
        posX = posX + 2;
    }
}

const moveParallax = () => {
    coords.left = pictureList.getBoundingClientRect().left;
    coords.top = pictureList.getBoundingClientRect().top;
    coords.right = pictureList.getBoundingClientRect().right - window.innerWidth;
    coords.bottom = pictureList.getBoundingClientRect().bottom - window.innerHeight;

    console.log(posY)

    lastPosX = lastPosX + (posX * SPEED);
    lastPosY = lastPosY + (posY * SPEED);

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

const parallax = () => {
    picture.ondragstart = () => false;

    picture.addEventListener('pointerdown', (evt) => {
        picture.addEventListener('pointermove', startParallax);
        picture.addEventListener('pointerup', () => {
            
            picture.removeEventListener('pointermove', startParallax);
            picture.onpointup = null;
        })
    });
};


export { parallax }