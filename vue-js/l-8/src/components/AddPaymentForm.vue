<template>
  <v-row class="mt-10" justify="center">
    <v-card class="pa-10">
      <div :class="$style.addPayment" v-show="!showAddCategoryForm">
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
          to="/"
        >
          Close Form
        </v-btn>
      </div>
      <div :class="$style.addCategory" v-show="showAddCategoryForm">
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
          Add
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
    },
    addNewCategory() {
      if (this.newCategory) {
        this.addCategory(this.newCategory);
      }
      this.showAddCategoryForm = !this.showAddCategoryForm;
      console.log(this.categoryList);
    },
    addFromLink() {
      this.category = this.$route.params.categorySelected;
      this.value = this.$route.query.value;
      this.date = this.paymentDate;
      if (this.category && this.value && this.date) {
        this.addPayment();
      }
    },
  },
  created() {
    this.fetchCategoryListData();
  },
  mounted() {
    this.addFromLink();
  },
};
</script>

<style lang="scss" module>
.addCost {
  width: 400px;
  background: #fff;
  margin: 20px auto;
  padding: 0 20px;
  text-align: center;
}

.input {
  font-size: 14px;
  font-weight: 400;
  line-height: 32px;
  height: 32px;
  padding: 0 8px;
  width: 100%;
  margin-bottom: 10px;
  box-sizing: border-box;
}

.btn {
  height: 38px;
  line-height: 38px;
  text-transform: uppercase;
  background: rgb(13, 109, 64);
  color: #fff;
  border: none;
  cursor: pointer;
  font-weight: 600;
  width: 100%;
  display: block;
  text-decoration: none;
  margin-top: 10px;
}

.select {
  width: 100%;
  height: 38px;
  line-height: 38px;
  margin-bottom: 10px;
  font-size: 18px;
}

.addCategoryLink {
  width: 200px;
  flex-grow: 1;
  display: block;
  cursor: pointer;
}

.categoryControl {
  display: flex;
}
</style>
