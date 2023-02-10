const pictureList = document.querySelector('.pictures__list');
const picture = document.querySelector('.pictures');
let posX = 0;
let posY = 0;
let lastPosX = 0;
let lastPosY = 0;

const SPEED = 0.005;

const moveParallax = () => {
    let shiftX = posX - lastPosX;
    let shiftY = posY - lastPosY;

    lastPosX = lastPosX + (shiftX * SPEED);
    lastPosY = lastPosY + (shiftY * SPEED);

    pictureList.style.cssText = `transform: translate(${lastPosX}px, ${lastPosY}px) scale(9)`;

    requestAnimationFrame(moveParallax);
}
moveParallax();

const startParallax = (evt) => {
    const coords = {
        left: Math.abs(pictureList.getBoundingClientRect().left),
        top: Math.abs(pictureList.getBoundingClientRect().top),
    };

    const blockX =  coords.left + window.innerWidth / 2;
    const blockY = coords.top + window.innerHeight / 2;
    posX = evt.pageX + coords.left - blockX;
    posY = evt.pageY +  coords.top - blockY;
}

const checkWindowWidth = () => {
    if (window.innerWidth >= 768) {
        picture.addEventListener('pointermove', startParallax);
    } else {
        picture.removeEventListener('pointermove', startParallax);
    }
}

const parallax = () => {
    picture.ondragstart = () => false;

    window.addEventListener('resize', () => {
        checkWindowWidth();
    })

    checkWindowWidth();
};


export { parallax }