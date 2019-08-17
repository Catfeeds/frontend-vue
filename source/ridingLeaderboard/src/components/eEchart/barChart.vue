<template>
  <div class="bgcolor">
    <eEchart :option="option"></eEchart>
  </div>
</template>
<script>

let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/bar");
import eEchart from "./eEchart";

export default {
  name: "barChart",
  props: ["xData", "yData"],
  data() {
    return {
      option: {
        backgroundColor: "#fff",
        grid: {
          top: "30px",
          right: "30px",
          left: "62px",
          bottom: "24px"
        },
        xAxis: [
          {
            type: "category",
            color: "#999",
            data: [],
            axisTick: {
              show: false
            },
            axisPointer: {
              type: "line"
            },
            axisLine: {
              lineStyle: {
                color: "#E8F0E3",
                type: "dotted"
              }
            },
            axisLabel: {
              margin: 10,
              color: "#999",
              textStyle: {
                fontSize: 10
              }
            }
          }
        ],
        yAxis: [
          {
            axisTick: {
              show: false
            },
            axisLabel: {
              color: "#999",
              textStyle: {
                fontSize: 10
              }
            },
            axisLine: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: "#E8F0E3",
                type: "dotted"
              }
            }
          }
        ],
        series: [
          {
            type: "bar",
            data: [],
            barWidth: "6px",
            itemStyle: {
              normal: {
                color:'#66C990',
                barBorderRadius: 6,
              },
            },
          }
        ]
      }
    };
  },
  watch: {
    xData: function(val) {
      this.setBarData();
    },
    yData: function(val) {
      this.setBarData();
    }
  },
  methods: {
    setBarData() {
      this.option.xAxis[0].data = this.xData;
      this.option.series[0].data = this.yData;
    }
  },
  mounted() {
    this.setBarData();
  },
  components: {
    eEchart
  }
};
</script>
<style lang="css" scoped>
.bgcolor {
  background: #fff;
}
</style>
