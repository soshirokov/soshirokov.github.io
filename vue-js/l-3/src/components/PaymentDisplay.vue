<template>
  <div class="costBlock">
    <table class="costList">
      <tr>
        <th class="cell">Date</th>
        <th class="cell">Category</th>
        <th class="cell">Value</th>
      </tr>
      <tr v-for="(item, index) in items" :key="index">
        <td class="cell">{{ item.date }}</td>
        <td class="cell">{{ item.category }}</td>
        <td class="cell">{{ item.value }}</td>
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
      required: true,
    },
    show: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss">
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
