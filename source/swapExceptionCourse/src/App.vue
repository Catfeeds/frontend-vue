<template>
  <div id="app">
    <Course/>
  </div>
</template>

<script>
import Course from './components/Course'

export default {
  name: 'App',
  components: {
    Course
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}
</style>
