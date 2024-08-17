import { easeQutQuart, getRadomInt } from './utils.module.js'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const VARIATION = 10

let width, height
const balls = []

function init() {
  resize()
}

function resize() {
  width = canvas.width = canvas.offsetWidth
  height = canvas.height = canvas.offsetHeight
}

function mousemove(e) {
  const x = e.clientX + getRadomInt(-VARIATION, VARIATION)
  const y = e.clientY + getRadomInt(-VARIATION, VARIATION)
  balls.push(
    new Ball(
      x,
      y,
      (x - e.clientX) / VARIATION,
      (y - e.clientY) / VARIATION,
      getRadomInt(10, 25),
      `rgb(
       ${getRadomInt(150, 255)},
       ${getRadomInt(150, 255)},
       ${getRadomInt(150, 255)}
       )`
    )
  )
}

function drawCanvas() {
  ctx.clearRect(0, 0, width, height)
  ctx.globalCompositeOperation = 'lighter'
  balls.forEach((ball, index) => {
    ball.update()

    if (ball.radius <= 0) {
      balls.splice(index, 1)
    }
  })

  requestAnimationFrame(drawCanvas)
}

drawCanvas()

document.addEventListener('DOMContentLoaded', init)
window.addEventListener('resize', resize)
window.addEventListener('mousemove', mousemove)

class Ball {
  time = 0
  ttl1 = 5 // time to bigger
  ttl2 = 50 // time to smaller

  constructor(x, y, dx, dy, radius, color) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = 0
    this.maxRadius = radius
    this.color = color
  }

  draw() {
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
  }

  update() {
    this.time++
    this.x += this.dx
    this.y += this.dy
    if (this.time < this.ttl1) {
      this.radius = easeQutQuart(this.time / this.ttl1) * this.maxRadius
    } else {
      this.radius =
        easeQutQuart(1 - (this.time - this.ttl1) / this.ttl2) * this.maxRadius
    }
    this.draw()
  }
}
