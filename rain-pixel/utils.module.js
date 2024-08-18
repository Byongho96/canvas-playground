export function getRelativeBrightness(r, g, b) {
  return (r * 299 + g * 587 + b * 114) / 1000
}

export function drawImageContain(ctx, image, canvasWidth, canvasHeight) {
  // 이미지의 가로 세로 비율 계산
  const imgRatio = image.width / image.height
  const canvasRatio = canvasWidth / canvasHeight

  let drawWidth, drawHeight, offsetX, offsetY

  // 이미지가 캔버스보다 넓을 때
  if (imgRatio > canvasRatio) {
    drawWidth = canvasWidth
    drawHeight = canvasWidth / imgRatio
    offsetX = 0
    offsetY = (canvasHeight - drawHeight) / 2
  } else {
    // 이미지가 캔버스보다 높을 때
    drawWidth = canvasHeight * imgRatio
    drawHeight = canvasHeight
    offsetX = (canvasWidth - drawWidth) / 2
    offsetY = 0
  }

  // 이미지 그리기
  ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight)
}
