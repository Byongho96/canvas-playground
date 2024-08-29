import { BubbleSort } from './BubbleSort.module.js'
import { CountingSort } from './CountingSort.module.js'
import { InsertionSort } from './InsertionSort.module.js'
import { MergeSort } from './MergeSort.module.js'
import { SelectionSort } from './SelectionSort.module.js'
import { ShellSort } from './ShellSort.module.js'

let numbers = []

const maxValInput = document.getElementById('maxVal')
const numberInput = document.getElementById('number')
let maxVal = 0
let number = 0

const scale = window.devicePixelRatio || 1

const canvasArray = [
  document.getElementById('bubble'),
  document.getElementById('selection'),
  document.getElementById('insertion'),
  document.getElementById('shell'),
  document.getElementById('merge'),
  document.getElementById('counting'),
]
const ctxArray = canvasArray.map((canvas) => canvas.getContext('2d'))
const sortArray = [
  BubbleSort,
  SelectionSort,
  InsertionSort,
  ShellSort,
  MergeSort,
  CountingSort,
].map((Sort) => new Sort([0]))

let intervalID = null

function init() {
  resize()
  clearInterval(intervalID)

  maxVal = parseInt(maxValInput.value)
  number = parseInt(numberInput.value)
  numbers = Array.from({ length: number }, () =>
    Math.floor(Math.random() * maxVal)
  )
  sortArray.forEach((sort, index) => {
    const ctx = ctxArray[index]
    const canvas = canvasArray[index]

    sort.setNumbers([...numbers])
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    sort.draw(ctx)
  })
}

function resize() {
  canvasArray.forEach((canvas) => {
    canvas.width = canvas.offsetWidth * scale
    canvas.height = canvas.offsetHeight * scale
  })

  sortArray.forEach((sort, index) => {
    const ctx = ctxArray[index]
    const canvas = canvasArray[index]

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    sort.draw(ctx)
  })
}

function draw() {
  clearInterval(intervalID)
  intervalID = setInterval(() => {
    let isSorted = true

    sortArray.forEach((sort, index) => {
      if (sort.isSorted) return

      // const audio = new Audio('./bloop.mp3')
      // audio.volume = 0.5
      // audio.play()

      const ctx = ctxArray[index]
      const canvas = canvasArray[index]

      sort.update()
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      sort.draw(ctx)

      isSorted = false // Check if all sorts are sorted
    })

    if (isSorted) clearInterval(intervalID)
  }, 10)
}

init()

window.addEventListener('resize', resize)

const resetButton = document.getElementById('reset')
const startButton = document.getElementById('start')

resetButton.addEventListener('click', init)
startButton.addEventListener('click', draw)
