<template>
  <div class="addCost">
    <input class="input" type="text" placeholder="Date" v-model="date" />
    <input
      class="input"
      type="text"
      placeholder="Category"
      v-model="category"
    />
    <input class="input" type="text" placeholder="Value" v-model="value" />
    <div class="btn" @click="addPayment">Add</div>
  </div>
</template>

<script>
export default {
  name: "AddPaymentForm",
  data() {
    return {
      value: "",
      category: "",
      date: "",
    };
  },
  computed: {
    paymentDate() {
      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();

      return `${day}.${month}.${year}`;
    },
  },
  methods: {
    addPayment() {
      const { value, category, date } = this;
      const data = {
        value: +value,
        category,
        date: date || this.paymentDate,
      };

      this.$emit("add-payment", data);
    },
  },
};
</script>

<style lang="scss">
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
}
</style>
