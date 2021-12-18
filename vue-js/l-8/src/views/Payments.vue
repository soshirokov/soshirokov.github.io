<template>
  <v-container>
    <v-row class="mt-10">
      <v-col cols="2"></v-col>
      <v-col cols="4" class="text-center">
        <v-btn
          color="primary"
          elevation="2"
          tile
          align-self="center"
          class="mb-6"
          @click="showModal = true"
        >
          Add New Cost
        </v-btn>
        <v-dialog
          transition="dialog-bottom-transition"
          max-width="600"
          v-model="showModal"
        >
          <template>
            <AddPaymentForm
              @add-payment="addNewPayment"
              @close-form="closeForm"
            />
          </template>
        </v-dialog>
        <PaymentDisplay :items="showPayments" />
        <Pagination @select-page="changePage"
      /></v-col>
      <v-col cols="4">
        <Chart :items="showPayments" />
      </v-col>
      <v-col cols="2"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import PaymentDisplay from "../components/PaymentDisplay.vue";
import Pagination from "../components/Pagination.vue";
import AddPaymentForm from "../components/AddPaymentForm.vue"
import Chart from "../components/Chart.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "App",
  components: {
    PaymentDisplay,
    Pagination,
    AddPaymentForm,
    Chart,
  },
  data() {
    return {
      showAddForm: false,
      addMessage: "Add New Cost",
      currentPage: 1,
      showModal: false
    };
  },
  methods: {
    ...mapActions(["fetchData", "fetchPages"]),
    ...mapMutations({ addPayment: "ADD_PAYMENT_DATA" }),
    addNewPayment(payment) {
      if (payment.category && payment.value) {
        payment.id = this.maxID + 1;
        this.addPayment(payment);
        this.fetchPages();
        this.closeForm();
      }
    },
    changePage(newPage) {
      (this.currentPage = newPage), this.fetchData(this.currentPage);
    },
    closeForm() {
      this.showModal = false;
    }
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
  mounted() {
    if (this.$route?.params?.categorySelected) this.showModal = true;
  }
};
</script>

<style lang="scss" module>
</style>
