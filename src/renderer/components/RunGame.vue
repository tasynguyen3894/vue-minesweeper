<template>
    <div>
        <div class="map-game" v-bind:style="mapGameStyle">
            <div class="game-result-overlay" v-if="message != ''">
                <div v-bind:class="{[gameResult]: true, 'game-result-content': true}">
                    <div class="game-result-text">
                        <span class="game-result-exit" @click="closeResult">&times</span>
                        <span class="game-result-message" v-text="message == 'win' ? $t('playGame.win') : $t('playGame.lose')"></span>
                    </div>
                </div>
            </div>
            <Map v-on:end_game="endGame" ref="mapGame"></Map>
        </div>
        <div>
            <create-game v-bind:playing="message != '' ? false : true" v-on:start="start" v-on:refesh="refesh" v-on:save="save"></create-game>
        </div>
    </div>
</template>
<script>
import Map from './Game/Map'
import CreateGame from './Game/CreateGame'


export default {
    name: 'run-game',
    data: () => {
        return {
            lengthCell: 10,
            message: '',
            saveData: null,
            playing: false
        }
    },
    created() {
        this.$store.dispatch('Game/setTab', 'playGame', {root: true})
        this.eventBus.$on('save', this.save)
    },
    mounted() {
        let id = this.$route.query.save_id
        if(typeof Number(id) == 'number') {
            let saves = this.electronStore.get('app.saved');
            let saveData = saves.filter((save) => save.id == id);
            if(saveData.length > 0) {
                this.lengthCell = saveData[0].data.lengthCell
                this.$refs.mapGame.createMap(saveData[0].data);
            }
        }
    },
    components: {
        Map, CreateGame
    },
    computed: {
        gameResult() {
            return this.message
        },
        mapGameStyle() {
            return {'padding': (150 - this.lengthCell*15) + 'px 0px'}
        }
    },
    methods: {
        start(length) {
            this.message = ''
            length = Number(length)
            this.lengthCell = length
            this.$refs.mapGame.initMap(length);
        },
        refesh() {
            this.message = ''
            this.$refs.mapGame.initMap(this.lengthCell);
        },
        endGame(isWin) {
            this.message = isWin ? 'win' : 'lose'
        },
        closeResult() {
            this.message = ''
        },
        save() {
            this.saveData = this.$refs.mapGame.getCurrentData()
            let saved = this.electronStore.get('app.saved');
            let index = this.electronStore.get('app.index');
            let saveName = ''
            // let name = this.saveData.length
            if(typeof index == 'undefined') {
                this.electronStore.set('app.index', 0)
                index = 0
            }

            if(typeof saved == 'undefined') {
                saved = []
            }
            index++
            saveName = '(' + this.lengthCell + 'x' + this.lengthCell + ' ) ' + (new Date().toLocaleString())
            saved.push({
                id: index,
                name: saveName,
                data: this.saveData
            })
            this.electronStore.set('app.saved', saved)
            this.electronStore.set('app.index', index)
        },
        loadData() {
            this.$refs.mapGame.createMap(this.saveData)
        }
    }
}
</script>
<style scoped>
    div.map-game  {
        position: relative;
    }
    
    div.map-game div.game-result-overlay {
        width: 100%;
        height: 300px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 8;
    }

    div.map-game div.game-result-overlay .game-result-content {
        text-align: center;
        width: 128px;
        height: 128px;
        margin: 100px auto;
        border: 5px solid #ccc;
        border-radius: 10px;
    }

    div.map-game div.game-result-overlay .game-result-content.win {
        background: url('../assets/win.png') no-repeat center;
        background-size: cover;
    }

    div.map-game div.game-result-overlay .game-result-content.lose {
        background: url('../assets/lose.png') no-repeat center;
        background-size: cover;
    }

    div.map-game div.game-result-overlay .game-result-content .game-result-text {
        height: 128px;
        background: rgba(0, 0, 0, 0.3);
        color: #FFF;
        position: relative;
    }

    div.map-game div.game-result-overlay .game-result-content .game-result-text .game-result-message {
        margin-top: 50px;
        font-size: 20px;
        display: inline-block;
    }

    div.map-game div.game-result-overlay .game-result-content .game-result-text .game-result-exit {
        position: absolute;
        top: 0px;
        right: 0px;
        background: #ccc;
        color: #333;
        width: 20px;
        border-radius: 0px 0px 0px 5px;
        cursor: pointer;
    }
</style>
