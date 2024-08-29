export class ShellSort {
  i = -1
  j = -1
  N = 0
  M = 0
  gap = 0
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
    this.gap = Math.floor(this.N / 2)
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
        case this.j - this.gap:
          ctx.fillStyle = 'yellow' // target number
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
    if (this.i < 0) this.i = this.gap
    if (this.j < 0) this.j = this.gap

    if (this.gap > 0) {
      if (this.i < this.N) {
        if (this.numbers[this.j - this.gap] > this.numbers[this.j]) {
          ;[this.numbers[this.j - this.gap], this.numbers[this.j]] = [
            this.numbers[this.j],
            this.numbers[this.j - this.gap],
          ]
          this.j -= this.gap
        } else {
          this.i++
          this.j = this.i
        }
      } else {
        this.gap = Math.floor(this.gap / 2)
        this.i = this.gap
        this.j = this.i
      }
    } else {
      this.i = -1
      this.j = -1
      this.gap = 0
      this.isSorted = true
    }
  }
}
