export default class MergeSort {
    constructor (data, asc=true) {
        this.data = data.slice()
        this.asc = true
        this.stepCount = 0
        this.sorted = false
        this.memory = [this.data.slice()]
        this.memoryIndex = 0
        this.mergeIndexL = 0
        this.mergeIndexR = 0
        this.mergeMemory = []
        this.splitting = true
        this.splitCount = 0

        this.p = null
        this.q = null
        this.r = null
        this.k = null
        this.lastMemIndex = null
    }

    setData (data) {
        this.data = data.slice()
        this.stepCount = 0
        this.sorted = false
        this.memory = [this.data.slice()]
        this.memoryIndex = 0
        this.mergeIndexL = 0
        this.mergeIndexR = 0
        this.mergeMemory = []
        this.splitting = true
        this.splitCount = 0

        this.p = null
        this.q = null
        this.r = null
        this.k = null
        this.lastMemIndex = null
    }

    step (step=1) {
        this.lastMemIndex = this.memoryIndex
        this.stepCount = this.stepCount + step
        let delay = true
        // console.log('stepping:', this.splitCount)
        if (this.sorted) {
            this.p = null
            this.q = null
            this.r = null
            return false 
        }
        if (this.splitting && this.splitCount >= this.data.length - 1) {
            this.splitting = false
            this.memoryIndex = 0
        }
        const i = this.memoryIndex
        
        if (this.splitting && this.memory[i].length > 1) {
            this._split()
        } else if (this.splitting && this.memory[i].length == 1) {
            this.memoryIndex ++
            delay = false
        } else if (!this.splitting && this.memory.length === 1) {
            this.memory = this.memory[0]
            this.sorted = true
        } else {
            if (this._merge()) {
                this.step(0)
            }
        }

        if (this.memoryIndex >= this.memory.length) {
            this.memoryIndex = 0
        }
        return delay
    }

    _split () {
        // console.log('splitting')
        const i = this.memoryIndex
        const memoryLength = this.memory.length
        const element = this.memory[i]

        const middle = Math.floor(element.length / 2)
        this.p = this._getNBefore(i) 
        this.q = this.p + middle - 1
        this.r = this.p + element.length - 1
        const split = [element.slice(0, middle), element.slice(middle)]
        if (i < this.memory.length - 1) {
            this.memory = [].concat(this.memory.slice(0, i), split, this.memory.slice(i+1))
        } else {
            this.memory = [].concat(this.memory.slice(0, i), split)
        }
        this.memoryIndex = this.memoryIndex + 2
        this.splitCount ++
    }

    _merge () {
        // console.log('merging')
        const i = this.memoryIndex
        const jl = this.mergeIndexL
        const jr = this.mergeIndexR
        const left = this.memory[i]
        const right = this.memory[i + 1]
        if (left && right) {
            let ln = left[jl]
            let rn = right[jr]
            this.p = this._getNBefore(i)
            this.q = this.p + left.length - 1
            this.r = this._getNBefore(i + 1) + right.length - 1
            if (ln && rn) {
                this.mergeMemory = [].concat(this.mergeMemory, [this._getOrdered(ln, rn)[0]])
            }
            else if (ln) {
                this.mergeMemory = [].concat(this.mergeMemory, [ln])
                this.mergeIndexL ++
            }
            else if (rn) {
                this.mergeMemory = [].concat(this.mergeMemory, [rn])
                this.mergeIndexR ++
            }
            else {
                this.memory.splice(i, 2, this.mergeMemory)
                this.memoryIndex ++
                this.mergeMemory = []
                this.mergeIndexL = 0
                this.mergeIndexR = 0
                return true;
            }
        } else {
            this.memoryIndex = 0
            this.mergeIndexL = 0
            this.mergeIndexR = 0
            return true;
        }
    }

    _getOrdered (a, b) {
        if (this.asc && a.value > b.value) {
            this.mergeIndexR ++
            return [b, a]
        } else if (!this.asc && a.value < b.value) {
            this.mergeIndexR ++
            return [b, a]
        }
        this.mergeIndexL ++
        return [a, b]
    }

    _getNBefore (i) {
        return this.memory.reduce((acc, cur, ii) => {
            if (ii < i) {
                return acc + cur.length
            }
            return acc
        }, 0)
    }
}