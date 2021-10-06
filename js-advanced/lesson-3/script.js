const url = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const catalog = '/catalogData.json';
const cart = '/getBasket.json';
const addToCart = '/addToBasket.json';
const deleteFromCart = '/deleteFromBasket.json';

function makeGETRequest(url) {
  return new Promise((resolve, reject) => {
    let xhr;

    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onload = () => { resolve(xhr.responseText) };

    xhr.open('GET', url, true);
    xhr.send();
  });
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
    this.fetchGoods().then(() => {
      this.render();
    });;
  }

  fetchGoods() {
    return new Promise((resolve, reject) => {
      makeGETRequest(`${url}${catalog}`).then((goods) => {
        this.goods = JSON.parse(goods);
        resolve();
      });
    });
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
    this.fetchCart().then(() => { this.render(); });
  }

  /**
   * Добавляет товар в корзину
   * @param {GoodsItem} item - экземпляр товара
   */
  addToCart() {
    makeGETRequest(`${url}${addToCart}`).then((good) => {
      good = JSON.parse(good);
    });
  }

  /**
   * Удаляет выбранный товар из корзины
   */
  removeFromCart() {
    makeGETRequest(`${url}${deleteFromCart}`).then((good) => {
      good = JSON.parse(good);
    });
  }

  /**
   * Возвращает количество товаров в корзине
   */
  fetchCart() {
    return new Promise((resolve, reject) => {
      makeGETRequest(`${url}${cart}`).then((cart) => {
        cart = JSON.parse(cart);

        for (let key in cart) {
          this[key] = cart[key];
        }
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

  }
}

onload = () => {
  const list = new GoodsList();
  const cart = new Cart();
};