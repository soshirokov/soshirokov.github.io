const GOODS_PATH = './static/goods.json';
const BASKET_GOODS_PATH = './static/basket-goods.json';

const fs = require('fs');

const getCatalog = function () {
    return new Promise((resolve) => {
        fs.readFile(GOODS_PATH, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            }
            resolve(JSON.parse(data));
        });
    });
}

const getBasket = function () {
    return new Promise((resolve) => {
        fs.readFile(BASKET_GOODS_PATH, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            }
            resolve(JSON.parse(data));
        });
    });
}

const addToBasket = function (newItem) {
    return new Promise((resolve) => {
        getBasket().then((basket) => {
            if (basket.contents.filter(item => newItem.id == item.id).length > 0 && basket.contents.length > 0) {
                basket.contents.forEach(item => {
                    if (item.id == newItem.id) {
                        item.quantity++;
                    }
                });
            } else {
                newItem.quantity = 1;
                basket.contents.push(newItem);
            }
            updateBasket(basket);
            fs.writeFile(BASKET_GOODS_PATH, JSON.stringify(basket), (err) => {
                if (err) {
                    console.log(err);
                }
                resolve(basket);
            });
        });

    });
}

const removeFromBasket = function (index) {
    return new Promise((resolve) => {
        getBasket().then((basket) => {
            basket.contents = basket.contents.filter(item => item.id != index);
            updateBasket(basket);
            fs.writeFile(BASKET_GOODS_PATH, JSON.stringify(basket), (err) => {
                if (err) {
                    console.log(err);
                }
                resolve(basket);
            });
        });

    });
}

function updateBasket(basket) {
    basket.countGoods = 0;
    basket.amount = 0;
    basket.contents.forEach(item => {
        basket.countGoods += item.quantity;
        basket.amount += item.quantity * item.price;
    });
}



module.exports = {
    getCatalog,
    getBasket,
    addToBasket,
    removeFromBasket
};