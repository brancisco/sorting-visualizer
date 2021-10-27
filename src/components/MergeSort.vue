<template>
    <svg id="sortable" ></svg>
</template>

<script>
    import MergeSort from '@/sorting-algorithms/MergeSort.js'
    import { mapState } from 'vuex'

    export default {
        name: "MergeSort",
        components: {

        },
        data () {
            return {
                algorithm: new MergeSort([]),
                bars: null,
                barsMem: null,
                colorfn: null,
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
            },
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
                    const normal = this.$d3.randomNormal((i/this.n), 0.07)
                    toy.push({
                        id: i,
                        value: Math.max(0.02, Math.abs(normal()))*89
                    })
                }
                this.toy = toy
                this.shuffle()
                this.draw()
            },
            draw () {
                const nGroups = this.algorithm.memory.length
                this.bars
                    .selectAll("rect")
                    .data(this.toy)
                    .join('rect')
                        .classed('playing', this.play)
                        .classed('mergebar', true)
                        .classed('current', (d, i) => i === this.algorithm.index)
                        .classed('mergesorted', this.algorithm.sorted)
                        .attr("fill", (d) => {
                            // if (this.algorithm.sorted) return '#55E6C1'
                            const ind = this.algorithm.memory.findIndex(group => {
                                if (Array.isArray(group))
                                    return group.find(b => b.id == d.id)
                                return -1
                            })
                            if (ind < 0) return '#55E6C1'
                            return this.colorfn(ind / nGroups)
                        })
                        .attr('x', 0)
                        .attr('y', (d, i) => i*this.barHeight)
                        .attr('height', this.barHeight - 0.5)
                        .attr('width', d => `${d.value}%`)

                const firstMem = this.algorithm.mergeMemory[0]
                let ind = 0 
                if (firstMem) {
                    const leftMost = this.algorithm.memory[this.algorithm.memoryIndex][0]
                    ind = this.toy.findIndex(el => {
                        return el.id === leftMost.id
                    })
                }
                this.barsMem
                    .selectAll("rect")
                    .data(this.algorithm.mergeMemory)
                    .join('rect')
                        .attr('fill', '#3B3B98')
                        .attr('opacity', 0.7)
                        .attr('x', 0)
                        .attr('y', (d, i) => (ind+i)*this.barHeight)
                        .attr('height', this.barHeight - 1)
                        .attr('width', d => `${d.value}%`)
            },
            shuffle () {
                this.toy = this.$d3.shuffle(this.toy.slice())
                this.algorithm.setData(this.toy)
            },
            step () {
                const delay = this.algorithm.step()
                this.toy = [].concat(...this.algorithm.memory)
                if (this.algorithm.sorted) {
                    this.$store.commit('setPlay', false)
                }
                return delay
            },
            autoStep () {
                const delay = this.step()
                setTimeout(() => {
                    if (this.play) {
                        this.autoStep()
                    }
                }, delay ? this.delay: 0)
            }
        },
        mounted () {
            this.$d3FinishedLoading.then(() => {
                this.bars = this.$d3.select('#sortable')
                    .append('g')
                    .attr("class", "bars")
                this.barsMem = this.$d3.select('#sortable')
                    .append('g')
                    .attr("class", "mems")
                // this.colorfn = this.$d3.interpolateHsl('#1B9CFC', '#FC427B')
                this.colorfn = this.$d3.interpolateSpectral
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

    .playing.mergebar {
        transition: width 0.35s ease;
    }

    .mergebar {
        transition: all 0.6s ease;
    }

    .mergesorted {
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