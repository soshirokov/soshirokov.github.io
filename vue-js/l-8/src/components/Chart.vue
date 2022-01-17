<template>
  <div class="chart__wrap">
    <div class="chart__block">
      <TrendChart
        v-if="showChart"
        :datasets="[
          {
            data: items,
            smooth: true,
            fill: true,
          },
        ]"
        :grid="{
          verticalLines: false,
          horizontalLines: false,
        }"
        :labels="{
          xLabels: chartLabels,
          yLabels: 5,
        }"
        :min="0"
      ></TrendChart>
      <div class="chart__error" v-if="!showChart">
        В списке должно быть более 1 записи
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Chart',
  props: {
    items: {
      type: Array,
      default: () => { }
    }
  },
  computed: {
    chartLabels() {
      if (this.showChart) return this.items.map(({ date }) => date);
      return [];
    },
    showChart() {
      if (this.items && this.items.length > 1) { return true; }
      return false;
    }
  }
}
</script>

<style>
.chart__wrap {
  height: 100%;
  display: flex;
  align-items: center;
}

.chart__block {
  width: 100%;
}

.chart__block .fill {
  fill: rgba(48, 207, 202, 0.3);
}

.chart__block .stroke {
  stroke: rgb(48, 207, 202);
}
</style>