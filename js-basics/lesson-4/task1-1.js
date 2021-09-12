/*
Сделайте в стиле es5, а затем в стиле es6 (по аналогии из дополнительных видео -> 3 примеры наследования -> типы на es5 и es6), конструктор Product, который принимает параметры name и price, сохраните их как свойства объекта. Также объекты типа Product должны иметь метод make25PercentDiscount, который будет уменьшать цену в объекте на 25%. Имейте в виду, что метод make25PercentDiscount не должен быть внутри функции-конструктора, и также не нужно создавать отдельный объект-прототип (как объект transport в уроке).
*/
'use strict';

function ProductES5(name, price) {
    this.name = name;
    this.price = price;
}

ProductES5.prototype.make25PercentDiscount = function () {
    this.price = this.price * (100 - 25) / 100;
}

let productES5 = new ProductES5('Пылесос', 25000);
console.log(productES5);
productES5.make25PercentDiscount();
console.log(productES5);

class ProductES6 {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    make25PercentDiscount() {
        this.price = this.price * (100 - 25) / 100;
    }
}

let productES6 = new ProductES6('Пылесос', 25000);
console.log(productES6);
productES6.make25PercentDiscount();
console.log(productES6);