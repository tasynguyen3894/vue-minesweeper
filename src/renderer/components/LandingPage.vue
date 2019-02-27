<template>
  <div id="wrapper">
    <button @click="refeshGame">Refesh</button>
    <router-link :to="{ name: 'run-game'}">Run game</router-link>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'
  import Map from './Game/Map'

  export default {
    name: 'landing-page',
    components: { SystemInformation, Map },
    methods: {
      open (link) {
        require('electron').shell.openExternal(link)
      },
      refeshGame() {
        this.$refs.mapGame.initMap();
      }
    }
  }
</script>

<style>
</style>
