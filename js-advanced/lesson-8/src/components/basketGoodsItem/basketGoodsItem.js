import { makeRequest } from '../../makeRequest';
import { url, cart } from '../../constants';

export const basketGoodsItem = {
    props: ['item'],
    template: `
    <div class="cart-item">
        <div class="cart-itemImg">
        <img class="goods-image" :src="item.image">
        </div>
        <div class="cart-itemDesc">
        <h4 class="cart-itemName">{{item.title}}</h4>
        <div class="cart-itemPrice">\${{item.price}} x {{item.quantity}}</div>
        </div>
        <div class="cart-itemRemove" @click="$emit('delete-item', $event, item)">
        <i class="fas fa-times-circle"></i>
        </div>
    </div>
    `,
};