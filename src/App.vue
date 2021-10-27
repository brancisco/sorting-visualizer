<template>
    <div>
        <tool-bar
            @shuffle="shuffle()"
            @step="step()"
            @play="handleClickPlay"
            @delay="updateDelay"
        ></tool-bar>
        <svg id="sortable" viewBox="0, 0, 400, 300"></svg>
    </div>
</template>

<script>
    import ToolBar from '@/components/ToolBar'
    import BubbleSort from '@/sorting-algorithms/BubbleSort.js'
    import MergeSort from '@/sorting-algorithms/MergeSort.js'
    export default {
        name: "App",
        components: {
            ToolBar
        },
        data () {
            return {
                delay: 200,
                svg: null,
                n: 50,
                toy: [],
                algorithm: null,
                play: false,
                memory: [],
                colorfn: null,
            } 
        },
        watch: {
            toy () {
                this.draw()
            }
        },
        computed: {
            barWidth () {
                return 200 / this.n
            }
        },
        methods: {
            generateNewData () {
                this.algorithm = new MergeSort([])
                const toy = []
                for (let i = 1; i < this.n; i ++) {
                    const normal = this.$d3.randomNormal(i*5, 5)
                    toy.push({
                        id: i,
                        value: normal() + 5
                    })
                }
                this.toy = toy
                this.shuffle()
                
            },
            draw () {
                const nGroups = this.algorithm.memory.length
                this.svg
                    .selectAll("rect")
                    .data(this.toy)
                    .join('rect')
                        .classed('playing', this.play)
                        .classed('bar', true)
                        .classed('current', (d, i) => i === this.algorithm.index)
                        .classed('sorted', this.algorithm.sorted)
                        .attr("fill", (d) => {
                            const ind = this.algorithm.memory.findIndex(group => {
                                if (Array.isArray(group))
                                    return group.find(b => b.id == d.id)
                                return -1
                            })
                            if (ind < 0) return '#55E6C1'
                            return this.colorfn(ind / nGroups)
                        })
                        .attr("x", 0)
                        .attr("y", (d, i) => i*this.barWidth)
                        .attr("height", this.barWidth - 1)
                        .attr("width", d => d.value)
            },
            shuffle () {
                this.toy = this.$d3.shuffle(this.toy.slice())
                this.algorithm.setData(this.toy)
            },
            step () {
                this.algorithm.step()
                if (this.algorithm instanceof MergeSort) {
                    this.toy = [].concat(...this.algorithm.memory)
                } else {
                    this.toy = this.algorithm.data.slice()
                }
                if (this.algorithm.sorted)
                    this.play = false
            },
            handleClickPlay () {
                this.play = !this.play
                this.autoStep()
            },
            autoStep () {
                this.step()
                setTimeout(() => {
                    if (this.play)
                        this.autoStep()
                }, this.delay)
            },
            updateDelay (value) {
                this.delay = parseFloat(value)
            },
        },
        mounted () {
            this.$d3FinishedLoading.then(() => {
                this.svg = this.$d3.select('#sortable')
                    .append('g')
                    .attr("class", "bars")
                // this.colorfn = this.$d3.interpolateRgb("red", "blue")
                this.colorfn = this.$d3.interpolateHsl('#1B9CFC', '#FC427B')
                this.generateNewData()
            })
        }
    }
</script>

<style lang="scss">
    .bars {

    }
    .playing.bar {
        transition: width 0.35s ease;
    }
    
    .bar {
        transition: all 0.6s ease;
        // fill: #1B9CFC;
    }

    .current {
        // fill: #FC427B;
    }

    .sorted {
        transition: fill 1.5s;
        // fill: #55E6C1;
    }
</style>