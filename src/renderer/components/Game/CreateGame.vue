<template>
    <div class="create-game">
        <input type="number" v-model="length" min="5" max="10">
        <button @click="start">{{ $t('playGame.start') }}</button>
        <!-- <button @click="refesh">Refesh</button> -->
        <!-- <button v-if="playing" @click="save">{{ $t('playGame.save') }}</button> -->
    </div>
</template>
<script>
export default {
    name: 'create-game',
    props: {
        playing: {
            type: Boolean,
            default: true
        }
    },
    data: () => {
        return {
            length: 10
        }
    },
    methods: {
        start() {
            this.$emit('start', this.length)
        },
        refesh() {
            this.$emit('refesh')
        },
        save() {
            this.$emit('save')
        }
    }
}
</script>
<style>
    div.create-game {
        text-align: center;
    }

    div.create-game input[type=number] {
        font-size: 15px;
        outline: none;
        padding: 5px 10px;
        border: 2px solid #4d3c1d;
        border-radius: 10px;
        background: #ffcb6a;
        width: 50px;
    }

    div.create-game button {
        font-size: 15px;
        outline: none;
        padding: 5px 10px;
        border: 2px solid #4d3c1d;
        border-radius: 10px;
        background: #ffcb6a;
        cursor: pointer;
    }

    div.create-game button:hover {
        background: #4d3c1d;
        color: #FFF;
    }
</style>
