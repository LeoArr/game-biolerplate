import Solid from "./Solid"

class Player extends Solid {
  constructor(game, position) {
    super(position, 1, 1)
    this.game = game
    this.speed = 0.12
    this.friction = 1.4
    this.maxVelocity = this.speed * 4
    this.facingRight = true
    this.velocity = {
      x: 0,
      y: 0
    }
    this.position = position

    this.jumpHeight = 35
    this.jumpTimeToPeak = 0.5
    this.gravity = (2*this.jumpHeight) / Math.pow(this.jumpTimeToPeak, 2)
    this.jumpSpeed = this.gravity * this.jumpTimeToPeak
    console.log(this.gravity, this.jumpSpeed)
    this.canJump = false
  }

  draw() {
    if (p5.keyIsDown(p5.LEFT_ARROW)) {
      this.velocity.x -= this.speed
      this.facingRight = false
    }
    if (p5.keyIsDown(p5.RIGHT_ARROW)) {
      this.velocity.x += this.speed
      this.facingRight = true
    }
    if (this.canJump && p5.keyIsDown(p5.UP_ARROW)) {
      this.velocity.y -= this.jumpSpeed
    }
    this.velocity.y += this.gravity

    this.velocity.x /= this.friction
    this.velocity.y /= this.friction

    this.velocity.x = Math.max(Math.min(this.velocity.x, this.maxVelocity), -this.maxVelocity)
    this.velocity.y = Math.max(Math.min(this.velocity.y, this.maxVelocity), -this.maxVelocity)
    

    
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    this.canJump = false
    for (const obj of this.game.objects) {
      if (this.collides(obj)) {
        if (this.position.y + this.height > obj.position.y) {
          this.position.y = obj.position.y - this.height
          this.canJump = true
          break
        }
      }
    }
    
    p5.push()
    p5.translate(this.position.x * _tileSize, this.position.y * _tileSize)
    p5.image(this.game.state.spriteSheet, 0, 0, _tileSize, _tileSize, this.facingRight ? 0 : _tileSize, 0, _tileSize, _tileSize)
    p5.pop()
  }
}

export default Player