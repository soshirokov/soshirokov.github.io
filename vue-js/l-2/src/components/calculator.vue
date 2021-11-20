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
    <div class="showKeyBoard">
      <label for="showKeys"
        ><input
          type="checkbox"
          name="showKeys"
          id="showKeys"
          v-model="showKeys"
        />
        Показать клавиатуру</label
      >
    </div>
    <div class="keyboard" v-show="showKeys">
      <div
        class="button"
        v-for="btn of keyboard"
        :key="btn"
        @click="btnPush(btn)"
      >
        {{ btn }}
      </div>
      <div class="selectInput">
        <input
          type="radio"
          name="input"
          id="inputA"
          value="1"
          v-model="changeField"
        /><label for="inputA">Первое поле</label>
        <input
          type="radio"
          name="input"
          id="inputB"
          value="2"
          v-model="changeField"
        /><label for="inputA">Второе поле</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "calculator",
  data: () => ({
    result: 0,
    first: 0,
    second: 0,
    showKeys: false,
    keyboard: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "<-"],
    changeField: 1,
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
    btnPush(btn) {
      if (this.changeField == 1) {
        if (btn == "<-") {
          this.first = Math.trunc(this.first / 10);
          return;
        }
        this.first = this.first * 10 + btn;
      } else {
        if (btn == "<-") {
          this.second = Math.trunc(this.second / 10);
          return;
        }
        this.second = this.second * 10 + btn;
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
  cursor: pointer;
}

.result {
  margin-top: 20px;
  font-weight: 600;
}

.keyboard {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  flex-wrap: wrap;
}

.selectInput {
  width: 100%;
  margin-top: 20px;
}
</style>