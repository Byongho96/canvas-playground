import { getRandom } from './utils.module.js'

const PARTICLE_COUNTS = 300
const scale = window.devicePixelRatio || 1

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let particles = []

let width, height
let isFlag = false
const mouse = {
  x: undefined,
  y: undefined,
}

function init() {
  resize()
}

function resize() {
  width = canvas.width = canvas.offsetWidth * scale
  height = canvas.height = canvas.offsetHeight * scale

  particles = []
  for (let i = 0; i < PARTICLE_COUNTS; i++) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    particles.push(new Particle(x, y))
  }
}

function enableFlag(e) {
  isFlag = true
  if (e instanceof TouchEvent) {
    e = e.touches[0]
  }
  mouse.x = e.clientX * scale
  mouse.y = e.clientY * scale
}

function anchorPoint(e) {
  if (!isFlag) return
  if (e instanceof TouchEvent) {
    e = e.touches[0]
  }
  mouse.x = e.clientX * scale
  mouse.y = e.clientY * scale
}

function releasePoint() {
  mouse.x = undefined
  mouse.y = undefined
  isFlag = false

  particles.forEach((particle) => {
    particle.resetAngle()
  })
}

function drawCanvas() {
  ctx.globalCompositeOperation = 'source-over'
  ctx.fillStyle = 'rgba(0, 0, 0, .1)'
  ctx.fillRect(0, 0, width, height)
  ctx.globalCompositeOperation = 'lighter'

  particles.forEach((particle) => {
    particle.update(mouse)
  })

  requestAnimationFrame(drawCanvas)
}

drawCanvas()

document.addEventListener('DOMContentLoaded', init)
window.addEventListener('resize', resize)
window.addEventListener('mousedown', enableFlag)
window.addEventListener('touchstart', enableFlag)
window.addEventListener('mousemove', anchorPoint)
window.addEventListener('touchmove', anchorPoint)
window.addEventListener('mouseup', releasePoint)
window.addEventListener('touchend', releasePoint)

class Particle {
  color = 'hsla(40, 100%, 50%, 1)'
  speed = 5
  blur = 5

  constructor(x, y) {
    this.x = x
    this.y = y
    this.nx = x
    this.ny = y
    this.angle = Math.random() * Math.PI * 2
  }

  draw() {
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.nx, this.ny)
    ctx.lineWidth = 3
    ctx.strokeStyle = this.color
    ctx.stroke()
    ctx.closePath()
    ctx.restore()
  }

  update() {
    if (mouse.x) {
      this.angle = Math.atan2(mouse.x - this.x, mouse.y - this.y)
    } else {
      this.angle += getRandom(-0.05, 0.05)
    }

    this.x = this.nx
    this.y = this.ny
    this.nx += this.speed * Math.sin(this.angle)
    this.ny += this.speed * Math.cos(this.angle)

    if (this.nx < 0 || this.nx > width || this.ny < 0 || this.ny > height) {
      this.angle += Math.PI / 2
    }

    this.draw()
  }

  resetAngle() {
    this.angle = Math.random() * Math.PI * 2
  }
}
