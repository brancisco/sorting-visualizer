<template>
    <svg id="sortable" ></svg>
</template>

<script>
    import BubbleSort from '@/sorting-algorithms/BubbleSort.js'
    import { mapState } from 'vuex'

    export default {
        name: "BubbleSort",
        components: {

        },
        data () {
            return {
                algorithm: new BubbleSort([]),
                svg: null,
                toy: [],
            }  
        },
        watch: {
            toy () {
                this.draw()
            },
            play () {
                if (this.play) {
                    this.autoStep()
                }
            },
            n () {
                this.generateNewData()
            }
        },
        computed: {
            ...mapState({
                delay: 'delay',
                n: 'numberDataPoints',
                play: 'play',
                height: 'height',
                width: 'width',
            }),
            barHeight () {
                return (this.height - 100) / this.n
            }
        },
        methods: {
            generateNewData () {
                const toy = []
                for (let i = 1; i <= this.n; i ++) {
                    const normal = this.$d3.randomNormal((i/this.n), 0.1)
                    toy.push({
                        id: i,
                        value: Math.min(Math.abs(normal()), 1)*89
                    })
                }
                this.toy = toy
                this.shuffle()
                this.draw()
            },
            draw () {
                this.svg
                    .selectAll("rect")
                    .data(this.toy)
                    .join('rect')
                        .classed('playing', this.play)
                        .classed('bubblebar', true)
                        .classed('bubblecurrent', (d, i) => i === this.algorithm.index)
                        .classed('bubblesorted', this.algorithm.sorted)
                        .attr("x", 0)
                        .attr("y", (d, i) => i*this.barHeight)
                        .attr("height", this.barHeight - 1)
                        .attr("width", d => `${d.value}%`)
            },
            shuffle () {
                this.toy = this.$d3.shuffle(this.toy.slice())
                this.algorithm.setData(this.toy)
            },
            step () {
                this.algorithm.step()
                this.toy = this.algorithm.data.slice()
                if (this.algorithm.sorted) {
                    this.$store.commit('setPlay', false)
                }
            },
            autoStep () {
                this.step()
                setTimeout(() => {
                    if (this.play)
                        this.autoStep()
                }, this.delay)
            },
        },
        mounted () {
            this.$d3FinishedLoading.then(() => {
                this.svg = this.$d3.select('#sortable')
                    .append('g')
                    .attr("class", "bars")
                this.generateNewData()
            })
        }   
    }
</script>

<style lang="scss">
    svg {
        width: 100vw;
        height: calc(100vh - 100px);
        height: calc((var(--vh, 1vh) * 100) - 100px);
    }
    .playing.bubblebar {
        transition: width 0.3s ease;
    }
    
    .bubblebar {
        transition: all 0.6s ease;
        fill: #1B9CFC;
    }

    .bubblecurrent {
        fill: #FC427B;
    }

    .bubblesorted {
        transition: fill 1.5s;
        fill: #55E6C1;
    }

    // @media only screen and (max-width: 500px) {
    //     svg {
    //         height: calc(100vh - 100px);
    //         height: calc((var(--vh, 1vh) * 100) - 100px);
    //     }
    // }
</style>