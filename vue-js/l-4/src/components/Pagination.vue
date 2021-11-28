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
import { mapGetters } from "vuex";

export default {
  name: "Pagination",
  data() {
    return {
      isActive: 1,
    };
  },
  computed: {
    ...mapGetters({ pages: "paymentPages" }),
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
      if (this.isActive < this.pages) this.isActive += 1;
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