import CanonBall from "./CanonBall";
import CanonCloud from "./CanonCloud";
import CanonFire from "./CanonFIre";
import Solid from "./Solid";

class Canon extends Solid {
  constructor(game, position) {
    super(position, 1, 1)
    this.game = game
    this.offset = 0
    this.boomTime = 45
  }

  draw() {
    if (this.game.timer < this.boomTime + 5) {
      this.offset = Math.sin(this.game.timer*2)
    }
    if (this.game.timer === this.boomTime) {
      this.game.objects.push(new CanonCloud(this.game, {x: this.position.x + 0.8, y: this.position.y}))      
      this.game.objects.push(new CanonFire(this.game, {x: this.position.x + 0.8, y: this.position.y}))      
      this.game.objects.push(new CanonBall(this.game, {x: this.position.x + 0.8, y: this.position.y}))      
    }
    p5.push()
    p5.translate(this.position.x * _tileSize, this.position.y * _tileSize)
    p5.image(this.game.spriteSheet,
      this.offset/2, 0,
      _tileSize, _tileSize,
      0, 2*_tileSize,
      _tileSize,
      _tileSize
    )
    p5.pop()
  }
}

export default Canon