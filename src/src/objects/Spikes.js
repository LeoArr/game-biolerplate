import Player from "./Player"

class Spikes {
  constructor(game, position, triggerTime) {
    this.position = position
    this.width = 1
    this.height = 1
    this.game = game
    this.triggerTime = triggerTime
    this.frame = 0
  }

  onCollision(other) {
    if (other instanceof Player) {
      if (this.game.timer > this.triggerTime) {
        this.game.playerDeath()
      }
    }
  }

  updateTriggerTime(newTime, setFrame=false) {
    this.triggerTime = newTime
    if (setFrame) {
      this.frame = 1
    }
    setTimeout(() => {
      this.frame = 0
    }, (300));
  }

  draw() {
    if (this.game.timer >= this.triggerTime) {
      this.frame = 1
      if (this.game.timer > this.triggerTime + 5) {
        this.frame = 2
      }
    }
    p5.push()
    p5.translate(this.position.x * _tileSize, this.position.y * _tileSize)
    p5.image(this.game.spriteSheet,
      0, 0,
      _tileSize, _tileSize,
      this.frame*_tileSize, 4*_tileSize,
      _tileSize, _tileSize
    )
    p5.pop()
  }
}

export default Spikes