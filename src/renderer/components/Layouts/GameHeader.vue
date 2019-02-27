<template>
    <div>
        <div class="game-header">
            <span class="toggle" v-show="subMenu.length > 0"  @click="toggleMenu" >
                <font-awesome-icon v-bind:icon="isShow ? 'times' : 'bars'"/>
            </span>
            <span class="title">Vue Mines</span>
            <span class="toggle-lang" @click="showLangSelect">
                {{ langNames[$i18n.locale] }}
            </span>
        </div>
        <div class="lang-change" v-show="showLang">
            <ul>
                <li @click="selectLang('en')">English</li>
                <li @click="selectLang('vi')">Tiếng Việt</li>
            </ul>
        </div>
        <div class="game-menu" v-show="isShow">
            <ul>
                <li v-for="menu in subMenu" @click="runFunction(menu.name)" v-if="menu.name == 'save' ? playing : true">
                    {{ $t('menu.' + $store.state.Game.tab + '.' + menu.name) }}
                </li>
            </ul>
        </div>
        <div class="overlay-menu" @click="isShow = false" v-show="isShow && subMenu.length > 0"></div>
    </div>
</template>
<script>
const remote = require('electron').remote

export default {
    name: 'game-header',
    data: () => {
        return {
            isShow: false,
            playing: false,
            showLang: false,
            langNames: {
                en: 'EN',
                vi: 'VI'
            }
        }
    },
    created() {
        this.eventBus.$on('playing', this.setPlaying)
    },
    computed: {
        subMenu() {
            return this.$store.state.Game.menu[this.$store.state.Game.tab]
        }
    },
    methods: {
        setPlaying(playing) {
            this.playing = playing
        },
        toggleMenu() {
            this.isShow = !this.isShow
            this.showLang = false
        },
        showLangSelect() {
            this.showLang = !this.showLang
            this.isShow = false
        },
        selectLang(lang) {
            this.$i18n.locale = lang
            this.isShow = false
            this.showLang = false
        },
        runFunction(name) {
            this.isShow = false
            switch (name) {
                case 'home':
                    this.$router.push({name: 'start-page'})
                    break;
                case 'load':
                    this.$router.push({name: 'save-list'})
                    break;
                case 'play':
                    this.$router.push({name: 'run-game'})
                    break;
                case 'save':
                    this.eventBus.$emit('save')
                    break;
                case 'quit':
                    remote.getCurrentWindow().close()
                    break;
                default:
                    break;
            }
        }
    }
}
</script>
<style scoped>
    * {
        position: relative;
    }

    .game-menu {
        position: absolute;
        background: #e3b35a;
        z-index: 10;
        width: 100%;
    }

    .overlay-menu {
        z-index: 9;
        position: absolute;
        width: 100%;
        height: 410px;
        background: rgba(0, 0, 0, 0.3);
    }

    .game-menu ul {
        list-style: none;
        margin: 0px;
        padding: 0px;
    }

    .game-menu ul li {
        border: 1px solid #FFF;
        color: #FFF;
        padding: 8px;
        text-align: center;
        cursor: pointer;
    }

    .game-menu ul li:hover {
        background: #333;
        color: #FFF;
    }

    .game-header {
        font-family: Arial, Helvetica, sans-serif;
        background: #e3b35a;
        padding: 10px;
        text-align: center;
        position: relative;
        border: 1px solid #FFF;
        box-sizing: border-box;
    }

    .game-header span.title {
        font-size: 19px;
        color: #333;
        text-decoration: none;
        cursor: pointer;
    }

    .game-header span.toggle {
        position: absolute;
        left: 0px;
        top: 0px;
        padding: 12px;
        width: 44px;
        height: 42px;
        color: #FFF;
        background: #333;
        cursor: pointer;
        display: inline-block;
        box-sizing: border-box;
    }

    .game-header .toggle-lang {
        position: absolute;
        right: 0px;
        top: 0px;
        padding: 12px;
        width: 44px;
        height: 42px;
        color: #FFF;
        background: #333;
        cursor: pointer;
        display: inline-block;
        box-sizing: border-box;
    }

    .lang-change {
        position: absolute;
        width: 100%;
        border: 1px solid #333;
        box-sizing: border-box;
        z-index: 10;
    }

    .lang-change ul {
        list-style: none;
        margin: 0px;
        padding: 0px;
    }

    .lang-change ul li {
        background: #333;
        color: #FFF;
        border: 1px solid #FFF;
        padding: 10px 15px;
        font-size: 13px;
        text-align: right;
        cursor: pointer;
    }

    .lang-change ul li:hover {
        background: #FFF;
        color: #333;
    }
</style>
