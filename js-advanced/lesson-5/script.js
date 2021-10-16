Vue.component('goods-item', {
    props: ['item'],
    template: `
        <div class="goods-item">
            <img class="goods-image" src="https://via.placeholder.com/150.png">
            <h3 class="goods-label">{{ item.title }}</h3>
            <div class="goods-price">{{ item.price }}</div>
            <div class="goods-btn-box">
            <button class="goods-btn">Добавить</button>
            </div>
        </div>
    `,
});

Vue.component('basket-goods-item', {
    props: ['item'],
    template: `
    <div class="cart-item">
        <div class="cart-itemImg">
        <img class="goods-image" src="https://via.placeholder.com/100.png">
        </div>
        <div class="cart-itemDesc">
        <h4 class="cart-itemName">{{item.title}}</h4>
        <div class="cart-itemPrice">{{item.price}}</div>
        </div>
        <div class="cart-itemRemove">
        <i class="fas fa-times"></i>
        </div>
    </div>
    `,
});

Vue.component('basket-card', {
    template: `
        <div class="cart"></div>
    `,
});


var app = new Vue({
    el: '#mainApp',
    data: {
        goods: [
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
        ],
        filteredGoods: [
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
        ],
        basketCardVision: false,
        search: '',
    },
    methods: {
        filterGoods: function () {
            this.filteredGoods = this.goods.filter(({ title }) => (new RegExp(this.search, 'gi')).test(title));
        },
        cartShow: function () {
            this.basketCardVision = !this.basketCardVision;
        }
    }
});