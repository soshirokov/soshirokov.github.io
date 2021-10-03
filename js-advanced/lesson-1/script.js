document.addEventListener('DOMContentLoaded', () => {
  const goods = [
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


  /**
   * Функция возвразает верстку одной карточки товара. Так как это стрелочная функция с одним действием, то {} и return не нужны
   * @param {sting} title - название продукта
   * @param {string} price - цена продукта
   * @returns 
   */
  const renderGoodsItem = (title, price) =>
    `
      <div class="goods-item">
        <img class="goods-image" src="https://via.placeholder.com/150.png">
        <h3 class="goods-label">${title}</h3>
        <div class="goods-price">${price}₽</div>
        <div class="goods-btn-box">
          <button class="goods-btn">Добавить</button>
        </div>
      </div>
    `;

  /**
   * Функция выводит в блок с классом goods-list список товаров. Запятая появляется, так как мы неявным образом приводим массив к строке. Можно исправить явно приобразовав массив в строку с указанием пустого разделителя через join
   * @param {array} list - список объектов с товарами
   */
  const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
  }

  renderGoodsList(goods);
});