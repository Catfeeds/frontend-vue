<template>
  <div id="app">
    <questionnaire/>
  </div>
</template>

<script>
import questionnaire from './components/questionnaire'

export default {
  name: 'App',
  components: {
    questionnaire
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
