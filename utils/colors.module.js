/**
 * 주어진 0-1 값에 대해 시작 색상과 끝 색상 사이의 그라데이션 색상을 반환합니다.
 * @param {string} startColor - 시작 색상 (예: '#ff0000' 형식의 16진수 색상 코드)
 * @param {string} endColor - 끝 색상 (예: '#0000ff' 형식의 16진수 색상 코드)
 * @param {number} ratio - 0과 1 사이의 값 (0은 시작 색상, 1은 끝 색상)
 * @returns {string} - 그라데이션으로 계산된 중간 색상 (예: '#800080' 형식의 16진수 색상 코드)
 */
export function getGradientColor(startColor, endColor, ratio) {
  // 16진수 색상 코드를 정수형 RGB 값으로 변환
  const hexToRgb = (hex) => {
    let bigint = parseInt(hex.substring(1), 16)
    let r = (bigint >> 16) & 255
    let g = (bigint >> 8) & 255
    let b = bigint & 255
    return [r, g, b]
  }

  // RGB 값을 16진수 색상 코드로 변환
  const rgbToHex = (r, g, b) => {
    return (
      '#' +
      ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
    )
  }

  const [r1, g1, b1] = hexToRgb(startColor)
  const [r2, g2, b2] = hexToRgb(endColor)

  // 주어진 비율에 따라 중간 RGB 값을 계산
  const r = Math.round(r1 + (r2 - r1) * ratio)
  const g = Math.round(g1 + (g2 - g1) * ratio)
  const b = Math.round(b1 + (b2 - b1) * ratio)

  return rgbToHex(r, g, b)
}
