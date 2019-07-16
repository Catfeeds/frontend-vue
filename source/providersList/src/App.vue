<template>
  <div id="app">
    <ProviderList/>
  </div>
</template>

<script>
import ProviderList from './components/ProviderList'

export default {
  name: 'App',
  components: {
    ProviderList
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
