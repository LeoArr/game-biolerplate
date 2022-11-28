import Solid from "./Solid"

class Door extends Solid {
  constructor(game, position, lockedVar) {
    super(position, 1, 1)
    this.game = game
    this.lockedVar = lockedVar
  }

  draw() {
    if (!this.game.state[this.lockedVar]) {
      this.game.sounds.door.play()
      this.game.objects = this.game.objects.filter((o) => o !== this)
    }
    p5.push()
    p5.translate(this.position.x * _tileSize, this.position.y * _tileSize)
    p5.image(this.game.spriteSheet,
      0, 0,
      _tileSize, _tileSize,
      3*_tileSize, _tileSize,
      _tileSize, _tileSize
    )
    p5.pop()
  }
}

export default Door