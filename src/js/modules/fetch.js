const URL = 'http://localhost:3001/data';

const request = (onSuccess, onError, method, data) => {
    fetch(URL, {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: data
    })
    .then((response) => response.json())
    .then((response) => {
        onSuccess(response);
    })
    .catch((error) => {
        onError(error);
    })
};

export { request }