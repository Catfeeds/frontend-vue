<template>
  <div id="app">
    <ConsumerGuide/>
  </div>
</template>

<script>
import ConsumerGuide from './components/ConsumerGuide'

export default {
  name: 'App',
  components: {
    ConsumerGuide
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
