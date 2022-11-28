import Player from "./Player"

class Fire {
  constructor(game, position) {
    this.position = position
    this.width = 1
    this.height = 1
    this.game = game
    this.frame = 0
  }

  onCollision(other) {
    if (other instanceof Player) {
      this.game.sounds.fireMagic.play()
      this.game.playerDeath()
    }
  }
  
  draw() {
    this.frame = (this.frame + 0.25) % 4
    p5.push()
    p5.translate(this.position.x * _tileSize, this.position.y * _tileSize)
    p5.image(this.game.spriteSheet,
      0, 0,
      _tileSize, _tileSize,
      Math.floor(this.frame)*_tileSize, 5*_tileSize,
      _tileSize, _tileSize
    )
    p5.pop()
  }
}

export default Fire