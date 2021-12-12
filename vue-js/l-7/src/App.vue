<template>
  <div id="app" :class="$style.app">
    <header></header>
    <main>
      <div :class="$style.container">
        <router-link :class="$style.button" :to="{ name: 'addpayment' }">
          Add New Cost
        </router-link>
        <router-view @add-payment="addNewPayment" />
        <PaymentDisplay :items="showPayments" />
        <Pagination @select-page="changePage" />
      </div>
    </main>
    <footer></footer>
  </div>
</template>

<script>
import PaymentDisplay from "./components/PaymentDisplay.vue";
import Pagination from "./components/Pagination.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "App",
  components: {
    PaymentDisplay,
    Pagination,
  },
  data() {
    return {
      showAddForm: false,
      addMessage: "Add New Cost",
      currentPage: 1,
    };
  },
  methods: {
    ...mapActions(["fetchData", "fetchPages"]),
    ...mapMutations({ addPayment: "ADD_PAYMENT_DATA" }),
    addNewPayment(payment) {
      console.log(this.maxID);
      if (payment.category && payment.value) {
        payment.id = this.maxID + 1;
        this.addPayment(payment);
        this.fetchPages();
      }
    },
    changePage(newPage) {
      (this.currentPage = newPage), this.fetchData(this.currentPage);
    },
  },
  computed: {
    ...mapGetters({ paymentsList: "paymentsList", maxID: "maxID" }),
    showPayments() {
      return this.paymentsList["page" + this.currentPage];
    },
  },
  created() {
    this.fetchData(this.currentPage);
    this.fetchPages();
  },
};
</script>

<style lang="scss" module>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  max-width: 1110px;
  margin: 0 auto;
}

.button {
  height: 38px;
  line-height: 38px;
  text-transform: uppercase;
  background: rgb(13, 109, 64);
  color: #fff;
  border: none;
  cursor: pointer;
  font-weight: 600;
  width: 300px;
  margin: 0 auto;
  display: block;
  text-decoration: none;
}
</style>
