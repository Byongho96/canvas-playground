export class SelectionSort {
  i = -1
  j = -1
  mnIdx = -1
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
    this.j = -1
    this.mnIdx = -1
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
        case this.j:
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
    if (this.mnIdx < 0) this.mnIdx = 0

    if (this.i < this.N) {
      if (this.j < this.N) {
        if (this.numbers[this.j] < this.numbers[this.mnIdx]) {
          this.mnIdx = this.j
        }
        this.j++
      } else {
        ;[this.numbers[this.i], this.numbers[this.mnIdx]] = [
          this.numbers[this.mnIdx],
          this.numbers[this.i],
        ]
        this.i++
        this.j = this.i
        this.mnIdx = this.i
      }
    } else {
      this.i = -1
      this.j = -1
      this.mnIdx = -1
      this.isSorted = true
    }
  }
}
