<template>
  <div id="app">
    <header></header>
    <main>
      <div class="container">
        <div class="button" @click="showAdd">
          {{ addMessage }}
        </div>
        <AddPaymentForm v-show="showAddForm" @add-payment="addNewPayment" />
        <PaymentDisplay :items="paymentsListShow" />
        <Pagination :length="listLength" @select-page="selectPage" />
      </div>
    </main>
    <footer></footer>
  </div>
</template>

<script>
import PaymentDisplay from "./components/PaymentDisplay.vue";
import AddPaymentForm from "./components/AddPaymentForm.vue";
import Pagination from "./components/Pagination.vue";

export default {
  name: "App",
  components: {
    PaymentDisplay,
    AddPaymentForm,
    Pagination,
  },
  data() {
    return {
      paymentsList: [],
      paymentsListShow: [],
      showAddForm: false,
      addMessage: "Add New Cost",
    };
  },
  methods: {
    fetchData() {
      return [
        {
          date: "28.03.2020",
          category: "Food",
          value: 169,
        },
        {
          date: "24.03.2020",
          category: "Transport",
          value: 360,
        },
        {
          date: "24.03.2020",
          category: "Food",
          value: 532,
        },
        {
          date: "28.03.2020",
          category: "Food",
          value: 169,
        },
        {
          date: "24.03.2020",
          category: "Transport",
          value: 360,
        },
        {
          date: "24.03.2020",
          category: "Food",
          value: 532,
        },
      ];
    },
    addNewPayment(payment) {
      if (payment.category != "" && payment.value != "")
        this.paymentsList.push(payment);
    },
    showAdd() {
      this.showAddForm = !this.showAddForm;
      if (this.showAddForm) this.addMessage = "Close Form";
      else this.addMessage = "Add New Cost";
    },
    selectPage(page) {
      const start = (page - 1) * 5;
      this.paymentsListShow = this.paymentsList.slice(start, start + 5);
    },
  },
  computed: {
    listLength() {
      return this.paymentsList.length;
    },
  },
  created() {
    this.paymentsList = this.fetchData();
    this.paymentsListShow = this.paymentsList.slice(0, 5);
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
