<template>
    <div class="map" v-bind:style="mapStyle">
        <div class="map-overlay"  v-bind:style="overlayStyle" v-if="showOverlay">

        </div>
        <template v-for="rowInfo in cellInfos">
            <cell v-on:flag="flagCell" v-on:click_cell="openCell" v-for="cell in rowInfo" :info="cell"></cell>
        </template>
    </div>
</template>
<script>
import Cell from './Cell'

export default {
    data: () => {
        return {
            lengthCell: 10,
            cellInfos: [],
            mines: {
                number: 10,
                location: {}
            },
            cellBeOpened: 0,
            showOverlay: false
        }
    },
    created() {
        this.initMap(this.lengthCell)
    },
    computed: {
        mapStyle() {
            return {
                width: this.lengthCell*30 + 'px', 
                height: this.lengthCell*30 + 'px'
            }
        },
        overlayStyle() {
            return {
                width: this.lengthCell*30 + 'px', 
                height: this.lengthCell*30 + 'px'
            }
        }
    },
    methods: {
        initMap(lenght) {
            let randMine = [];
            let xRandom, yRandom, locationText;
            this.cellInfos = [],
            this.lengthCell = lenght
            this.showOverlay = false
            this.mines = {
                number: Math.ceil(this.lengthCell * this.lengthCell / 10),
                location: {}
            }
            this.cellBeOpened = 0
            while (randMine.length < this.mines.number) {
                xRandom = Math.floor(Math.random() * (this.lengthCell - 2));
                yRandom = Math.floor(Math.random() * (this.lengthCell - 2));
                locationText = xRandom.toString() + yRandom.toString();
                if(randMine.indexOf(locationText) <= -1) {
                    this.mines.location[locationText] = {x: xRandom, y: yRandom};
                    randMine.push(locationText)
                }
            }
            this.cellInfos = Array.from(Array(this.lengthCell), (valueRow, indexRow) => {
                return Array.from(Array(this.lengthCell), (value, index) => {
                        locationText = index.toString() + indexRow.toString();
                        let text = randMine.indexOf(locationText) > -1 ? 'B' : '0'
                        let x = index, y = indexRow;
                        let numberMineAround = 0;
                        if(text != 'B') {
                            text = ''
                            for(let i = x - 1; i <= x + 1; i++) {
                                for(let j = y - 1; j <= y + 1; j++) {
                                    // if(j != i) {
                                        if(randMine.indexOf((i).toString() + (j).toString()) > - 1) {
                                            numberMineAround++;
                                        }
                                    // }
                                }
                            }
                            text += numberMineAround
                        }
                        return {text: text, status: 'close', x: x, y: y, isFlag: false}
                    });
            });
            
        },
        createMap(data) {
            this.lengthCell = data.lenght,
            this.cellInfos = data.cellInfos
            this.mines = data.mines
            this.cellBeOpened = data.cellBeOpened
        },
        openCell(cell) {
            if(this.cellInfos[cell.y][cell.x].status != 'open') {
                this.eventBus.$emit('playing', true)
                this.cellInfos[cell.y][cell.x].status = 'open'
                if(this.cellInfos[cell.y][cell.x].text == 'B') {
                    this.showOverlay = true
                    this.$emit('end_game', false)
                    this.eventBus.$emit('playing', false)
                    this.openAllMine()
                } else {
                    this.cellBeOpened++
                    if(this.cellBeOpened ==  this.lengthCell * this.lengthCell - this.mines.number) {
                        this.showOverlay = true
                        this.$emit('end_game', true)
                        this.eventBus.$emit('playing', false)
                    } else {
                        if(cell.text == '0') {   
                            this.updateAroundCell(cell)
                        }
                    }
                }
            }
        },
        updateAroundCell(cell) {
            for(let i = (cell.x > 0 ? cell.x - 1 : cell.x); i <= (cell.x < this.lengthCell - 1 ? cell.x + 1 : cell.x); i++) {
                for(let j =  (cell.y > 0 ? cell.y - 1 : cell.y); j <= (cell.y < this.lengthCell - 1 ? cell.y + 1 : cell.y); j++) {
                    this.openCell(this.cellInfos[j][i])
                }
            }
        },
        flagCell(cell) {
            this.cellInfos[cell.y][cell.x].isFlag = !this.cellInfos[cell.y][cell.x].isFlag
        },
        openAllMine() {
            Object.keys(this.mines.location).forEach((key) => {
                let mine = this.mines.location[key];
                this.cellInfos[mine.y][mine.x].status = 'open'
            })
        },
        getCurrentData() {
            return {
                lengthCell: this.lengthCell,
                cellInfos: this.cellInfos,
                mines: this.mines,
                cellBeOpened: this.cellBeOpened
            }
        }
    },
    components: {
        Cell
    }
}
</script>
<style scoped>
    div.map {
        position: relative;
        display: flex;
        width: 300px;
        height: 300px;
        margin: 20px auto;
        background: url('../../assets/map.jpg') no-repeat center;
        background-size: cover;

    }

    div.map div.map-overlay {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 7;
        background: #333;
        opacity: 0.3;
    }
</style>
