import init, { Balls } from './wasm-array/pkg/wasm.js'

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
  const balls = new Balls(100000, canvas.width, canvas.height)

  let prevTime = performance.now()

  function draw() {
    const perf = performance.now() - prevTime
    prevTime = performance.now()
    perform.innerHTML = perf.toFixed(2) + ' ms'

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'white'

    balls.update()

    for (let i = 0; i < balls.length(); i++) {
      ctx.beginPath()
      ctx.arc(
        balls.get_particle_x(i),
        balls.get_particle_y(i),
        1,
        0,
        2 * Math.PI
      )
      ctx.fill()
    }

    requestAnimationID = requestAnimationFrame(draw)
  }

  draw()
}

function reset() {
  requestAnimationID && cancelAnimationFrame(requestAnimationID)
}
