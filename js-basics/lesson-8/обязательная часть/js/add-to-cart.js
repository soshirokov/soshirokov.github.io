(function () {
    let cart = {

        /**
         * Функция инициализирует настройки объекта Cart после полной загрузки документа
         */
        init: function () {
            this.total = 0;
            this.products = [];
            this.cartCounter = document.querySelector('#cart-count');
            this.cartProductList = document.querySelector('.cart__list');
            this.cartMain = document.querySelector('.cart');
            this.cartTotalBox = document.querySelector('.cart-total');
            this.cartTotal = document.querySelector('#cart-total');
            this.cartEmptyMessage = document.querySelector('.cart__default');
            this.productsOnPage = document.querySelectorAll('.fetured__item');

            this.productsOnPage.forEach((item, i) => {
                item.setAttribute('data-id', i);
            });

            this.updateCart();

            document.querySelectorAll('.button_atc').forEach(atc => {
                atc.addEventListener('click', (event) => { this.atcHandler(event); });
            });

            this.cartMain.addEventListener('click', (event) => { this.cartHandler(event); });
        },

        /**
         * Функция для обработки события нажания на кнопку Добавить в корзину
         * @param {event} event - объект события клика
         */
        atcHandler: function (event) {
            const product = this.getProduct(event.currentTarget);
            const existProduct = this.findProduct(product);

            if (!existProduct) {
                this.products.push(product);
            } else {
                existProduct.qnt++;
            }

            this.updateCart();
            this.openCart();
        },

        /**
         * Функция для обработки события нажатия на "крестик", кнопки удаления товара из корзны
         * @param {event} event - объект события клика
         */
        cartHandler: function (event) {
            if (event.target.classList.contains('fa-times-circle')) {
                this.removeItem(event.target);
            }
        },

        /**
         * Функция удаления выбранного товара из коризны. Удаляет сразу весь товар, не важно, какое было количество
         * @param {HTMLElement} btn - ссылка на кнопку удаления, содержащую id удаляемого элемента
         */
        removeItem: function (btn) {
            console.dir(btn);
            this.products = this.products.filter(item => {
                return !(btn.dataset.id == item.id);
            });

            this.updateCart();
        },

        /**
         * Обновление счетчика товаров в корзине
         */
        updateCartCounter: function () {
            let cartCount = 0;
            this.products.forEach(item => {
                cartCount += item.qnt;
            });
            this.cartCounter.innerHTML = cartCount;
        },

        /**
         * Функция парсига объекта товара из html-разметки страницы
         * @param {HTMLElement} atc - ссылка на кнопку Добавить в коризну нужного товара
         * @returns {object} - объект товара. По-умолчанию количество 1
         */
        getProduct: function (atc) {
            const productCard = atc.closest('.fetured__item');
            return product = {
                id: productCard.dataset.id,
                imgSrc: productCard.querySelector('.fetured__item-img').getAttribute('src'),
                label: productCard.querySelector('.fetured__item-label').innerHTML,
                price: +productCard.querySelector('.fetured__item-price ').innerHTML.slice(1),
                link: productCard.querySelector('.fetured__item-link').getAttribute('href'),
                qnt: 1
            };
        },

        /**
         * Функция проверки наличия выбранного товара в корзине
         * @param {object} product - объект товара, который пользователь хочет добавить в корзину
         * @returns {object} - ссылка на найденный объект в массиве товаров в корзине, undefined в противном случае
         */
        findProduct: function (product) {
            return this.products.find(item => {
                return product.id == item.id;
            });
        },

        /**
         * Обновление коризны: счетчика товаров в корзине, набора товаров в корзине и общей суммы заказа
         */
        updateCart: function () {
            this.updateCartCounter();
            const productsListHTML = this.getProductsHTML();
            this.cartProductList.innerHTML = productsListHTML;

            if (this.cartProductList.innerHTML == '') {
                this.showEmptyCartMessage();
            } else {
                this.hideEmptyCartMessage();
            }

            this.showTotal();
        },

        /**
         * Генератор HTML разметки набора товаров в корзине
         * @returns {string} - строка с разметкой HTML
         */
        getProductsHTML: function () {
            let productsHTML = '';
            this.products.forEach(item => {
                productsHTML += `
                <div class="cart-item">
                    <a href="${item.link}" class="cart-item__link">
                        <img src="${item.imgSrc}" alt="${item.label}" class="cart-item__img">
                    </a>
                    <div class="cart-item__details">
                        <div class="cart-item__label">${item.label}</div>
                        <div class="cart-item__rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                        </div>
                        <div class="cart-item__price-box">
                            <span class="cart-item__quantity">${item.qnt}</span>
                            <span class="cart-item__times"> x </span>
                            <span class="cart-item__price">${item.price.toFixed(2)}</span>
                        </div>
                    </div>
                    <div class="cart-item__remove">
                        <i class="fas fa-times-circle" data-id="${item.id}"></i>
                    </div>
                </div>
                `;
            });

            return productsHTML;
        },

        /**
         * Разворачивает коризну
         */
        openCart: function () {
            this.cartMain.setAttribute('open', 'open')
        },

        /**
         * Отображени сообщения о пустой корзине
         */
        showEmptyCartMessage: function () {
            this.cartEmptyMessage.style.display = 'block';
        },

        /**
         * Скрытие сообщения о пустой корзине
         */
        hideEmptyCartMessage: function () {
            this.cartEmptyMessage.style.display = 'none';
        },

        /**
         * Вывод общей суммы всех товаров в корзине
         */
        showTotal: function () {
            this.updateTotal();
            if (this.total == 0) {
                this.cartTotalBox.style.display = 'none';
            } else {
                this.cartTotalBox.style.display = 'flex';
                this.cartTotal.innerHTML = '$' + this.total;
            }
        },

        /**
         * Подсчет общей суммы товаров в корзине
         */
        updateTotal: function () {
            this.total = 0;
            this.products.forEach(item => {
                this.total += item.price * item.qnt;
            });

            this.total = (this.total).toFixed(2);
        },
    }

    document.addEventListener('DOMContentLoaded', () => {
        cart.init();
    });
})();