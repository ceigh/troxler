import { drawTroxler } from '../'

window.addEventListener('load', () => {
  const canvas = document.querySelector('canvas')
  const args = [canvas, {
    // marker: true,
    // brighter: false,
    // bg: 'rgb(255, 255, 255)',
    // worker: true
  }]
  drawTroxler(...args)

  // redraw
  canvas.addEventListener('click', () => {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    drawTroxler(...args)
  })
})
