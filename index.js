// helpers
const rndTo = to => Math.floor(Math.random() * to)
const rndByte = () => rndTo(255)
const rndColor = (alpha = 0.3) =>
  `rgba(${rndByte()}, ${rndByte()}, ${rndByte()}, ${alpha})`

// just draw on canvas
function draw (canvas, options) {
  const { width: w, height: h } = canvas
  const side = Math.floor(Math.max(w, h) / 4)
  const ctx = canvas.getContext('2d')
  // console.log(ctx)

  // fill bg
  const { bg } = options
  if (bg) {
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, w, h)
  }

  // for blending
  // blur with canvas
  ctx.filter = 'blur(1.5rem)'
  // blur with css
  // if (!canvas.style.filter) canvas.style.filter = 'blur(1.5rem)'

  // random rectangles
  for (let i = side; i--;) {
    ctx.fillStyle = rndColor()
    ctx.fillRect(rndTo(w), rndTo(h), side, side)
  }

  // reset filter; options below require no blur
  ctx.filter = 'none'

  // enlarge brightness
  if (options.brighter) {
    ctx.fillStyle = 'rgb(255, 255, 255, 0.5)'
    ctx.fillRect(0, 0, w, h)
  }

  // draw marker
  const { marker } = options
  if (marker) {
    const markerSide = Math.round(Math.max(w, h) / 100)
    const markerSideHalf = Math.round(markerSide / 2)
    const markerX = Math.round(w / 2 - markerSideHalf)
    const markerY = Math.round(h / 2 - markerSideHalf)
    ctx.fillStyle = marker
    ctx.fillRect(markerX, markerY, markerSide, markerSide)
  }
}

// move drawing to new thread
function drawInWorker (canvas, options) {
  if (!window.Worker) {
    console.warn('this browser does not support web workers, ' +
      'fallback to normal drawing')
    draw(canvas, options)
    return
  }

  // TODO: web workers
  draw(canvas, options)
}

export function drawTroxler (canvas, {
  bg = '#fff',
  marker = '#000',
  brighter = false,
  worker = true
} = {}) {
  if (!canvas) throw new Error('provide element')
  if (!canvas.getContext) {
    console.warn('this browser does not support canvas, ' +
      'or the transferred item is not canvas')
    return
  }

  const options = { bg, brighter, marker, worker }
  if (worker) drawInWorker(canvas, options)
  else draw(canvas, options)
}

export function clearCanvas (canvas) {
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
}
