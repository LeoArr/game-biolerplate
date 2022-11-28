class Popup {
  constructor(game, position) {
    this.position = position
    this.width = 4
    this.height = 2
    this.game = game
  }

  draw() {
    p5.push()
    p5.translate(this.position.x * _tileSize, this.position.y * _tileSize)
    p5.image(this.game.spriteSheet,
      0, 0,
      4*_tileSize, 2*_tileSize,
      0*_tileSize, 6*_tileSize,
      4*_tileSize, 2*_tileSize
    )
    p5.pop()
  }
}

export default Popup