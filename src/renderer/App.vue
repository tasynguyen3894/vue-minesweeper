<template>
  <div id="app">
    <game-header></game-header>
    <router-view></router-view>
    <game-footer></game-footer>
  </div>
</template>

<script>
  import GameHeader from './components/Layouts/GameHeader'
  import GameFooter from './components/Layouts/GameFooter'
  
  export default {
    name: 'vue-mines',
    components: {
      GameHeader, GameFooter
    }
  }
</script>

<style>
  body {
    margin: 0px;
    font-family: Arial, Helvetica, sans-serif;
  }
</style>
