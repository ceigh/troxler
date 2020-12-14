import { drawTroxler, clearCanvas } from '../'

window.addEventListener('load', () => {
  const canvas = document.querySelector('canvas')
  const args = [canvas, {
    bg: '#fff',
    marker: '#000',
    brighter: 0,
    alpha: 0.3,
    worker: true
  }]
  drawTroxler(...args)

  // redraw
  canvas.addEventListener('click', () => {
    clearCanvas(canvas)
    drawTroxler(...args)
  })
})
