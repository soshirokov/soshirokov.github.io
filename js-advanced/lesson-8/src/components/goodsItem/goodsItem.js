import { makeRequest } from '../../makeRequest';
import { url, cart } from '../../constants';

export const goodsItem = {
    props: ['item', 'realCart'],
    template: `
        <div class="goods-item">
            <img class="goods-image" :src="item.image">
            <button class="goods-btn" @click="addToCart(item, realCart)">Add to Cart</button>
            <div class="goods-desc">
                <h3 class="goods-label">{{ item.title }}</h3>
                <div class="goods-price">\${{ item.price }}</div>
                <div class="goods-btn-box">
            </div>
            </div>
        </div>
    `,
    methods: {
        addToCart: function (item, realCart) {
            makeRequest(`${url}${cart}`, 'PATCH', { 'Content-type': 'application/json' }, item).then(cart => {
                realCart = cart;
            });
        }
    }
};