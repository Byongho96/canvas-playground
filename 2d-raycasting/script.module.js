import Particle from './Particle.module.js'
import Wall from './Wall.module.js'
import { throttle } from './utils.module.js'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let width, height
const scale = window.devicePixelRatio || 1

const particle = new Particle(scale)

const walls = []

function init() {
  resize()
  for (let i = 0; i < 5; i++) {
    const x1 = Math.random() * width
    const y1 = Math.random() * height
    const x2 = Math.random() * width
    const y2 = Math.random() * height
    walls.push(new Wall(x1, y1, x2, y2))
  }
  walls.push(new Wall(0, 0, width, 0)) // top
  walls.push(new Wall(width, 0, width, height)) // right
  walls.push(new Wall(width, height, 0, height)) // bottom
  walls.push(new Wall(0, height, 0, 0))
}

function resize() {
  canvas.width = canvas.offsetWidth * scale
  canvas.height = canvas.offsetHeight * scale
  width = Math.floor(canvas.width)
  height = Math.floor(canvas.height)
}

function draw() {
  ctx.clearRect(0, 0, width, height)

  walls.forEach((wall) => wall.show(ctx))
  particle.lookAt(ctx, walls)

  requestAnimationFrame(draw)
}

init()
draw()

const throttledUpdate = throttle(particle.update.bind(particle), 1000 / 120)

window.addEventListener('resize', resize)
window.addEventListener('mousemove', throttledUpdate)
window.addEventListener('touchmove', throttledUpdate)
