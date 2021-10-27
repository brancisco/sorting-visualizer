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
        this.didSplit = false
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
        this.didSplit = false
    }

    step () {
        let i = this.memoryIndex
        if (this.sorted) return;
        if (i >= this.memory.length) {
            if (!this.didSplit) {
                this.splitting = false
            }
            this.memoryIndex = 0
            i = this.memoryIndex
            this.didSplit = false
        }

        if (this.splitting && this.memory[i].length > 1) {
            this._split()
        } else if (this.splitting && this.memory[i].length == 1) {
            this.memoryIndex ++
        } else if (this.splitting) {
            this.memoryIndex = 0
            this.splitting = false
        } else if (!this.splitting && this.memory.length === 1) {
            this.memory = this.memory[0]
            this.sorted = true
        } else {
            this._merge()
        }
    }

    _split () {
        this.didSplit = true
        const i = this.memoryIndex
        const memoryLength = this.memory.length
        const element = this.memory[i]

        const middle = Math.ceil(element.length / 2)
        const split = [element.slice(0, middle), element.slice(middle)]
        if (i < this.memory.length - 1) {
            this.memory = [].concat(this.memory.slice(0, i), split, this.memory.slice(i+1))
        } else {
            this.memory = [].concat(this.memory.slice(0, i), split)
        }
        this.memoryIndex = this.memoryIndex + 2
    }

    _merge () {
        const i = this.memoryIndex
        const jl = this.mergeIndexL
        const jr = this.mergeIndexR
        const left = this.memory[i]
        const right = this.memory[i + 1]
        if (left && right) {
            let ln = left[jl]
            let rn = right[jr]
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
                return;
            }
        } else {
            this.memoryIndex = 0
            this.mergeIndexL = 0
            this.mergeIndexR = 0
            return;
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
}