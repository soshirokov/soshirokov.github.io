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

function normalizeGoods(goods) {
    return goods.map((good) => {
        return {
            id: good.id_product,
            price: good.price,
            title: good.product_name
        };
    });
}

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
        <div class="cart-itemRemove" @click="deletitem">
        <i class="fas fa-times"></i>
        </div>
    </div>
    `,
    methods: {
        deletitem: function () {

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
    template: `
        <div class="cart">
            <div class="cart-close" @click="closeCart" :style="styles.closebtn">
            <i class="fas fa-times"></i>
            </div>
            <slot></slot>
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
        makeGETRequest(`${url}${catalog}`).then(goods => {
            console.log(goods);
            const normalGoods = normalizeGoods(goods);
            this.goods = normalGoods;
            this.filteredGoods = normalGoods;
        });
    },
    data: {
        goods: [],
        filteredGoods: [],
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