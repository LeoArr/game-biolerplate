class Floor {
  constructor(game, position) {
    this.position = position
    this.game = game
  }

  draw() {
    p5.push()
    p5.translate(this.position.x * _tileSize, this.position.y * _tileSize)
    p5.image(this.game.spriteSheet,
      0, 0,
      _tileSize, _tileSize,
      2*_tileSize, _tileSize,
      _tileSize, _tileSize
    )
    p5.pop()
  }
}

export default Floor