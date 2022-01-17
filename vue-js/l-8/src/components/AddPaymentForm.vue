<template>
  <v-row justify="center">
    <v-card class="pa-10" width="100%">
      <div v-show="!showAddCategoryForm">
        <v-text-field label="Date" v-model="date" name="date"></v-text-field>
        <v-select
          :items="categoryList"
          v-model="category"
          label="Category"
        ></v-select>
        <v-btn
          color="primary"
          id="addCategory"
          elevation="2"
          text
          tile
          small
          @click="showAddCategoryForm = !showAddCategoryForm"
          class="mb-4"
          >Add Category</v-btn
        >
        <v-text-field label="Value" v-model="value" name="value"></v-text-field>
        <v-btn
          id="addPayment"
          color="primary"
          elevation="2"
          tile
          align-self="center"
          block
          class="mb-4"
          @click="addPayment"
        >
          Add
        </v-btn>
        <v-btn
          elevation="2"
          tile
          outlined
          align-self="center"
          block
          class="mb-4"
          @click="closeForm"
        >
          Close Form
        </v-btn>
      </div>
      <div v-if="showAddCategoryForm">
        <v-text-field
          label="New Category Name"
          v-model="newCategory"
          name="newCategory"
        ></v-text-field>
        <v-btn
          id="addPayment"
          color="primary"
          elevation="2"
          tile
          align-self="center"
          block
          class="mb-4"
          @click="addNewCategory"
        >
          Add or Close
        </v-btn>
      </div>
    </v-card>
  </v-row>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "AddPaymentForm",
  data() {
    return {
      value: "",
      category: "",
      date: "",
      showAddCategoryForm: false,
      newCategory: "",
    };
  },
  computed: {
    ...mapGetters(["categoryList"]),
    paymentDate() {
      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();

      return `${day}.${month}.${year}`;
    },
  },
  methods: {
    ...mapActions(["fetchCategoryListData"]),
    ...mapMutations({ addCategory: "ADD_CATEGORY_LIST" }),
    addPayment() {
      const { value, category, date } = this;
      const data = {
        value: +value,
        category,
        date: date || this.paymentDate,
      };
      this.$emit("add-payment", data);
      this.value = '';
      this.category = '';
    },
    addNewCategory() {
      if (this.newCategory) {
        this.addCategory(this.newCategory);
      }
      this.showAddCategoryForm = !this.showAddCategoryForm;
      this.newCategory = '';
    },
    addFromLink() {
      this.category = this.$route.params.categorySelected;
      this.value = this.$route.query.value;
      this.date = this.paymentDate;
      this.showForm();
    },
    closeForm() {
      this.$emit('close-form');
    },
  },
  created() {
    this.fetchCategoryListData();
    this.addFromLink();
  },
};
</script>

<style lang="scss" module>
</style>
