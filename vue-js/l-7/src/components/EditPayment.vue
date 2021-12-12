<template>
  <div :class="$style.editForm">
    <input :class="$style.input" type="text" v-model="date" />
    <select :class="$style.select" v-model="category">
      <option
        v-for="category of categoryList"
        :value="category"
        :key="category"
      >
        {{ category }}
      </option>
    </select>
    <input :class="$style.input" type="text" v-model="value" />
    <div :class="$style.btn" @click="editPayment">Save</div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "EditPayment",
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      date: "",
      category: "",
      value: "",
    };
  },
  computed: {
    ...mapGetters(["categoryList"]),
  },
  methods: {
    ...mapActions(["fetchCategoryListData"]),
    ...mapMutations({ updatePayment: "UPDATE_PAYMENT_DATA" }),
    editPayment() {
      this.updatePayment({
        id: this.item.id,
        date: this.date,
        category: this.category,
        value: this.value,
      });
      this.$emit("close-edit");
    },
  },
  created() {
    this.date = this.item.date;
    this.category = this.item.category;
    this.value = this.item.value;
    this.fetchCategoryListData();
  },
};
</script>

<style lang="scss" module>
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

.editForm {
  padding: 10px;
  box-sizing: border-box;
}
</style>