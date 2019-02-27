<template>
    <div class="start-game">
        <div><router-link :to="{ name: 'run-game'}">{{ $t("startGame.play") }}</router-link></div>
        <div><router-link :to="{ name: 'save-list'}">{{ $t("startGame.save") }}</router-link></div>
        <div><a @click="quit">{{ $t("startGame.quit") }}</a></div>
    </div>
</template>
<script>
const remote = require('electron').remote

export default {
    name: 'start-game',
    created() {
        this.$store.dispatch('Game/setTab', 'startGame', {root: true})
    },
    methods: {
        quit() {
            remote.getCurrentWindow().close()
        }
    }
}
</script>
<style scoped>
    div.start-game div {
        margin: 25px auto;
        text-align: center;
    }

    div.start-game div:first-child {
        margin-top: 75px;
    }

    div.start-game div a {
        display: inline-block;
        padding: 10px 25px;
        color: #333;
        border: 3px solid #333;
        border-radius: 10px;
        text-align: center;
        text-decoration: none;
        background: #e3b35a;
        cursor: pointer;
    }

    div.start-game div a:hover {
        color: #FFF;
        background: #333;
    }
</style>

