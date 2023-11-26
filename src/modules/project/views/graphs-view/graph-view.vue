<template>
  <div class="charts-container">
    <div ref="chart1" class="chart"></div>
    <div ref="chart2" class="chart"></div>
  </div>

  <div class="charts-container">
    <div ref="chart3" class="chart"></div>
</div>
</template>

<script>
import * as echarts from 'echarts';
import { pieChartCardStatusOptions, pieChartCardTypeOptions} from '@/modules/project/graphics/PieCharts';
import { barChartSpTagsOptions } from '@/modules/project/graphics/BarCharts';

export default {
  mounted() {
    this.renderChart('chart1', pieChartCardTypeOptions);
    this.renderChart('chart2', pieChartCardStatusOptions);
    this.renderChart('chart3', barChartSpTagsOptions)
  },
  methods: {
    renderChart(ref, chartData) {
      const chart = echarts.init(this.$refs[ref]);
      chart.setOption(chartData);
    },
  },
};
</script>

<style scoped>
.charts-container {
  display: flex;
  justify-content: space-around;
  margin: 30px 30px 30px 30px;
  background: white;
  title: 1.5rem;
}

.chart {
  width: 48%;  /* или другие значения, чтобы оставить место между графиками */
  height: 400px;
}
</style>
