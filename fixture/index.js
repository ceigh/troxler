import { drawTroxler, clearTroxler } from '../'

window.addEventListener('load', () => {
  const canvas = document.querySelector('canvas')
  const args = [canvas, {
    bg: '#fff',
    marker: '#000',
    brighter: false,
    worker: true
  }]
  drawTroxler(...args)

  // redraw
  canvas.addEventListener('click', () => {
    clearTroxler(canvas)
    drawTroxler(...args)
  })
})
