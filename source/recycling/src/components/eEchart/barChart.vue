<template>
  <div class="bgcolor">
    <eEchart :option="option"></eEchart>
  </div>
</template>
<script>

var minIndex = 5;
var maxIndex = 0;

let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require('echarts/lib/chart/bar')
import eEchart from "./eEchart";

export default {
  name: "barChart",
  props: ["xData", "yData"],
  data() {
    return {
      option: {
        backgroundColor: "#fff",
        grid: {
          top: '60px',
          right: '30px',
          left: '62px',
          bottom: "24px"
        },
        xAxis: [
          {
            type: "category",
            color: "#999",
            data: [],
            axisTick: {
              show: false,
            },
            axisPointer: {
              type: "line"
            },
            axisLine: {
              lineStyle: {
                color: "#E8F0E3",
                type:"dotted"
              }
            },
            axisLabel: {
              margin: 10,
              color: "#999",
              textStyle: {
                fontSize: 12
              }
            }
          }
        ],
        yAxis: [
          {
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: "#999"
            },
            axisLine: {
              show: false,
            },
            splitLine: {
              lineStyle: {
                color: "#E8F0E3",
                type:"dotted"
              }
            }
          }
        ],
        series: [
          {
            type: "bar",
            data: [],
            barWidth: "14px",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#FFBB4B" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#FF8D59" // 100% 处的颜色
                    }
                  ],
                  false
                ),
                barBorderRadius: [30, 30, 30, 30],
                shadowColor: "rgba(0,255,225,1)",
              }
            },
            label: {
              normal: {
                show: true,
                lineHeight: 30,
                width: 80,
                height: 30,
                backgroundColor: "rgba(243,136,94, 0.1)",
                distance: 1,
                color: '#F38154',
                position: ['-12','-40'],
                formatter: function(param){
                  if(param.dataIndex == maxIndex){
                    return "最高" + param.data;
                  }
                  else if(param.dataIndex == minIndex){
                    return "最低" + param.data;
                  }
                  return "";
                },
              }
            }
          }
        ]
      }
    };
  },
  watch: {
    xData: function(val){
      this.setBarData();
    },
    yData: function(val){
      this.setBarData();
    }
  },
  methods: {
    setBarData() {
      this.option.xAxis[0].data = this.xData;
      this.option.series[0].data = this.yData;
    },
    getMinIndex: function(){
      var minValue = 0;
      var minIndex = 0;
      for (let index = 0; index < this.yData.length; index++) {
        const element = this.yData[index];
        if(index == 0){
          minValue = element;
        }
        if(element <  minValue){
          minValue = element;
          minIndex = index;
        }
      }
      return minIndex;
    },
    getMaxIndex: function(){
      var maxValue = 0;
      var maxIndex = 0;
      for (let index = 0; index < this.yData.length; index++) {
        const element = this.yData[index];
        if(index == 0){
          maxValue = element;
        }
        if(element >  maxValue){
          maxValue = element;
          maxIndex = index;
        }
      }
      return maxIndex;
    }
  },
  mounted() {
    maxIndex = this.getMaxIndex();
    minIndex = this.getMinIndex();
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
