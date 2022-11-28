import Player from "./Player"

class Button {
  constructor(game, position, onPress) {
    this.position = position
    this.width = 1
    this.height = 1
    this.game = game
    this.onPress = onPress
    this.pressed = false
  }

  onCollision(other) {
    if (this.pressed) return
    if (other instanceof Player) {
      this.pressed = true
      this.onPress()
      this.game.sounds.click.play()
    }
  }
  
  draw() {
    p5.push()
    p5.translate(this.position.x * _tileSize, this.position.y * _tileSize)
    p5.image(this.game.spriteSheet,
      0, 0,
      _tileSize, _tileSize,
      (this.pressed ? 1 : 0)*_tileSize, 3*_tileSize,
      _tileSize, _tileSize
    )
    p5.pop()
  }
}

export default Button