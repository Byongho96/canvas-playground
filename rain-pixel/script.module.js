import { drawImageContain, getRelativeBrightness } from './utils.module.js'

let blob = undefined

const canvas = document.getElementById('canvas')
const input = document.getElementById('image-file')

let width, height
const scale = window.devicePixelRatio || 1
const ctx = canvas.getContext('2d')

const NUM_PARTICLES = 4000
let particles = []
let brightMap = undefined

function init() {
  setup()
  resize()
}

function resize() {
  canvas.width = canvas.offsetWidth * scale
  canvas.height = canvas.offsetHeight * scale
  width = Math.floor(canvas.width)
  height = Math.floor(canvas.height)
  blob && createBrightMap(blob)
}

async function setup() {
  const data = await fetch('./example.webp')
  blob = await data.blob()
  createBrightMap(blob)

  for (let i = 0; i < NUM_PARTICLES; i++) {
    particles.push(new Particle())
  }
}

function drawCanvas() {
  ctx.globalAlpha = 0.1
  ctx.fillStyle = 'rgba(0, 0, 0)'
  ctx.fillRect(0, 0, width, height)

  particles.forEach((particle) => {
    particle.update()
    particle.draw()
  })

  requestAnimationFrame(drawCanvas)
}

function applyImage() {
  const file = input.files[0]
  if (!file) {
    alert('Please select an image file')
    return
  }

  blob = file
  createBrightMap(blob)
}

async function createBrightMap(blob) {
  const offscreenCanvas = new OffscreenCanvas(width, height)
  const offCtx = offscreenCanvas.getContext('2d')
  const reader = new FileReader()

  reader.onload = (e) => {
    const image = new Image()
    image.src = e.target.result

    image.onload = () => {
      drawImageContain(offCtx, image, width, height)
      const pixels = offCtx.getImageData(0, 0, width, height)

      brightMap = new Uint8ClampedArray(pixels.data.length / 4)
      for (let i = 0; i < pixels.data.length; i += 4) {
        const r = pixels.data[i]
        const g = pixels.data[i + 1]
        const b = pixels.data[i + 2]
        const brightness = Math.floor(getRelativeBrightness(r, g, b))
        brightMap[i / 4] = brightness
      }
    }
  }

  reader.readAsDataURL(blob)
}

document.addEventListener('DOMContentLoaded', init)
window.addEventListener('resize', resize)
input.addEventListener('change', applyImage)
drawCanvas()

class Particle {
  minSpeed = 1

  constructor() {
    this.x = Math.random() * width
    this.y = 0
    this.radius = Math.random() * 1.2 * scale + 1
    this.speed = (this.radius / (1.2 * scale)) * 3.5
    this.brightness = 0
  }

  draw() {
    ctx.globalAlpha = (this.brightness / 255) * 0.9 + 0.1
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = '#fff'
    ctx.fill()
    ctx.closePath()
  }

  update() {
    if (!brightMap) return

    this.brightness = brightMap[Math.floor(this.y) * width + Math.floor(this.x)]
    const temperedSpeed =
      (this.speed * (255 - this.brightness)) / 255 + this.minSpeed
    this.y += temperedSpeed

    if (this.y > height) {
      this.y = 0
      this.x = Math.random() * width
    }
  }
}
