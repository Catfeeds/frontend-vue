<template>
  <div id="app">
    <RidingLeaderboard/>
    <router-view></router-view>
  </div>
</template>

<script>
import RidingLeaderboard from './components/RidingLeaderboard'

export default {
  name: 'App',
  components: {
    RidingLeaderboard
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
