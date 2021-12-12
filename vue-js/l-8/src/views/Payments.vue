<template>
  <v-container>
    <v-row justify="center" class="mt-10">
      <v-btn
        color="primary"
        elevation="2"
        tile
        align-self="center"
        :to="{ name: 'addpayment' }"
      >
        Add New Cost
      </v-btn>
    </v-row>

    <router-view @add-payment="addNewPayment"></router-view>
    <v-row class="mt-10">
      <v-col cols="2"></v-col>
      <v-col cols="4"
        ><PaymentDisplay :items="showPayments" />
        <Pagination @select-page="changePage"
      /></v-col>
      <v-col cols="4">chart</v-col>
      <v-col cols="2"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import PaymentDisplay from "../components/PaymentDisplay.vue";
import Pagination from "../components/Pagination.vue";
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
</style>
