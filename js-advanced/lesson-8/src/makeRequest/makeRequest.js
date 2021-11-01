export const makeRequest = function (url, method, headers, content) {
    return fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(content)
    }).then(response => response.json());
};