<template>
  <div id="app">
    <Sucessfull/>
  </div>
</template>

<script>
import Sucessfull from './components/Sucessfull'

export default {
  name: 'App',
  components: {
    Sucessfull
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
