import Matter from "matter-js"

class Rect {
  constructor(game, x, y, w, h, options = {}) {
    this.game = game
    this.body = Matter.Bodies.rectangle(x, y, w, h, options)
    Matter.Composite.add(this.game.engine.world, [this.body])
    this.w = w
    this.h = h
    this.game.objects.push(this)
  }

  draw() {
    p5.push()
    p5.fill(200)
    p5.rectMode(p5.CENTER)
    p5.translate(this.body.position.x, this.body.position.y)
    p5.rotate(this.body.angle)
    p5.rect(0, 0, this.w, this.h)
    p5.pop()
  }
}

export default Rect