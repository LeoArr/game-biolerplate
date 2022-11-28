import Player from "./Player"
import Solid from "./Solid"

class Exit extends Solid {
  constructor(game, position, lockedVar) {
    super(position, 2, 1)
    this.game = game
    this.lockedVar = lockedVar
  }

  onCollision(other) {
    if (other instanceof Player) {
      this.game.playerWin()
    }
  }

  draw() {
    p5.push()
    p5.translate(this.position.x * _tileSize, this.position.y * _tileSize)
    p5.image(this.game.spriteSheet,
      0, 0,
      _tileSize, _tileSize,
      4*_tileSize, _tileSize,
      _tileSize, _tileSize
    )
    p5.pop()
  }
}

export default Exit