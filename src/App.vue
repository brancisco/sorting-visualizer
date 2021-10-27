<template>
    <div>
        <tool-bar
            @shuffle="handleShuffle"
            @step="handleStep"
        ></tool-bar>
        <component ref="sortComponent" :is="dyanmicComponet"></component>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import ToolBar from '@/components/ToolBar'
    import BubbleSort from '@/components/BubbleSort'
    import MergeSort from '@/components/MergeSort'
    export default {
        name: "App",
        components: {
            ToolBar,
            BubbleSort,
            MergeSort
        },
        data () {
            return {
            } 
        },
        computed: {
            ...mapState({
                algorithms: 'algorithms',
                selection: 'algorithmSelection',
            }),
            dyanmicComponet () {
                return this.algorithms[this.selection].component
            }
        },
        methods: {
            handleShuffle () {
                this.$refs.sortComponent.shuffle()
            },
            handleStep () {
                this.$refs.sortComponent.step()
            },
            storeWindowSize () {
                this.$store.commit('setWidth', window.innerWidth)
                this.$store.commit('setHeight', window.innerHeight)
                let vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            }
        },
        mounted () {
            window.addEventListener('resize', this.storeWindowSize)
        },
        destroyed () {
            window.removeEventListener('resize', this.storeWindowSize)
        }
    }
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
    html, body {
        font-family: 'Roboto', sans-serif;
        margin: 0;
        padding: 0;
        width: 100vw;
        height: 100vh;
        height: calc(var(--vh, 1vh) * 100);
    }
</style>