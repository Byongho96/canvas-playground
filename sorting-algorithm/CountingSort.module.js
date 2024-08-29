export class CountingSort {
  step = 0 // Step counter for the sorting process
  N = 0
  M = 0
  numbers = []
  copiedNumbers = []
  count = [] // Counter array
  i = -1 // Index for numbers array
  j = -1 // Index for count array
  k = -1
  isSorted = false

  constructor(numbers) {
    this.setNumbers(numbers)
  }

  setNumbers(numbers) {
    this.numbers = numbers
    this.copiedNumbers = [...numbers]
    this.N = numbers.length
    this.M = Math.max(...numbers)
    this.count = new Array(Math.max(...this.numbers) + 1).fill(0) // Initialize count array
    this.step = 0
    this.i = -1
    this.j = -1
    this.k = -1
    this.isSorted = false
  }

  draw(ctx) {
    const width = ctx.canvas.width
    const height = ctx.canvas.height
    const barWidth = width / this.N
    const barHeight = height / this.M

    this.numbers.forEach((num, i) => {
      switch (i) {
        case this.i:
          ctx.fillStyle = 'red' // target number
          break
        case this.k:
          ctx.fillStyle = 'yellow' // target to be placed index
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

    if (this.step == 1) {
      ctx.fillStyle = 'black'
      ctx.font = '1.5rem Arial'
      ctx.fillText(`Cumulate counter ${this.j}`, 20, 30)
    }
  }

  update() {
    if (this.i < 0) this.i = 0
    if (this.j < 0) this.j = 0

    switch (this.step) {
      case 0:
        // Step 0: Count occurrences of each value
        if (this.i < this.numbers.length) {
          this.count[this.numbers[this.i]]++ // Count each element
          this.i++
        } else {
          this.j = 1
          this.step++
        }
        break
      case 1:
        // Step 1: Compute cumulative counts
        if (this.j < this.count.length) {
          this.count[this.j] += this.count[this.j - 1]
          this.j++
        } else {
          this.i = this.numbers.length - 1
          this.step++
        }
        break
      case 2:
        // Step 2: Build the output array using cumulative counts
        if (this.i > -1) {
          const value = this.copiedNumbers[this.i] // target value
          this.k = this.count[value] - 1 // target value's position index
          this.numbers[this.k] = value
          this.count[value]-- // Decrement count
          this.i--

          if (this.i == -1) {
            this.k = -1
            this.isSorted = true // Sorting is complete
          }
        }
        break
    }
  }
}
