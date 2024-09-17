import Ray from './Ray.module.js'

class Particle {
  constructor(scale) {
    this.pos = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }
    this.scale = scale

    this.rays = []
    for (let a = 0; a < Math.PI * 2; a += (Math.PI / 360) * 5) {
      this.rays.push(new Ray(this.pos, a))
    }
  }

  update(e) {
    if (e instanceof TouchEvent) {
      e = e.touches[0]
    }

    this.pos.x = e.clientX * this.scale
    this.pos.y = e.clientY * this.scale
  }

  lookAt(ctx, walls) {
    this.rays.forEach((ray) => {
      // ray.show(ctx)
      const pt = ray.cast(walls)
      if (pt) {
        ctx.beginPath()
        ctx.moveTo(this.pos.x, this.pos.y)
        ctx.lineTo(pt.x, pt.y)
        ctx.strokeStyle = 'white'
        ctx.strokeWidth = 5
        ctx.stroke()
      }
    })
  }
}

export default Particle
