import Player from "./Player"
import Solid from "./Solid"

class CanonBall {
  constructor(game, position) {
    this.width = 1
    this.height = 1
    this.position = position
    this.game = game
    this.speed = 0.3
  }

  onCollision(other) {
    if (other instanceof Player) {
      this.game.playerDeath()
    }
  }

  draw() {
    this.position.x += this.speed
    p5.push()
    p5.translate(this.position.x * _tileSize, this.position.y * _tileSize)
    p5.image(this.game.spriteSheet,
      0, 0,
      _tileSize, _tileSize,
      4*_tileSize, 2*_tileSize,
      _tileSize, _tileSize
    )
    p5.pop()
  }
}

export default CanonBall