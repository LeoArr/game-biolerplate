import Player from "./Player"

class Stomp {
  constructor(game, position) {
    this.position = position
    this.width = 1
    this.height = 1
    this.game = game
    this.startTime = this.game.timer
    this.time = 0
  }

  onCollision(other) {
    if (other instanceof Player) {
      if (this.time > 100 && this.time < 110) {
        // Play Stomp sounds
        this.game.playerDeath()
      }
    }
  }
  
  draw() {
    this.time = this.game.timer - this.startTime
    if (this.time < 100) {
      p5.push()
      p5.translate(this.position.x * _tileSize, this.position.y * _tileSize)
      p5.tint(255, 128 * Math.min(this.time / 90, 1))
      p5.image(this.game.spriteSheet,
        0, 0,
        _tileSize, _tileSize,
        6*_tileSize, 7*_tileSize,
        _tileSize, _tileSize
      )
      p5.pop()
    }

    if (this.time === 100) {
      this.game.sounds.thump.play()
    }

    if (this.time > 90) {
      const f = Math.sin((this.game.timer - 90 - this.startTime)*Math.PI / 20)
      const h = this.position.y * f
      p5.push()
      p5.translate(this.position.x * _tileSize, h * _tileSize)
      p5.image(this.game.spriteSheet,
        0, 0,
        _tileSize, _tileSize,
        5*_tileSize, 7*_tileSize,
        _tileSize, _tileSize
      )
      p5.pop()
      for (var i = -1; i > -15; i--) {
        p5.push()
        p5.translate(this.position.x * _tileSize, (h+i)*_tileSize)
        p5.image(this.game.spriteSheet,
          0, 0,
          _tileSize, _tileSize,
          5*_tileSize, 6*_tileSize,
          _tileSize, _tileSize
        )
        p5.pop()
      }
      if (this.game.timer > this.startTime + 120) {
        this.game.objects = this.game.objects.filter((o) => o !== this)
      }
    }

  }
}

export default Stomp