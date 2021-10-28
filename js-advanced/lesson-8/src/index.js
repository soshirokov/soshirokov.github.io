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
        basketCard, basketGoodsItem, goodsItem
    }
});