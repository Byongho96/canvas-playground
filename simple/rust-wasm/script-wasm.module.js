import init, { Ball } from './wasm/pkg/wasm.js'

await init()

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const pixelRatio = window.devicePixelRatio || 1
const perform = document.getElementById('performance')

canvas.width = canvas.offsetWidth * pixelRatio
canvas.height = canvas.offsetHeight * pixelRatio

function initialize() {
  document.getElementById('start').addEventListener('click', () => {
    reset()
    draw()
  })
  document.getElementById('stop').addEventListener('click', reset)
}

initialize()

let requestAnimationID = null

function draw() {
  const balls = []

  for (let i = 0; i < 100000; i++) {
    balls.push(
      new Ball(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        canvas.width,
        canvas.height
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

    balls.forEach((ball) => {
      ball.update()

      ctx.beginPath()
      ctx.arc(ball.x(), ball.y(), 1, 0, 2 * Math.PI)
      ctx.fill()
    })
    requestAnimationID = requestAnimationFrame(draw)
  }

  draw()
}

function reset() {
  requestAnimationID && cancelAnimationFrame(requestAnimationID)
}
