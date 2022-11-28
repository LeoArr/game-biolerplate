import Player from "./Player"

class Snake {
  constructor(game, position) {
    this.position = position
    this.width = 1
    this.height = 1
    this.game = game
    this.frame = 0
  }

  onCollision(other) {
    if (other instanceof Player) {
      if (this.frame > 1) {
        this.game.playerDeath()
      }
    }
  }
  
  draw() {
    this.frame = Math.floor(Math.abs(Math.sin(this.game.timer / 20)) * 4)
    p5.push()
    p5.translate(this.position.x * _tileSize, this.position.y * _tileSize)
    p5.image(this.game.spriteSheet,
      0, 0,
      _tileSize, _tileSize,
      (this.frame + 3)*_tileSize, 4*_tileSize,
      _tileSize, _tileSize
    )
    p5.pop()
  }
}

export default Snake