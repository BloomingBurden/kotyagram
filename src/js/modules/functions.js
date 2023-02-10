// Проверить, поддерживает ли браузер формат изображений .webp;
const isWebp = () => {
    function testWebP(callback) {
        let webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }

    testWebP(function (support) {
        let className = support ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
    });
}
// Установить адаптивную высоту для главного блока upload;
const getHeight = () => {
    const content = document.querySelector('.upload');

    const setHeight = () => {
        content.style.height = `${content.offsetWidth}px`;
    }

    window.addEventListener('DOMContentLoaded', setHeight);
    window.addEventListener('resize', setHeight);
}


// Свернуть модальное окно
const collapseModal = () => {
    const upload = document.querySelector('.upload');
    const open = document.querySelector('.upload__open');
    
    const closeModal = () => {
        upload.classList.add('upload--closed');
        upload.style.right = `-${window.innerWidth}px`;
        open.textContent = 'Развернуть';
    }

    const openModal = () => {
        upload.classList.remove('upload--closed');
        upload.style.right = 0;
        open.textContent = 'Свернуть';
    }

    window.addEventListener('DOMContentLoaded', closeModal);
    window.addEventListener('resize', closeModal);
    
    open.addEventListener('click', (evt) => {
        if (upload.classList.contains('upload--closed')) {
            openModal();
        } else {
            closeModal()
        }
    });
}

isWebp();
getHeight();
collapseModal();