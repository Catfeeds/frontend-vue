<template>
  <div id="app">
    <BuyingBatteries/>
  </div>
</template>

<script>
import BuyingBatteries from './components/BuyingBatteries'

export default {
  name: 'App',
  components: {
    BuyingBatteries
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
}

</style>
