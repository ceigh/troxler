import { drawTroxler, clearTroxler } from '../'

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
    clearTroxler(canvas)
    drawTroxler(...args)
  })
})
