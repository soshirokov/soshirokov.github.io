<template>
  <div class="calc-body">
    <input class="first input" name="first" v-model.number="first" />
    <input class="second input" name="second" v-model.number="second" />
    <div class="control">
      <div class="button sum" @click="sum">+</div>
      <div class="button sub" @click="sub">-</div>
      <div class="button dev" @click="div">/</div>
      <div class="button mult" @click="mult">*</div>
      <div class="button pow" @click="pow">x<sup>y</sup></div>
      <div class="button trunc" @click="trunc">trunc</div>
    </div>
    <div class="result">{{ result }}</div>
  </div>
</template>

<script>
export default {
  name: "calculator",
  data: () => ({
    result: 0,
    first: 0,
    second: 0,
  }),
  methods: {
    sum() {
      this.result = this.first + this.second;
    },
    sub() {
      this.result = this.first - this.second;
    },
    div() {
      if (this.second > 0) {
        this.result = this.first / this.second;
      } else {
        this.result = "На 0 делить нельзя";
      }
    },
    mult() {
      this.result = this.first * this.second;
    },
    pow() {
      this.result = Math.pow(this.first, this.second);
    },
    trunc() {
      if (this.second > 0) {
        this.result = Math.trunc(this.first / this.second);
      } else {
        this.result = "На 0 делить нельзя";
      }
    },
  },
};
</script>

<style lang="scss">
input {
  padding: 0 10px;
  line-height: 38px;
  height: 38px;
  border: 1px solid #6e6e6e;
}

.control {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.button {
  line-height: 38px;
  height: 38px;
  padding: 0 20px;
  margin: 0 10px;
  border: 1px solid #e6e6e6;
}

.result {
  margin-top: 20px;
  font-weight: 600;
}
</style>