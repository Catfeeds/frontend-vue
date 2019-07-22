<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'App',
  components:{

  },
  mounted(){
     $("input,select").blur(function(){
        setTimeout(function() {
                var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                window.scrollTo(0, Math.max(scrollHeight - 1, 0));
            }, 100);
      })
  }
}
</script>

<style>
@import "./lib/css/general.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family:SourceHanSansCN-Regular;
  /* text-align: center; */
  /* color: #2c3e50;
  background:linear-gradient(180deg,rgba(86,20,133,1) 0%,rgba(51,12,80,1) 22%,rgba(74,1,112,1) 50%,rgba(66,4,102,1) 87%,rgba(61,5,95,1) 100%); */
}
</style>
