<template>
  <div id="app">
    <CustomerService/>
  </div>
</template>

<script>
import CustomerService from './components/CustomerService'

export default {
  name: 'App',
  components: {
    CustomerService
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
  height: 100%;
}
</style>
