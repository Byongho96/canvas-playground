import Ray from './Ray.module.js'

class Particle {
  constructor(scale) {
    this.pos = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }
    this.fov = 40 * (Math.PI / 180)
    this.heading = 0
    this.scale = scale

    this.rays = []
    for (let a = -this.fov / 2; a < this.fov / 2; a += this.fov / 120) {
      this.rays.push(new Ray(this.pos, a))
    }
  }

  _setHeading(heading) {
    this.heading = heading % (Math.PI * 2)
    this.rays.forEach((ray, i) => {
      ray.setAngle(this.heading + ((i * this.fov) / 120 - this.fov / 2))
    })
  }

  rotate(angle) {
    this._setHeading(this.heading + angle)
  }

  move(amt) {
    const dx = amt * Math.cos(this.heading)
    const dy = amt * Math.sin(this.heading)
    this.pos.x += dx
    this.pos.y += dy
  }

  update(e) {
    if (e instanceof TouchEvent) {
      e = e.touches[0]
    }

    this.pos.x = e.clientX * this.scale
    this.pos.y = e.clientY * this.scale
  }

  lookAt(ctx, walls) {
    const distances = []
    this.rays.forEach((ray) => {
      const { point, distance } = ray.cast(walls)
      const cosDis = distance * Math.cos(ray.angle - this.heading)
      distances.push(cosDis)
      // distances.push(distance)
      if (point) {
        ctx.beginPath()
        ctx.moveTo(this.pos.x, this.pos.y)
        ctx.lineTo(point.x, point.y)
        ctx.strokeStyle = 'white'
        ctx.strokeWidth = 5
        ctx.stroke()
      }
    })
    return distances
  }
}

export default Particle
