// helpers
const rndTo = to => Math.floor(Math.random() * to)
const rndByte = () => rndTo(255)
const rndColor = (alpha = 1) =>
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
  const { blur } = options
  // blur with canvas
  if (!options.cssBlur || options.worker) ctx.filter = `blur(${blur})`
  // blur with css
  else if (!canvas.style.filter) canvas.style.filter = `blur(${blur})`

  // random rectangles
  const { alpha } = options
  for (let i = side; i--;) {
    ctx.fillStyle = rndColor(alpha)
    ctx.fillRect(rndTo(w), rndTo(h), side, side)
  }

  // reset filter; options below require no blur
  ctx.filter = 'none'

  // enlarge brightness
  const { brighter } = options
  if (options.brighter) {
    ctx.fillStyle = `rgb(255, 255, 255, ${brighter})`
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

// move drawing to new inline worker
function workerOnMsg ({ data: { canvas, options } }) {
  draw(canvas, options)
}
function drawInWorker (canvas, options) {
  if (!window.Worker || !window.Blob) {
    console.warn('This browser does not support web workers ' +
      'or blobs, fallback to normal drawing')
    draw(canvas, options)
    return
  }

  // can't use this in firefox
  // https://bugzilla.mozilla.org/show_bug.cgi?id=1609238
  if (!canvas.transferControlToOffscreen) {
    console.warn('This browser does not support offscreen canvas, ' +
      'fallback to normal drawing')
    draw(canvas, options)
    return
  }

  // blob for worker
  const fStrings = [rndTo, rndByte, rndColor, draw].map(f => f.toString())
  const blob = new window.Blob([
    'self.onmessage = ',
    workerOnMsg.toString(),
    '\n', ...fStrings
  ], { type: 'text/javascript' })

  // inline worker
  const url = URL.createObjectURL(blob)
  const worker = new window.Worker(url)

  // transfer canvas to worker
  const offscreen = canvas.transferControlToOffscreen()
  worker.postMessage({ canvas: offscreen, options }, [offscreen])
}

export function drawTroxler (canvas, {
  bg = '#fff',
  marker = '#000',
  brighter = 0,
  alpha = 0.3,
  blur = '1.5rem',
  cssBlur = false,
  worker = true
} = {}) {
  if (!canvas) throw new Error('provide element')
  if (!canvas.getContext) {
    console.warn('This browser does not support canvas, ' +
      'or the transferred item is not canvas')
    return
  }

  const options = { bg, brighter, marker, alpha, blur, cssBlur, worker }
  if (worker) drawInWorker(canvas, options)
  else draw(canvas, options)
}

export function clearCanvas (canvas) {
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
}
