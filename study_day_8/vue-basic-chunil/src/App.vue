<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <hello-vue :mamaString="momsMsg"/>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/>  -->
</template>

<script>
import HelloVue from './components/HelloVue.vue'

export default {
  name: 'App',
  components: {
    'hello-vue' : HelloVue
  },
  data:function(){
    return {
      momsMsg : 'hello little girl'
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
