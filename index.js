const rndTo = to => Math.floor(Math.random() * to)
const rndByte = () => rndTo(255)
const rndColor = (alpha = 0.3) =>
  `rgba(${rndByte()}, ${rndByte()}, ${rndByte()}, ${alpha})`

function draw (canvas) {
  const { width: w, height: h } = canvas
  const side = Math.floor(Math.max(w, h) / 4)
  const ctx = canvas.getContext('2d')
  // console.log(ctx)

  ctx.fillStyle = 'rgb(255, 255, 255)'
  ctx.fillRect(0, 0, w, h)

  // for blending
  ctx.filter = 'blur(1.5rem)'

  for (let i = side; i--;) {
    ctx.fillStyle = rndColor()
    ctx.fillRect(rndTo(w), rndTo(h), side, side)
  }

  /*
  // to enlarge brightness
  ctx.fillStyle = 'rgb(255, 255, 255, 0.5)'
  ctx.fillRect(0, 0, w, h)
  */
}

export function drawTroxler (canvas) {
  if (!canvas) throw new Error('provide element')
  if (!canvas.getContext) {
    console.warn('this browser does not support canvas, ' +
      'or the transferred item is not canvas')
  } else draw(canvas)
}
