<template>
  <div id="app">
    <header></header>
    <main>
      <div class="container">
        <div class="button" @click="showAdd">
          {{ addMessage }}
        </div>
        <AddPaymentForm v-show="showAddForm" @add-payment="addNewPayment" />
        <PaymentDisplay :items="showPayments" />
        <Pagination @select-page="changePage" />
      </div>
    </main>
    <footer></footer>
  </div>
</template>

<script>
import PaymentDisplay from "./components/PaymentDisplay.vue";
import AddPaymentForm from "./components/AddPaymentForm.vue";
import Pagination from "./components/Pagination.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "App",
  components: {
    PaymentDisplay,
    AddPaymentForm,
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
      if (payment.category != "" && payment.value != "") {
        this.addPayment(payment);
        this.fetchPages();
      }
    },
    showAdd() {
      this.showAddForm = !this.showAddForm;
      if (this.showAddForm) this.addMessage = "Close Form";
      else this.addMessage = "Add New Cost";
    },
    changePage(newPage) {
      (this.currentPage = newPage), this.fetchData(this.currentPage);
    },
  },
  computed: {
    ...mapGetters(["paymentsList"]),
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

<style lang="scss">
#app {
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
}
</style>
