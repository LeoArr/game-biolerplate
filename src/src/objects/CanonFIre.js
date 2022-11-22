class CanonFire {
  constructor(game, position) {
    this.position = position
    this.game = game
    this.created = this.game.timer
    this.life = this.created + 10
  }

  draw() {
    p5.push()
    p5.translate(this.position.x * _tileSize, this.position.y * _tileSize)
    p5.tint(255, 255*(this.life - this.game.timer)/30)
    if (this.life === this.game.timer) {
      this.game.objects = this.game.objects.filter((o) => o !== this)
    }
    p5.image(this.game.spriteSheet,
      0, 0,
      _tileSize, _tileSize,
      3*_tileSize, 2*_tileSize,
      _tileSize, _tileSize
    )
    p5.pop()
  }
}

export default CanonFire