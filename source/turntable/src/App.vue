<template>
  <div id="app">
    <LotteryActivity/>
  </div>
</template>

<script>

import LotteryActivity from './components/LotteryActivity'

export default {
  name: 'App',
  components: {
    LotteryActivity
  }
}
</script>

<style>
@import "./lib/css/general.css";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background:linear-gradient(180deg,rgba(86,20,133,1) 0%,rgba(51,12,80,1) 22%,rgba(74,1,112,1) 50%,rgba(66,4,102,1) 87%,rgba(61,5,95,1) 100%);
}
</style>
