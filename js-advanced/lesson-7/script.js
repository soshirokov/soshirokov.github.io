const url = 'http://localhost:8002';
const catalog = '/catalog';
const cart = '/basket';

function makeRequest(url, method, headers, content) {
    return fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(content)
    }).then(response => response.json());
}

Vue.component('goods-item', {
    props: ['item'],
    template: `
        <div class="goods-item">
            <img class="goods-image" :src="item.image">
            <h3 class="goods-label">{{ item.title }}</h3>
            <div class="goods-price">{{ item.price }}</div>
            <div class="goods-btn-box">
            <button class="goods-btn" @click="addToCart(item)">Добавить</button>
            </div>
        </div>
    `,
    methods: {
        addToCart: function (item) {
            makeRequest(`${url}${cart}`, 'PATCH', { 'Content-type': 'application/json' }, item).then(cart => {
                app.cart = cart;
            });
        }
    }
});

Vue.component('basket-goods-item', {
    props: ['item'],
    template: `
    <div class="cart-item">
        <div class="cart-itemImg">
        <img class="goods-image" :src="item.image">
        </div>
        <div class="cart-itemDesc">
        <h4 class="cart-itemName">{{item.title}}</h4>
        <div class="cart-itemPrice">{{item.price}}</div>
        <div class="cart-itemQnt">Количество: {{item.quantity}}</div>
        </div>
        <div class="cart-itemRemove" @click="deletitem(item)">
        <i class="fas fa-times"></i>
        </div>
    </div>
    `,
    methods: {
        deletitem: function (item) {
            makeRequest(`${url}${cart}`, 'DELETE', { 'Content-type': 'application/json' }, item).then(cart => {
                app.cart = cart;
            });
        }
    }
});

Vue.component('basket-card', {
    data: function () {
        return {
            styles: {
                closebtn: {
                    textAlign: 'right',
                    marginBottom: '20px'
                }
            }
        };
    },
    props: ['cart'],
    template: `
        <div class="cart">
            <div class="cart-close" @click="closeCart" :style="styles.closebtn">
            <i class="fas fa-times"></i>
            </div>
            <slot></slot>
            <div class="cart-total-count">Товаров в корзине: {{ cart.countGoods }}</div>
            <div class="cart-total-price">На сумму: {{ cart.amount }}</div>
        </div>
    `,
    methods: {
        closeCart: function () {
            app.basketCardVision = false;
        }
    }
});


var app = new Vue({
    el: '#mainApp',
    mounted: function () {
        makeRequest(`${url}${catalog}`, 'GET').then(goods => {
            this.goods = goods;
            this.filteredGoods = goods;
        });

        makeRequest(`${url}${cart}`, 'GET').then(cart => {
            this.cart = cart;
        });
    },
    data: {
        goods: [],
        filteredGoods: [],
        basketCardVision: false,
        search: '',
        cart: {}
    },
    methods: {
        filterGoods: function () {
            this.filteredGoods = this.goods.filter(({ title }) => (new RegExp(this.search, 'gi')).test(title));
        },
        cartShow: function () {
            this.basketCardVision = !this.basketCardVision;
        }
    },
    computed: {
        emptyCart() {
            if (this.cart.contents.length > 0) {
                return false;
            }
            return true;
        },
    }
});