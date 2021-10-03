class GoodsItem {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }
  render() {
    return `
      <div class="goods-item">
        <img class="goods-image" src="https://via.placeholder.com/150.png">
        <h3 class="goods-label">${this.title}</h3>
        <div class="goods-price">${this.price}₽</div>
        <div class="goods-btn-box">
          <button class="goods-btn">Добавить</button>
        </div>
      </div>
    `;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }

  fetchGoods() {
    this.goods = [
      { title: 'Shirt', price: 150 },
      { title: 'Socks', price: 50 },
      { title: 'Jacket', price: 350 },
      { title: 'Shoes', price: 250 },
      { title: 'Jacket', price: 350 },
      { title: 'Shoes', price: 250 },
      { title: 'Shirt', price: 150 },
      { title: 'Socks', price: 50 },
      { title: 'Jacket', price: 350 },
      { title: 'Shoes', price: 250 },
      { title: 'Jacket', price: 350 },
      { title: 'Shoes', price: 250 },
    ];
  }

  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.title, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }

  /**
   * Метод доступа к сумме товаров на странице
   */
  get sum() {
    let sum = 0;
    this.goods.forEach(good => sum += good.price);
    return sum;
  }
}

class Cart {
  constructor() {

  }

  /**
   * Добавляет товар в корзину
   * @param {GoodsItem} item - экземпляр товара
   */
  addToCart(item) {

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

class CartItem {
  constructor() {

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
   * Удаляет выбранный товар из корзины
   */
  removeItem() {

  }

  /**
   * Генерирует верстку товара в корзине
   */
  render() {

  }
}

onload = () => {
  const list = new GoodsList();
  list.fetchGoods();
  list.render();
};