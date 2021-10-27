<template>
    <div class="toolbar">
        <button @click="shuffle">shuffle</button>
        <button @click="$emit('step')">step</button>
        <button @click="$emit('play')">play</button>
        <input @input="sliderUpdate" type="range" min="10" max="600" value="200">

    </div>
</template>

<script>
    export default {
        name: "ToolBar",
        components: {

        },
        data () {
            return {

            } 
        },
        computed: {

        },
        methods: {
            shuffle () {
                this.$emit('shuffle')
            },
            sliderUpdate (event) {
                this.$emit('delay', event.target.value)
            }
        }    
    }
</script>

<style scoped lang="scss">
    .toolbar {
        display: flex;
    }
</style>