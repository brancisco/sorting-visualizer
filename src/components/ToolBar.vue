<template>
    <div class="toolbar">
        <div class="side-menu">
            <button @click="handleShuffle">Shuffle</button>
            <div>
                <label>
                    <span>N Data Points</span>
                    <input @input="handleNSlider" type="range" min="5" max="100" value="30">
                </label>
            </div>
        </div>
        <div id="center-menu">
            <button class="playbutton" :class="{'pause' : play, 'play': !play }"
                @click="handlePlay"></button>
        </div>
        <div class="side-menu">
            <button @click="handleStep" :disabled="play">Step</button>
            <div>
                <label>
                    <span>Speed (ms)</span>
                    <input @input="handleDelaySlider" type="range" min="10" max="600" :value="delay">
                </label>
            </div>
        </div>
        <select id="algorithm-selector"
            @input="handleAlgoSelection"
        >
            <option v-for="(algorithm, i) in algorithms"
                :key="algorithm.name"
                :value="i"
                class="algo-item"
            >
                {{algorithm.name}}
            </option>
        </select>
        <a href="https://github.com/brancisco/sorting-visualizer#sorting-visualizer">
            <div id="more_info">?</div>
        </a>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: "ToolBar",
        components: {

        },
        data () {
            return {

            } 
        },
        computed: {
            ...mapState({
                delay: 'delay',
                n: 'numberDataPoints',
                play: 'play',
                algorithms: 'algorithms',
                selection: 'algorithmSelection',
                width: 'width',
            })
        },
        methods: {
            handleShuffle () {
                this.$emit('shuffle')
            },
            handleStep () {
                this.$emit('step')
            },
            handlePlay () {
                this.$store.commit('setPlay', !this.play)
            },
            handleDelaySlider (event) {
                this.$store.commit('setDelay', parseFloat(event.target.value))
            },
            handleNSlider () {
                this.$store.commit('setNDataPoints', parseFloat(event.target.value))
            },
            handleAlgoSelection (event) {
                this.$store.commit('setAlgorithmSelection', parseFloat(event.target.value))
            }
        }    
    }
</script>

<style scoped lang="scss">
    .toolbar {
        position: relative;
        height: 80px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.23);
        background: #2C3A47;
        color: white;
        padding: 10px 10px;

        #center-menu {
            flex: 1 1 33%;
            text-align: center;
        }

        .side-menu {
            text-align: center;
            flex: 1 1 33%;

            button {
                margin-bottom: 10px;
            }
        }

        #algorithm-selector {
            position: fixed;
            top: 120px;
            right: 20px;
            min-width: 130px;
        }

        #more_info {
            position: fixed;
            top: 150px;
            right: 20px;
            width: 40px;
            height: 40px;
            font-size: 1.2rem;
            background-color: white;
            box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.23);
            border-radius: 50%;
            text-align: center;
            color: black;
            line-height: 40px;
            cursor: pointer;
        }
    }

    button {
        cursor: pointer;
        background: #9AECDB;
        border: 0;
        border-radius: 4px;
        width: 90px;
        height: 25px;
    }

    .playbutton {
        width: 60px;
        height: 60px;
        border: 0;
        border-radius: 50%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.23);
        &.play {
            background-image: url("@/assets/play-button.png");
        }
        &.pause {
            background-image: url("@/assets/pause-button.png");
        }
    }

    @media only screen and (max-width: 500px) {
        .toolbar {
            height: 80px;
            padding: 10px 10px;
            position: absolute;
            bottom: 0;
            left: 0;

            #center-menu {
                flex: 1 1 25%;
                text-align: center;
            }

            .side-menu {
                text-align: center;
                flex: 1 1 37.5%;
            }

            #algorithm-selector {
                position: fixed;
                top: 20px;
                right: 20px;
            }

            #more_info {
                position: fixed;
                top: 50px;
                right: 20px;
                opacity: 0.5;
            }
        }
    }
</style>