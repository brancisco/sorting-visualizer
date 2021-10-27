export default class BubbleSort {
    constructor (data, asc=true) {
        this.data = data.slice()
        this.asc = true
        this.stepCount = 0
        this.sorted = false
        this.changed = false
        this.index = 0
    }

    setData (data) {
        this.data = data.slice()
        this.stepCount = 0
        this.sorted = false
        this.changed = false
        this.index = 0
    }

    swap (i, j) {
        const temp = this.data[i]
        this.data[i] = this.data[j]
        this.data[j] = temp
    }

    step () {
        if (!this.sorted) {
            const i = this.index
            if (i >= this.data.length - 1) {
                if (!this.changed) {
                    this.sorted = true
                }
                this.index = 0
                this.changed = false
                return;
            }
            if (this.asc && this.data[i].value > this.data[i + 1].value) {
                this.swap(i, i + 1)
                this.changed = true
            } else if (!this.asc && this.data[i].value < this.data[i + 1].value) {
                this.swap(i, i + 1)
                this.changed = true
            }
            this.index ++
            this.stepCount ++
        }
    }

    sort () {
        while (!this.sorted && this.stepCount < 1000) {
            this.step()
        }
    }
}