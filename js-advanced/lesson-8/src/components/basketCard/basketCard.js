export const basketCard = {
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
            <div class="cart-total-count">Total items:<span>{{ cart.countGoods }}</span></div>
            <div class="cart-total-price">Total price:<span>\${{ cart.amount }}</span></div>
        </div>
    `,
    methods: {
        closeCart() {
            this.$root.closeCart();
        },
    }
};