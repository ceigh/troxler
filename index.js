const rndTo = to => Math.floor(Math.random() * to)
const rndByte = () => rndTo(255)
const rndColor = (alpha = 0.3) =>
  `rgba(${rndByte()}, ${rndByte()}, ${rndByte()}, ${alpha})`

function draw (canvas, marker) {
  const { width: w, height: h } = canvas
  const side = Math.floor(Math.max(w, h) / 4)
  const ctx = canvas.getContext('2d')
  // console.log(ctx)

  // fill white
  ctx.fillStyle = 'rgb(255, 255, 255)'
  ctx.fillRect(0, 0, w, h)

  // for blending
  ctx.filter = 'blur(1.5rem)'

  // random rectangles
  for (let i = side; i--;) {
    ctx.fillStyle = rndColor()
    ctx.fillRect(rndTo(w), rndTo(h), side, side)
  }

  /*
  // to enlarge brightness (extra)
  ctx.fillStyle = 'rgb(255, 255, 255, 0.5)'
  ctx.fillRect(0, 0, w, h)
  */

  // draw marker
  if (!marker) return
  const markerSide = Math.round(Math.max(w, h) / 100)
  const markerSideHalf = Math.round(markerSide / 2)
  const markerX = Math.round(w / 2 - markerSideHalf)
  const markerY = Math.round(h / 2 - markerSideHalf)
  ctx.filter = 'none'
  ctx.fillStyle = 'rgb(0, 0, 0)'
  ctx.fillRect(markerX, markerY, markerSide, markerSide)

  // blur with css
  // if (!canvas.style.filter) canvas.style.filter = 'blur(1.5rem)'
}

export function drawTroxler (canvas, marker = true) {
  if (!canvas) throw new Error('provide element')
  if (!canvas.getContext) {
    console.warn('this browser does not support canvas, ' +
      'or the transferred item is not canvas')
  } else draw(canvas, marker)
}
