<template>
  <div class="pagination">
    <span @click="getPrevous">Previous</span>
    <span
      class="page"
      v-for="n in pages"
      :key="n"
      @click="selectPage(n)"
      :class="{ active: n == isActive }"
    >
      {{ n }}</span
    >
    <span @click="getNext">Next</span>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    length: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isActive: 1,
    };
  },
  computed: {
    pages() {
      return Math.ceil(this.length / 5);
    },
  },
  methods: {
    selectPage(page) {
      this.isActive = page;
      this.$emit("select-page", this.isActive);
    },
    getPrevous() {
      if (this.isActive > 1) this.isActive -= 1;
      this.selectPage(this.isActive);
    },
    getNext() {
      if (this.isActive < Math.ceil(this.length / 5)) this.isActive += 1;
      this.selectPage(this.isActive);
    },
  },
};
</script>

<style>
.pagination {
  margin-top: 20px;
}

.pagination span {
  font-weight: 600;
  cursor: pointer;
  padding: 0 10px;
}

.active {
  color: red;
}
</style>