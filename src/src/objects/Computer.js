import Popup from "../Popup"
import Player from "./Player"
import Solid from "./Solid"

class Computer extends Solid {
  constructor(game, position) {
    super(position, 1, 1)
    this.game = game
    this.frame = 0
    this.hasBeenUsed = false
  }

  onCollision(other) {
    if (this.hasBeenUsed) return
    if (other instanceof Player) {
      this.hasBeenUsed = true
      this.game.state.thirdDoor = false
      for (var i = 0; i < 10; i++) {
        setTimeout(() => {
          this.createPopup()
        }, 100*i);
      }
    }
  }

  createPopup() {
    this.game.sounds.button.play()
    const x = Math.random()*12
    const y = Math.random()*12
    this.game.popups.push(new Popup(this.game, {x, y}))
  }

  draw() {
    this.frame = Math.floor((this.game.timer / 20) % 3)
    p5.push()
    p5.translate(this.position.x * _tileSize, this.position.y * _tileSize)
    p5.image(this.game.spriteSheet,
      0, 0,
      _tileSize, _tileSize,
      (this.frame + 2)*_tileSize, 3*_tileSize,
      _tileSize, _tileSize
    )
    p5.pop()
  }
}

export default Computer