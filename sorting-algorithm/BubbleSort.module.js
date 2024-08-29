export class BubbleSort {
  i = -1 // Outer loop index
  j = -2 // Inner loop index, target number
  N = 0
  M = 0
  isSorted = false

  constructor(numbers) {
    this.setNumbers(numbers)
  }

  setNumbers(numbers) {
    this.numbers = numbers
    this.N = numbers.length
    this.M = Math.max(...numbers)
    this.i = -1
    this.j = -2
    this.isSorted = false
  }

  draw(ctx) {
    const width = ctx.canvas.width
    const height = ctx.canvas.height
    const barWidth = width / this.N
    const barHeight = height / this.M

    this.numbers.forEach((num, i) => {
      switch (i) {
        case this.j:
          ctx.fillStyle = 'red' // target number
          break
        case this.j + 1:
          ctx.fillStyle = 'yellow' // comparison number
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
    if (this.i < 0) this.i = 0
    if (this.j < 0) this.j = 0

    if (this.i < this.N) {
      if (this.j < this.N - this.i - 1) {
        // sort
        if (this.numbers[this.j] > this.numbers[this.j + 1]) {
          ;[this.numbers[this.j], this.numbers[this.j + 1]] = [
            this.numbers[this.j + 1],
            this.numbers[this.j],
          ]
        }
        this.j++
      } else {
        this.j = 0 // Reset inner loop
        this.i++ // Increment outer loop
      }
    } else {
      this.i = -1
      this.j = -2
      this.isSorted = true
    }
  }
}
