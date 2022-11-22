import Solid from "./Solid";

class Player extends Solid {
  constructor(game, position) {
    super(position, 1, 0.5);
    this.game = game;
    this.speed = 0.4;
    this.friction = 2;
    this.maxVelocity = this.speed * 4;
    this.facingRight = true;
  }

  draw() {
    if (p5.keyIsDown(p5.LEFT_ARROW)) {
      this.velocity.x -= this.speed;
      this.facingRight = false;
    }
    if (p5.keyIsDown(p5.RIGHT_ARROW)) {
      this.velocity.x += this.speed;
      this.facingRight = true;
    }
    if (p5.keyIsDown(p5.UP_ARROW)) {
      this.velocity.y -= this.speed;
    }
    if (p5.keyIsDown(p5.DOWN_ARROW)) {
      this.velocity.y += this.speed;
    }

    this.velocity.x /= this.friction;
    this.velocity.y /= this.friction;

    this.velocity.x = Math.max(
      Math.min(this.velocity.x, this.maxVelocity),
      -this.maxVelocity
    );
    this.velocity.y = Math.max(
      Math.min(this.velocity.y, this.maxVelocity),
      -this.maxVelocity
    );

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    const invVel = {
      x: this.velocity.x * -1,
      y: this.velocity.y * -1,
    };
    this.canJump = false;
    for (const obj of this.game.objects) {
      if (this.collides(obj)) {
        if (obj instanceof Solid) {
          this.resolveCollision(obj);
        }
        if (obj.onCollision) {
          obj.onCollision(this)
        }
      }
    }

    p5.push();
    p5.translate(this.position.x * _tileSize, this.position.y * _tileSize);
    p5.image(
      this.game.spriteSheet,
      0,
      _tileSize*-0.5,
      _tileSize,
      _tileSize,
      this.facingRight ? 0 : _tileSize,
      0,
      _tileSize,
      _tileSize
    );
    p5.pop();
  }
}

export default Player;
