<template>
    <div class="cell" 
        v-bind:class="{flag: info.isFlag, [info.status]: true, ['value-' + info.text]: (info.status != 'close')}"
        @click.right="flagCell"
        @click.left="openCell" 
        v-bind:style="{ left: (info.x * 30) + 'px', top: (info.y * 30) + 'px', }" v-html="showText">
    </div>
</template>
<script>
export default {
    props: {
        info: {
            type: Object,
            required: true,
            default: {
                text: '',
                status: 'close',
                x: 0,
                y: 0,
                isFlag: false
            }
        }
    },
    methods: {
        openCell: function() {
            this.$emit('click_cell', this.info)
        },
        flagCell: function() {
            this.$emit('flag', this.info)
        }
    },
    computed: {
        showText() {
            if(this.info.isFlag && this.info.status == 'close') {
                return '<img src="' + require('../../assets/flag.png') + '" height=29 width=29 />'
            }
            if(this.info.status == 'open') {
                if(this.info.text == 'B') {
                    return '<img src="' + require('../../assets/mine.png') + '" height=29 width=29 />'
                }
                if(this.info.text == '0')
                    return ''
                return '<span>' + this.info.text + '</span>'
            }
        }
    }
}
</script>
<style scoped>
    div.cell {
        height: 30px;
        width: 30px;
        position: absolute;
        border: 1px solid #333;
        box-sizing: border-box;
        backface-visibility: hidden;
        cursor: pointer;
        background: #ccc;
        font-family: Arial, Helvetica, sans-serif;
        text-align: center;
        
    }

    div.cell >>> span {
        padding-top: 4px;
        display: inline-block;
    }

    div.cell.close:hover {
        background: #333;
        color: #FFF;
        opacity: 0.7;
    }

    div.cell.open {
        color: #FFF;
    }

    div.cell.close {
        opacity: 0.7;
    }

    div.cell.close.flag {
        opacity: 1;
    }

    div.cell.open.value-B {
        background: #333;
    }

    div.cell.open.value-0 {
        opacity: 0.7;
        background: #ffcb6a;
    }  
    div.cell.open.value-1 {
        background: #e3b35a;
    }  
    div.cell.open.value-2 {
        background: #d6a955;
    }  
    div.cell.open.value-3 {
        background: #b89a5a;
    }  
    div.cell.open.value-4 {
        background: #b89045;
    }  
    div.cell.open.value-5 {
        background: #ab8640;
    }  
    div.cell.open.value-6 {
        background: #967538;
    }  
    div.cell.open.value-7 {
        background: #7d622f;
    }  
    div.cell.open.value-7 {
        background: #4d3c1d;
    }
</style>
