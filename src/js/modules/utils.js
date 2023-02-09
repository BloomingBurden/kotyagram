const closeModal = () => {
    const modal = document.querySelector('.upload__overlay');
    modal.classList.add('hidden');
};

const throttle = (func, ms) => {
    let isRepeat = false;

    return function (...args) {
        if (isRepeat) return;

        func.apply(this, ...args);

        isRepeat = true;
        
        setTimeout(() => isRepeat = false, ms);
    }
};

const debounce = (func, ms) => {
    let timeout;

    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(func, ms);
    }
};

export { closeModal, throttle, debounce }