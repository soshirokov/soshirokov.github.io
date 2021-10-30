import { url, catalog, cart } from './constants';
import { makeRequest } from './makeRequest';
import { basketCard, basketGoodsItem, goodsItem } from './components';


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
        },
        deletitem: function (item) {
            makeRequest(`${url}${cart}`, 'DELETE', { 'Content-type': 'application/json' }, item).then(cart => {
                this.cart = cart;
            });
        },
        addToCart: function (item) {
            makeRequest(`${url}${cart}`, 'PATCH', { 'Content-type': 'application/json' }, item).then(cart => {
                this.cart = cart;
            });
        },
        closeCart: function () {
            this.basketCardVision = false;
        }
    },
    computed: {
        emptyCart() {
            if (this.cart.contents.length > 0) {
                return false;
            }
            return true;
        },
    },
    components: {
        basketCard,
        basketGoodsItem,
        goodsItem
    }
});