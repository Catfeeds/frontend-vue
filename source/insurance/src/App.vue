<template>
  <div id="app">
    <Insurance/>
  </div>
</template>

<script>
	
import Insurance from './components/Insurance'

export default {
  name: 'App',
  components: {
    Insurance
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
}
</style>
