import { makeRequest } from '../../makeRequest';
import { url, cart } from '../../constants';

export const basketGoodsItem = {
    props: ['item', 'realCart'],
    template: `
    <div class="cart-item">
        <div class="cart-itemImg">
        <img class="goods-image" :src="item.image">
        </div>
        <div class="cart-itemDesc">
        <h4 class="cart-itemName">{{item.title}}</h4>
        <div class="cart-itemPrice">\${{item.price}} x {{item.quantity}}</div>
        </div>
        <div class="cart-itemRemove" @click="deletitem(item, realCart)">
        <i class="fas fa-times-circle"></i>
        </div>
    </div>
    `,
    methods: {
        deletitem: function (item, realCart) {
            makeRequest(`${url}${cart}`, 'DELETE', { 'Content-type': 'application/json' }, item).then(cart => {
                realCart = cart;
            });
        }
    }
};