<template>
    <div class="save-list">
        <div class="save-form">
            <a @click="removeAll"><font-awesome-icon icon="trash" /> <span>{{ $t('saveGame.removeAll') }}</span></a>
        </div>
        <div class="save-files">
            <div v-for="save in saveList">
                <span>{{ save.name }}</span>
                <div class="save-btn-group">
                    <a @click="deleteSave(save.id)"><font-awesome-icon icon="trash" /></a>
                    <router-link :to="{ name: 'run-game', query: {save_id: save.id}}"><font-awesome-icon icon="folder-open" /></router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'save-list',
    data: () => {
        return {
            saveList: []
        }
    },
    created() {
        this.$store.dispatch('Game/setTab', 'saveGame', {root: true})
        this.saveList = this.electronStore.get('app.saved');
    },
    methods: {
        loadGame(game) {

        },
        deleteSave(id) {
            let saves = this.electronStore.get('app.saved');
            let saveData = saves.filter((save) => save.id != id);
            this.electronStore.set('app.saved', saveData)
            this.saveList = saveData
        },
        removeAll() {
            this.electronStore.set('app.saved', [])
            this.electronStore.set('app.index', 0)
            this.saveList = []
        }
    }
}
</script>
<style scoped>
    .save-list .save-files > div {
        margin: 5px 10px;
        padding: 5px 10px;
        font-size: 12px;
        color: #333;
        border: 2px solid #333;
        background: #d6a955;
        border-radius: 50px;
        overflow: hidden;
    }

    .save-list .save-files div a {
        color: #333;
        text-decoration: none;
        cursor: pointer;
    }

    .save-list .save-files div a:hover {
        color: #FFF;
    }

    .save-list .save-files div > span {
        float: left;
    }

    .save-list .save-files div .save-btn-group {
        float: right;
    }

    .save-list .save-form {
        text-align: right;
        padding: 15px;
        border-bottom: 1px solid #ccc;
    }

    .save-list .save-form a {
        padding: 5px 10px;
        border: 1px solid #333;
        cursor: pointer;
        border-radius: 10px;
    }

    .save-list .save-form a span {
        display: none;
        font-size: 14px;
    }

    .save-list .save-form a:hover span {
        display: inline;
    }

</style>
