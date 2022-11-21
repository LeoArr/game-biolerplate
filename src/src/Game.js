class Game {
  constructor(state = {}) {
    this.state = state
  }

  draw() {
    p5.image(this.state.img, 200, 200)
  }

  windowResized() {

  }

  setup() {
    this.state.img = p5.loadImage('./assets/cultist2.jpeg')
  }
}

export default Game