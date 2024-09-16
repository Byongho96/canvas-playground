class Ray {
  constructor(pos, angle) {
    this.pos = pos
    this.dir = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    }
  }

  show(ctx) {
    ctx.beginPath()
    ctx.moveTo(this.pos.x, this.pos.y)
    ctx.lineTo(this.pos.x + this.dir.x * 10, this.pos.y + this.dir.y * 10)
    ctx.strokeStyle = 'white'
    ctx.strokeWidth = 5
    ctx.stroke()
  }

  // https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection#Given_two_points_on_each_line
  _cast(wall) {
    const x1 = wall.a.x
    const y1 = wall.a.y
    const x2 = wall.b.x
    const y2 = wall.b.y

    const x3 = this.pos.x
    const y3 = this.pos.y
    const x4 = this.pos.x + this.dir.x
    const y4 = this.pos.y + this.dir.y

    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
    if (den === 0) return

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den

    if (t > 0 && t < 1 && u > 0) {
      // intersection point
      return {
        x: x1 + t * (x2 - x1),
        y: y1 + t * (y2 - y1),
      }
    }
  }

  cast(walls) {
    let minDis = Infinity
    let minPt = null
    for (const wall of walls) {
      const pt = this._cast(wall)
      if (!pt) continue

      const dis = Math.hypot(this.pos.x - pt.x, this.pos.y - pt.y)
      if (dis < minDis) {
        minDis = dis
        minPt = pt
      }
    }
    return minPt
  }
}

export default Ray
