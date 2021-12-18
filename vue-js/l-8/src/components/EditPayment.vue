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
        <v-text-field label="Value" v-model="value" name="value"></v-text-field>
        <v-btn
          id="addPayment"
          color="primary"
          elevation="2"
          tile
          align-self="center"
          block
          class="mb-4"
          @click="editPayment"
        >
          Save
        </v-btn>
      </div>
    </v-card>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "EditPayment",
  props: {
    item: {
      type: Object,
      default: () => { },
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