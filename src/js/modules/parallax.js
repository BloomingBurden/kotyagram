const pictureList = document.querySelector('.pictures__list');
const picture = document.querySelector('.pictures');
const coord = {
    left: 0,
    top: 0,
};

let shiftX;
let shiftY;

const moveParallax = () => {
    pictureList.style.cssText = `transform: translate(${coord.left}px, ${coord.top}px) scale(9)`;

    requestAnimationFrame(moveParallax);
}
moveParallax();

const startParallax = (evt) => {
    const BASE_VALUE = 1;
    const MAX_VALUE = 20;

    if (shiftX < evt.pageX) {
        coord.left += BASE_VALUE;

        if (coord.left >= MAX_VALUE) {
            coord.left = MAX_VALUE;
        }
    }
    if (shiftX > evt.pageX) {
        coord.left -= BASE_VALUE;

        if (coord.left <= -MAX_VALUE) {
            coord.left = -MAX_VALUE;
        }
    }
    if (shiftY < evt.pageY) {
        coord.top += BASE_VALUE;

        if (coord.top >= MAX_VALUE) {
            coord.top = MAX_VALUE;
        }
    }
    if (shiftY > evt.pageY) {
        coord.top -= BASE_VALUE;

        if (coord.top <= -MAX_VALUE) {
            coord.top = -MAX_VALUE;
        }
    }

    shiftX = evt.pageX;
    shiftY = evt.pageY;
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