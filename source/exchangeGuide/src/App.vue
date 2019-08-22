<template>
  <div id="app">
    <ExchangeGuide/>
  </div>
</template>

<script>
import ExchangeGuide from './components/ExchangeGuide'

export default {
  name: 'App',
  components: {
    ExchangeGuide
  }
}
</script>

<style>
@import "../static/general.css";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
