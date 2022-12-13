import Matter from "matter-js"
import Rect from "./Rect"

class Game {
  constructor(state = {}) {
    this.state = state
    this.objects = []
    this.engine = Matter.Engine.create()
    new Rect(this, 150, 300, 300, 20, { isStatic: true })
  }

  draw(dt) {
    Matter.Engine.update(this.engine, this.dt)
    for (const object of this.objects) {
      object.draw()
    }
  }

  windowResized() {

  }

  setup() {
    p5.frameRate(30)
    this.dt = 1000/30
  }

  mousePressed(mouseX, mouseY) {
    new Rect(this, mouseX, mouseY, 20, 20)
  }

  keyPressed() {
    if (p5.keyCode === p5.LEFT_ARROW) {
      Matter.Body.applyForce(this.objects[1].body, this.objects[1].body.position, Matter.Vector.create(-0.001, 0))
    }
    if (p5.keyCode === p5.RIGHT_ARROW) {
      Matter.Body.applyForce(this.objects[1].body, this.objects[1].body.position, Matter.Vector.create(0.001, 0))
    }
  }
  
}

export default Game