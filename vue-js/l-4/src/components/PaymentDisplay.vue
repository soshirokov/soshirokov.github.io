<template>
  <div :class="$style.costBlock">
    <table :class="$style.costList">
      <tr>
        <th :class="$style.cell">Date</th>
        <th :class="$style.cell">Category</th>
        <th :class="$style.cell">Value</th>
      </tr>
      <tr v-for="(item, index) in items" :key="index">
        <td :class="$style.cell">{{ item.date }}</td>
        <td :class="$style.cell">{{ item.category }}</td>
        <td :class="$style.cell">{{ item.value }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "PaymentDisplay",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    show: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" module>
.costBlock {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.costList {
  width: 400px;
}

.cell {
  padding: 5px 10px;
  border-bottom: 1px solid #d6d6d6;
}
</style>
