import { drawTroxler } from '../src'

window.addEventListener('load', () => {
  const canvas = document.querySelector('canvas')
  drawTroxler(canvas)

  // redraw
  canvas.addEventListener('click', () => {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    drawTroxler(canvas)
  })
})
