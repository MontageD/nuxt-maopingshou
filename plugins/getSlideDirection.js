function GetSlideAngle (dx, dy) {
  return Math.atan2(dy, dx) * 180 / Math.PI
}

const GetSlideDirection = (startX, startY, endX, endY) => {
  let dy = startY - endY
  let dx = endX - startX
  let result = 0

  if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
    return result
  }

  let angle = GetSlideAngle(dx, dy)
  if (angle >= -45 && angle < 45) {
    result = 4
  } else if (angle >= 45 && angle < 135) {
    result = 1
  } else if (angle >= -135 && angle < -45) {
    result = 2
  } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
    result = 3
  }

  return result
}

if (process.browser) {
  window.utils = window.utils || {}
  window.utils.getSlide = GetSlideDirection
}
