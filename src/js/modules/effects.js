const tumbler = document.querySelector('.tumbler');
const tumblerBtn = document.querySelector('.tumbler__label');
const tumblerSlider = document.querySelector('.tumbler__line');
const effectsList = document.querySelector('.effects__list');
const imgPreview = document.querySelector('.upload__img-preview > img');

const SliderValue = {
    MAX: 100,
    MIN: 1,
};

const effects = {
    none: () => {
        return 'none';
    },
    chrome: () => {
        return `grayscale(${0.01 * currentValue})`;
    },
    sepia: () => {
        return `sepia(${0.01 * currentValue})`;
    },
    marvin: () => {
        return `invert(${currentValue}%)`;
    },
    phobos: () => {
        return `blur(${0.03 * currentValue}px)`;
    },
    heat: () => {
        return `brightness(${0.03 * currentValue})`;
    },
};


// ЗАДАТЬ ЭФФЕКТ НА ФОТО
let currentValue = SliderValue.MAX;
let nameOfEffect;
let procent = 4.58;

const getProcent = () => {
    procent = tumbler.clientWidth / 100;
}

const resetStyle = () => {
    tumblerBtn.style.left = 'calc(100% - 10px)';
    tumblerLineMove(SliderValue.MAX);
    currentValue = SliderValue.MAX;
}

const setValueEffect = () => {
    imgPreview.style.filter = effects[nameOfEffect]();
}

const tumblerLineMove = (value) => {
    tumblerSlider.value = `${value}%`;
    tumblerSlider.style.width = `${value}%`;
};


const showTumbler = (evt) => {
    const target = evt.target.closest('.effects__preview');

    if (!target) return;

    if (target.classList.contains('effects__preview--none')) {
        tumbler.classList.add('hidden');
        window.removeEventListener('resize', getProcent);
    } else {
        tumbler.classList.remove('hidden');
        getProcent();
        window.addEventListener('resize', getProcent);
    }
    
    resetStyle();
    nameOfEffect = target.className.slice(target.className.indexOf('--') + 2);
    setValueEffect();
}

effectsList.addEventListener('click', showTumbler);

// РЕГУЛИРОВКА ЭФФЕКТА НА ФОТО

tumblerBtn.addEventListener('pointerdown', (evt) => {
    evt.preventDefault();

    const moveElem = (evt) => {
        const coordLine = tumbler.getBoundingClientRect().left + 6;
        const value = evt.pageX - coordLine;
        const tumblerWidth = tumblerBtn.offsetWidth / 2;
        currentValue = Math.round( value / procent);

        if (currentValue >= SliderValue.MAX) {
            currentValue = SliderValue.MAX;
            return;
        }
        if (currentValue < SliderValue.MIN) {
            currentValue = SliderValue.MIN;
            return;
        }
        
        tumblerBtn.style.left = `calc(${currentValue}% - ${tumblerWidth}px)`;
        tumblerLineMove(currentValue);
        setValueEffect();
    }

    const clearElem = (evt) => {
        document.removeEventListener('pointermove', moveElem);
        document.removeEventListener('pointerup', clearElem);
    };

    document.addEventListener('pointerup', clearElem);
    document.addEventListener('pointermove', moveElem);
});

