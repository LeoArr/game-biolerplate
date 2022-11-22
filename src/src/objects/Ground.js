import Solid from "./Solid"

class Ground extends Solid {
  constructor(game, position) {
    super(position, 1, 1)
    this.game = game
  }

  draw() {
    p5.push()
    p5.translate(this.position.x * _tileSize, this.position.y * _tileSize)
    p5.image(this.game.state.spriteSheet, 0, 0, _tileSize, _tileSize, 0, _tileSize, _tileSize, _tileSize)
    p5.pop()
  }
}

export default Ground