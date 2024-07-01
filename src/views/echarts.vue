<script setup>
    import * as echarts from 'echarts';
    import { onMounted } from 'vue';
    import { ref } from 'vue';
    // 生成空对象
    const chart=ref(null);

    onMounted(()=>{
      // const myChart =echarts.init(document.querySelector('.base-chart-box'));
      const myChart=echarts.init(chart.value);
      myChart.setOption({
      title: {
        text: 'ECharts 入门示例',
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
        },
      ]
    })
  })
</script>
<template>
  <!-- echarts内容必须指定宽高 -->
  <!-- 通过ref标识绑定dom元素 -->
  <div ref="chart" class="base-chart-box">子组件</div>
</template>

<style scoped>
.base-chart-box {
  width: 400px;
  height: 300px;
  border: 3px solid #000;
  border-radius: 6px;
}
</style>