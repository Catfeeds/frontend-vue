<template>
  <div id="app">
    <SelectUserType />
  </div>
</template>

<script>
    
import SelectUserType from './components/selectUserType'

export default {
  name: 'App',
  components: {
    SelectUserType
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
