export function getRadomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function easeQutQuart(t) {
  return 1 - --t * t * t * t
}
