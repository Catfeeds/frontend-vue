<template>
  <div id="app">
    <LightStation/>
  </div>
</template>

<script>
import LightStation from './components/LightStation'

export default {
  name: 'App',
  components: {
    LightStation
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
