const url = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const catalog = '/catalogData.json';
const cart = '/getBasket.json';
const addToCart = '/addToBasket.json';
const deleteFromCart = '/deleteFromBasket.json';

function makeGETRequest(url) {
  return fetch(url).then(response => response.json());
}

function makePOSTRequest(url, content) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(content)
  }).then(response => response.json());
}

function makeDELETERequest(url, content) {
  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(content)
  }).then(response => response.json());
}

class GoodsItem {
  constructor(title = 'TITLE', price = '00.00', id) {
    this.id_product = id;
    this.price = price;
    this.product_name = title;
  }
  render() {
    return `
      <div class="goods-item">
        <img class="goods-image" src="https://via.placeholder.com/150.png">
        <h3 class="goods-label">${this.product_name}</h3>
        <div class="goods-price">${this.price}₽</div>
        <div class="goods-btn-box">
          <button class="goods-btn" data-id="${this.id_product}">Добавить</button>
        </div>
      </div>
    `;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
    this.fetchGoods().then(() => this.render());
  }

  fetchGoods() {
    return makeGETRequest(`${url}${catalog}`).then(goods => this.goods = goods);
  }

  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.product_name, good.price, good.id_product);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }

  get sum() {
    return this.goods.reduce((sum, { price }) => sum + price, 0);
  }
}


class Cart {
  constructor() {
    this.contents = [];
    this.openBtn = document.querySelector('.cart-button');
    this.cartBlock = document.querySelector('.cart');
    this.fetchCart().then(() => this.render());

    this.openBtn.addEventListener('click', () => {
      this.cartBlock.classList.toggle('active');
    });
  }

  /**
   * Добавляет товар в корзину
   * @param {GoodsItem} item - экземпляр товара
   */
  addToCart(productId) {
    makePOSTRequest(`${url}${addToCart}`, productId).then(() => this.refreshCart());
  }

  /**
   * Удаляет выбранный товар из корзины
   */
  removeFromCart() {
    makeDELETERequest(`${url}${addToCart}`, productId).then(() => this.refreshCart());
  }

  /**
   * Возвращает количество товаров в корзине
   */
  fetchCart() {
    return makeGETRequest(`${url}${cart}`).then(cart => {
      this.amount = cart.amount;
      this.countGoods = cart.countGoods;
      cart.contents.forEach(item => {
        this.contents.push(new CartItem(item.product_name, item.price, item.id_product, item.quantity));
      });
    });
  }

  /**
   * Возвращает количество товаров в корзине
   */
  getItemsCount() {

  }

  /**
   * Возвращает сумму товаров в корзине
   */
  getCartTotal() {

  }

  /**
   * Обновлят корзину после добавления товара (пересчитывает количество товаров и сумму)
   */
  refreshCart() {
    this.fetchCart().then(() => this.render());
  }

  /**
   * Показывает козину при клике
   */
  showCart() {

  }

  /**
   * Скрывает корзину
   */
  hideCart() {

  }

  /**
   * Генерирует верстку корзины
   */
  render() {
    let itemsHTML = '';

    this.contents.forEach(item => {
      itemsHTML += item.render();
    })

    this.cartBlock.insertAdjacentHTML('afterbegin', `
      <div class="cart-count">Всего товаров в корзине ${this.countGoods}</div>
      <div class="cart-items">
        ${itemsHTML}
      </div>
      <div class="cart-amount">Общая сумма: ${this.amount}</div>
    `);
  }

  /**
   * Очищает корзину
   */
  clear() {

  }
}

class CartItem extends GoodsItem {
  constructor(title = 'TITLE', price = '00.00', id, quantity = 1) {
    super(title, price, id);
    this.quantity = quantity;
  }
  /**
   * Увеличивает количество товара в корзине при повторном добавлении
   */
  increaseQuantity() {

  }

  /**
   * Устанавливает количество товара в корзине (при вводе вручную)
   */
  setQuantity() {

  }

  /**
   * Генерирует верстку товара в корзине
   */
  render() {
    return `
      <div class="cart-item">
        <div class="cart-itemImg">
          <img class="goods-image" src="https://via.placeholder.com/100.png">
        </div>
        <div class="cart-itemDesc">
          <h4 class="cart-itemName">${this.product_name}</h4>
          <div class="cart-itemPrice">${this.price} x ${this.quantity}</div>
        </div>
        <div class="cart-itemRemove">
          <i class="fas fa-times"></i>
        </div>
      </div>
    `;
  }
}

class FeedBack {
  constructor() {

  }
}

/**
 * Функция готовит текст к выводу на сайте (заменяет одинарные кавычки прямой речи на двойные)
 * @param {string} text 
 */
const renderText = function (text) {
  const reg = /\'([A-Za-z]*)\'/gi;
  return text.replace(reg, '"$1"');
}

onload = () => {
  const list = new GoodsList();
  const cart = new Cart();

  let text = "A large text is given in 'which' single quotes are used to design direct speech. Come up with a pattern that 'replaces' single quotes with double quotes. Improve the pattern so that single quotes are not replaced with double quotes in constructs like aren't.";

  document.querySelector('.big-text').innerHTML = renderText(text);

  const formToValidation = document.querySelector('.validation-form');

  formToValidation.addEventListener('submit', (event) => {
    let error = false;

    document.querySelectorAll('.error').forEach(err => err.remove());

    //проверка имени

    const formName = document.querySelector('#name');
    if (formName.value == "" || !(/^[a-zA-Z]+$/.test(formName.value))) {
      error = true;
      formName.insertAdjacentHTML('afterend', '<div class="error">Только буквы</div>');
    }

    //проверка телефона 

    const formTel = document.querySelector('#tel');
    if (formTel.value == "" || !(/^\+7\(\d{3}\)\d{3}\-\d{4}$/.test(formTel.value))) {
      error = true;
      formTel.insertAdjacentHTML('afterend', '<div class="error">В формате +7(000)000-0000</div>');
    }

    //проверка email

    const formEmail = document.querySelector('#email');
    if (formEmail.value == "" || !(/^.+@[0-9A-Za-z]+\.[A-Za-z]{2,3}$/.test(formEmail.value))) {
      error = true;
      formEmail.insertAdjacentHTML('afterend', '<div class="error">В формате mymail@mail.ru</div>');
    }

    //проверка сообщения

    const formText = document.querySelector('#text');
    if (formText.value == "") {
      error = true;
      formText.insertAdjacentHTML('afterend', '<div class="error">Заполните поле</div>');
    }

    if (error) event.preventDefault();
  });
};