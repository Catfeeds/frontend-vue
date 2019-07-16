<template>
  <div id="app">
    <Recycling/>
  </div>
</template>

<script>
import Recycling from './components/Recycling'

export default {
  name: 'App',
  components: {
    Recycling
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
