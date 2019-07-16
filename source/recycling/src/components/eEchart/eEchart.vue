<template>
  <div>
    <!-- 只有dom 挂载数据  updated 生命钩子 才起作用 -->
    <div v-show="false">{{option}}</div>
    <div :id="'chart'+ id"  class="echartsHight chartHeight"></div>
  </div>
</template>

<script>
let id = 0;

let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')

export default {
  name: "ty-chart",
  props: ["option", "height"],
  data() {
    return {
      id,
      chart: {},
      echarts
    };
  },
  computed: {},
  created() {
    id++;
  },
  methods: {
    init() {
      let that = this;
      let dom = document.getElementById(`chart${this.id}`);
      // 把视图元素赋值 
      this.chart = echarts.init(dom)
      this.showLoading();
      window.addEventListener("resize", this.resize);
    },
    resize() {
      this.chart.resize();
    },
    setOption() {
      
      this.chart.setOption(this.option, true);
      this.chart.hideLoading();
      this.resize();
    },
    showLoading() {
      if (!this.chart) {
        return;
      }
      this.chart.showLoading();
    },
    //刷新视图
    refresh() {
      this.showLoading();
      this.setOption();
    },
    destroy() {
      
      this.chart.dispose();
      
      window.removeEventListener("resize", this.resize);
    }
  },
  // 更新之后会重新刷新视图
  updated() {
    var self = this;
    if (self.refresh) {
      self.refresh();
    }
  },
  mounted() {
    // 初始化视图
    this.init();
    if (this.option) {
      this.setOption();
    }
  },
  destroyed() {
    this.destroy();
  },
  // 页面销毁前要执行的操作
  deactivated() {
    
    if (!this.$store.state.cachePage.indexOf(this.$route.name)) {
      this.destroy();
    }
  }
};
</script>

<style scoped>
 .chartHeight{
   height: 512px;
 }
</style>
