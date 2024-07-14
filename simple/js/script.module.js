const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const pixelRatio = window.devicePixelRatio || 1
const perform = document.getElementById('performance')

canvas.width = canvas.offsetWidth * pixelRatio
canvas.height = canvas.offsetHeight * pixelRatio

function init() {
  document.getElementById('start').addEventListener('click', () => {
    reset()
    draw()
  })
  document.getElementById('stop').addEventListener('click', reset)
}

init()

let requestAnimationID = null

function draw() {
  const balls = []

  for (let i = 0; i < 100000; i++) {
    balls.push(
      new Ball(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      )
    )
  }

  let prevTime = performance.now()

  function draw() {
    const perf = performance.now() - prevTime
    prevTime = performance.now()
    perform.innerHTML = perf.toFixed(2) + ' ms'

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'white'

    balls.forEach((ball) => ball.draw(ctx))
    requestAnimationID = requestAnimationFrame(draw)
  }

  draw()
}

function reset() {
  requestAnimationID && cancelAnimationFrame(requestAnimationID)
}

class Ball {
  constructor(x, y, vx, vy) {
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
  }

  draw(ctx) {
    this.x += this.vx
    this.y += this.vy

    if (this.x > canvas.width || this.x < 0) {
      this.vx = -this.vx
    }

    if (this.y > canvas.height || this.y < 0) {
      this.vy = -this.vy
    }

    // Draw the circle
    ctx.beginPath()
    ctx.arc(this.x, this.y, 1, 0, 2 * Math.PI)
    ctx.fill()
  }
}
