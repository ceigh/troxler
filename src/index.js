const rndByte = () => Math.floor(Math.random() * 255)
const rndColor = (alpha = 0.5) =>
  `rgba(${rndByte()}, ${rndByte()}, ${rndByte()}, ${alpha})`

function draw (canvas) {
  // const { width: w, height: h } = canvas
  const ctx = canvas.getContext('2d')
  // console.log(ctx)

  // for blending
  ctx.filter = 'blur(1.5rem)'

  ctx.fillStyle = rndColor()
  ctx.fillRect(10, 10, 50, 50)
  ctx.fillStyle = rndColor()
  ctx.fillRect(30, 30, 50, 50)

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
