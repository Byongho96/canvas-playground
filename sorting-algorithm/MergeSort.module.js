export class MergeSort {
  numbers = []
  N = 0
  M = 0
  mergeStack = []
  currentMerge = null
  aux = []
  l = -1
  r = -1
  m = -1
  isSorted = false

  constructor(numbers) {
    this.setNumbers(numbers)
  }

  setNumbers(numbers) {
    this.numbers = numbers
    this.N = numbers.length
    this.M = Math.max(...numbers)
    this.l = -1
    this.r = -1
    this.m = -1
    this.mergeStack = []
    this.currentMerge = null
    this.aux = new Array(this.N) // Initialize auxiliary array
    this.divide(0, this.numbers.length - 1)
    this.isSorted = false
  }

  draw(ctx) {
    const width = ctx.canvas.width
    const height = ctx.canvas.height
    const barWidth = width / this.N
    const barHeight = height / this.M

    this.numbers.forEach((num, i) => {
      switch (i) {
        case this.m:
          ctx.fillStyle = 'red' // target number
          break
        case this.l:
        case this.r:
          ctx.fillStyle = 'yellow' // left and right pointers
          break
        default:
          ctx.fillStyle = 'blue' // default color
          break
      }
      ctx.fillRect(
        i * barWidth,
        height - num * barHeight,
        barWidth,
        num * barHeight
      )
    })
  }

  update() {
    if (!this.currentMerge) {
      if (this.mergeStack.length) {
        this.currentMerge = this.mergeStack.pop()
        this.l = this.currentMerge.left
        this.r = this.currentMerge.mid + 1
        this.m = this.currentMerge.left
        // Copy the current segment to the auxiliary array
        for (
          let i = this.currentMerge.left;
          i <= this.currentMerge.right;
          i++
        ) {
          this.aux[i] = this.numbers[i]
        }
      } else {
        this.l = -1
        this.r = -1
        this.m = -1
        this.isSorted = true
        return
      }
    }

    const { left, right, mid } = this.currentMerge

    if (this.l <= mid && this.r <= right) {
      // Compare and merge from left and right halves
      if (this.aux[this.l] <= this.aux[this.r]) {
        this.numbers[this.m++] = this.aux[this.l++]
      } else {
        this.numbers[this.m++] = this.aux[this.r++]
      }
    } else if (this.l <= mid) {
      // Remaining elements from left half
      this.numbers[this.m++] = this.aux[this.l++]
    } else if (this.r <= right) {
      // Remaining elements from right half
      this.numbers[this.m++] = this.aux[this.r++]
    } else {
      // Completed merging this part
      this.currentMerge = null
    }
  }

  // Dividing process: create merge stack
  divide(left, right) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2)
      this.mergeStack.push({ left, right, mid })
      this.divide(left, mid)
      this.divide(mid + 1, right)
    }
  }
}
