<template>
  <div :class="$style.addCost">
    <div :class="$style.addPayment" v-show="!showAddCategoryForm">
      <input
        :class="$style.input"
        type="text"
        placeholder="Date"
        v-model="date"
      />
      <div :class="$style.categoryControl">
        <select :class="$style.select" v-model="category">
          <option
            v-for="category of categoryList"
            :value="category"
            :key="category"
          >
            {{ category }}
          </option>
        </select>
        <a
          :class="$style.addCategoryLink"
          @click="showAddCategoryForm = !showAddCategoryForm"
          >Add Category +</a
        >
      </div>
      <input
        :class="$style.input"
        type="text"
        placeholder="Value"
        v-model="value"
      />
      <div :class="$style.btn" @click="addPayment">Add</div>
      <router-link :class="$style.btn" to="/"> Close Form </router-link>
    </div>
    <div :class="$style.addCategory" v-show="showAddCategoryForm">
      <input
        :class="$style.input"
        type="text"
        v-model="newCategory"
        placeholder="New Category Name"
      />
      <div :class="$style.btn" @click="addNewCategory">Add or Close</div>
    </div>
  </div>
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
