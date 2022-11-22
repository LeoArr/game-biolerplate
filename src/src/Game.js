import Ground from "./objects/Ground"
import Player from "./objects/Player"

class Game {
  constructor(state = {}) {
    this.state = state
    this.state.player = new Player(this, {x: 1, y: 1})
    this.objects = []
    this.objects.push(new Ground(this, {x: 1, y: 3}))
    this.objects.push(new Ground(this, {x: 2, y: 3}))
    this.objects.push(new Ground(this, {x: 3, y: 3}))
    this.objects.push(new Ground(this, {x: 4, y: 3}))
    this.objects.push(new Ground(this, {x: 4, y: 2}))
    this.objects.push(new Ground(this, {x: 7, y: 3}))
    this.objects.push(new Ground(this, {x: 7, y: 1}))
  }

  draw() {
    this.objects.map((o) => o.draw())
    this.state.player.draw()
  }

  keyPressed() {
    
  }

  windowResized() {

  }

  setup() {
    this.state.spriteSheet = p5.loadImage('./assets/m1.png')
  }
}

export default Game