<template>
  <div id="app">
    <Activity/>
  </div>
</template>

<script>
import Activity from './components/1111Activity'

export default {
  name: 'App',
  components: {
    Activity
  },
  mounted () {
  //  console.log('app mounted'); 
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
