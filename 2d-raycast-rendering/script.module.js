import Particle from './Particle.module.js'
import Wall from './Wall.module.js'
import { throttle } from './utils.module.js'

const mapCanvas = document.getElementById('map')
const mapCtx = mapCanvas.getContext('2d')

const renderCanvas = document.getElementById('render')
const renderCtx = renderCanvas.getContext('2d')

let width, height
const scale = window.devicePixelRatio || 1

const particle = new Particle(scale)
let walls = []

function init() {
  resize()
}

function resize() {
  mapCanvas.width = mapCanvas.offsetWidth * scale
  mapCanvas.height = mapCanvas.offsetHeight * scale
  renderCanvas.width = renderCanvas.offsetWidth * scale
  renderCanvas.height = renderCanvas.offsetHeight * scale
  width = Math.floor(mapCanvas.width)
  height = Math.floor(mapCanvas.height)

  walls = []
  for (let i = 0; i < 8; i++) {
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

function draw() {
  // Render map canvas
  mapCtx.clearRect(0, 0, width, height)
  walls.forEach((wall) => wall.show(mapCtx))
  const distances = particle.lookAt(mapCtx, walls)

  // Render render canvas
  renderCtx.clearRect(0, 0, width, height)
  const w = width / distances.length
  distances.forEach((distance, index) => {
    const h = ((width - distance) / width) * height
    const x = w * index
    const y = height / 2 - h / 2
    const brightness = 255 * ((width - distance) / width)
    renderCtx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`
    renderCtx.fillRect(x, y, w + 1, h)
  })

  requestAnimationFrame(draw)
}

function handleKeyDown(e) {
  switch (e.key) {
    case 'ArrowUp':
    case 'w':
      particle.move(3 * scale)
      break
    case 'ArrowDown':
    case 's':
      particle.move(-3 * scale)
      break
    case 'ArrowLeft':
    case 'a':
      particle.rotate(-0.03)
      break
    case 'ArrowRight':
    case 'd':
      particle.rotate(0.03)
      break
  }
}

init()
draw()

const throttledUpdate = throttle(particle.update.bind(particle), 1000 / 120)

window.addEventListener('resize', resize)
window.addEventListener('mousemove', throttledUpdate)
window.addEventListener('touchmove', throttledUpdate)
window.addEventListener('keydown', handleKeyDown)
