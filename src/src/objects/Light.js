
class Light {
  constructor(game, position, nr) {
    this.position = position
    this.width = 1
    this.height = 1
    this.game = game
    this.nr = nr
  }

  draw() {
    p5.push()
    p5.translate(this.position.x * _tileSize, this.position.y * _tileSize)
    p5.image(this.game.spriteSheet, 0, 0, _tileSize, _tileSize, (this.game.state.lights >= this.nr ? 6 : 5)*_tileSize, 3*_tileSize, _tileSize, _tileSize)
    p5.pop()
  }
}

export default Light