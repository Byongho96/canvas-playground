import { getGradientColor } from './utils/colors.module.js'

let animationID = null
const canvas = document.getElementById('myCanvas')
const devicePixelRatio = window.devicePixelRatio || 1

canvas.width = canvas.offsetWidth * devicePixelRatio
canvas.height = canvas.offsetHeight * devicePixelRatio
const ctx = canvas.getContext('2d')

let numOfLInes = 50
let startColor = '#ff0000'
let endColor = '#ffff00'

const numberInput = document.getElementById('numberLines')
numberInput.addEventListener('change', (e) => {
  const value = Number(e.target.value)

  if (value < 0) numOfLInes = 0
  else if (value > 1000) numOfLInes = 1000

  numOfLInes = value
})

const startColorInput = document.getElementById('startColor')
startColorInput.addEventListener('change', (e) => {
  startColor = e.target.value
})

const endColorInput = document.getElementById('endColor')
endColorInput.addEventListener('change', (e) => {
  endColor = e.target.value
})

const resetButton = document.getElementById('reset')
resetButton.addEventListener('click', () => {
  reset()
})

const drawButton = document.getElementById('draw')
drawButton.addEventListener('click', () => {
  reset()
  drawLines()
})

function reset() {
  animationID && cancelAnimationFrame(animationID)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function drawLines() {
  const lines = []

  for (let i = 0; i < numOfLInes; i++) {
    const rad = (2 * Math.PI * i) / numOfLInes
    const color = getGradientColor(startColor, endColor, i / numOfLInes)
    lines.push(new Line(canvas.width / 2, canvas.height / 2, rad, color))
  }

  let prevTime = performance.now()
  function drawFrame() {
    const curTime = performance.now()
    const delta = curTime - prevTime
    prevTime = curTime

    lines.forEach((line) => line.draw(delta))
    animationID = requestAnimationFrame(drawFrame)
  }

  drawFrame()
}

class Line {
  constructor(x, y, rad, color) {
    this.x = x
    this.y = y
    this.dx = Math.cos(rad)
    this.dy = Math.sin(rad)
    this.color = color
  }

  draw(delta) {
    if (this.x < 0 || this.x > canvas.width) {
      this.dx *= -1
    }
    if (this.y < 0 || this.y > canvas.height) {
      this.dy *= -1
    }

    ctx.strokeStyle = this.color
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    this.x += this.dx * delta * 0.05 * devicePixelRatio
    this.y += this.dy * delta * 0.05 * devicePixelRatio
    ctx.lineTo(this.x, this.y)
    ctx.stroke()
  }
}

reset()
