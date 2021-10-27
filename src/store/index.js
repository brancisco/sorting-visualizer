import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const initializeState = () => {
    return {
        delay: 80,
        numberDataPoints: 30,
        data: [],
        play: false,
        algorithms: [
            {
                component: 'merge-sort',
                name: 'Merge Sort',
            },
            {
                component: 'bubble-sort',
                name: 'Bubble Sort',
            },
        ],
        algorithmSelection: 0,
        width: window.innerWidth,
        height: window.innerHeight,
    }
}

export default new Vuex.Store({
    state: initializeState(),
    mutations: {
        setDelay (state, delay) {
            state.delay = delay 
        },
        setNDataPoints (state, n) {
            state.numberDataPoints = n
        },
        setData (state, data) {
            state.data = data
        },
        setPlay (state, play) {
            state.play = !!play
        },
        setAlgorithmSelection (state, selection) {
            state.algorithmSelection = selection
        },
        setWidth (state, width) {
            state.width = width
        },
        setHeight (state, height) {
            state.height = height
        }
    }
})